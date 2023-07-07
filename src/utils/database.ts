import Database from 'tauri-plugin-sql-api';
import { v4 as uuidv4 } from 'uuid';
import { ICategory, IPrompt } from '../types/Prompt.types';

let db: Database;

(async () => {
  db = await Database.load('sqlite:prompts.db');
})();

export const createPromptsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS prompts (
      uuid TEXT PRIMARY KEY,
      promptName TEXT,
      prompt TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      last_used_at INTEGER DEFAULT NULL,
      used INTEGER DEFAULT 0,
      isFavorite INTEGER DEFAULT 0,
      category_id TEXT,
      FOREIGN KEY (category_id) REFERENCES categories (uuid)
    );

    CREATE TABLE IF NOT EXISTS categories (
      uuid TEXT PRIMARY KEY,
      name TEXT,
      promptsCount INTEGER DEFAULT 0
    )
  `;
  await db.execute(createTableQuery);
};

const updateCategoryPromptsCount = async (categoryId: string) => {
  const updateQuery = `
    UPDATE categories
    SET promptsCount = (
      SELECT COUNT(*)
      FROM prompts
      WHERE category_id = '${categoryId}'
    )
    WHERE uuid = '${categoryId}'
  `;
  await db.execute(updateQuery);
};

export const updateAllCategoryPromptsCounts = async () => {
  const selectQuery = `
    SELECT uuid
    FROM categories
  `;
  const categories: { uuid: string }[] = await db.select(selectQuery);

  categories.forEach(async (category) => {
    await updateCategoryPromptsCount(category.uuid);
  });
};

export const storePrompt = async (
  promptName: string,
  prompt: string,
  categoryId: string | null,
) => {
  const uuid = uuidv4();
  const insertQuery = `
    INSERT INTO prompts (uuid, promptName, prompt, category_id)
    VALUES ('${uuid}', '${promptName}', '${prompt}', ${categoryId ? `'${categoryId}'` : 'NULL'})
  `;
  await db.execute(insertQuery);

  if (categoryId) {
    await updateCategoryPromptsCount(categoryId);
  }
};

export const updatePrompt = async (prompt: IPrompt) => {
  const updateQuery = `
    UPDATE prompts
    SET
      promptName = '${prompt.promptName}',
      prompt = '${prompt.prompt}',
      category_id = ${prompt.category_id ? `'${prompt.category_id}'` : 'NULL'}
    WHERE uuid = '${prompt.uuid}'
  `;

  await db.execute(updateQuery);
  await updateAllCategoryPromptsCounts();
};

export const insertCategory = async (name: string) => {
  const existingCategoryQuery = `
    SELECT uuid
    FROM categories
    WHERE name = '${name}'
  `;
  const existingCategory: ICategory[] = await db.select(existingCategoryQuery);

  if (existingCategory.length > 0) {
    throw new Error('Category with the same name already exists.');
  }

  const uuid = uuidv4();
  const insertQuery = `
    INSERT INTO categories (uuid, name)
    VALUES ('${uuid}', '${name}')
  `;
  await db.execute(insertQuery);
};

export const updateCategory = async (uuid: string, newName: string) => {
  const existingCategoryQuery = `
    SELECT uuid
    FROM categories
    WHERE uuid = '${uuid}'
  `;
  const existingCategory: ICategory[] = await db.select(existingCategoryQuery);

  if (existingCategory.length === 0) {
    throw new Error('Category with the provided UUID does not exist.');
  }

  const updateQuery = `
    UPDATE categories
    SET name = '${newName}'
    WHERE uuid = '${uuid}'
  `;
  await db.execute(updateQuery);
};

export const getCategoryByUUID = async (uuid: string): Promise<ICategory | null> => {
  const query = `
    SELECT *
    FROM categories
    WHERE uuid = '${uuid}'
    LIMIT 1
  `;
  const result: ICategory[] = await db.select(query);
  return result.length > 0 ? result[0] : null;
};

export const getPrompts = async (
  filter: 'lastUsed' | 'used' | 'dateCreated',
  favorites?: boolean,
): Promise<IPrompt[]> => {
  let selectQuery = `
    SELECT prompts.*, categories.name AS categoryName
    FROM prompts
    LEFT JOIN categories ON prompts.category_id = categories.uuid`;

  if (favorites !== undefined) {
    selectQuery += `
      WHERE isFavorite = ${favorites ? 1 : 0}
    `;
  }

  if (filter === 'lastUsed') {
    selectQuery += `
      ORDER BY last_used_at DESC
    `;
  } else if (filter === 'used') {
    selectQuery += `
      ORDER BY used DESC
    `;
  } else if (filter === 'dateCreated') {
    selectQuery += `
      ORDER BY created_at DESC
    `;
  }

  const result: IPrompt[] = await db.select(selectQuery);
  return result.map((prompt) => ({
    ...prompt,
    category: prompt.category_id ? { uuid: prompt.category_id, name: prompt.category_id } : null,
  }));
};

export const getPromptByUUID = async (uuid: string): Promise<IPrompt | null> => {
  const selectQuery = `
    SELECT prompts.*, categories.name AS categoryName
    FROM prompts
    LEFT JOIN categories ON prompts.category_id = categories.uuid
    WHERE prompts.uuid = '${uuid}'
  `;

  const result: (IPrompt & { categoryName: string })[] = await db.select(selectQuery);

  if (result.length > 0) {
    const prompt = result[0];
    return {
      uuid: prompt.uuid,
      promptName: prompt.promptName,
      prompt: prompt.prompt,
      created_at: prompt.created_at,
      last_used_at: prompt.last_used_at,
      used: prompt.used,
      isFavorite: prompt.isFavorite,
      category_id: prompt.category_id,
    };
  }

  return null;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const selectQuery = `
    SELECT * FROM categories
  `;
  const result: ICategory[] = await db.select(selectQuery);
  return result;
};

export const searchPrompts = async (searchTerm: string): Promise<IPrompt[]> => {
  const selectQuery = `
    SELECT * FROM prompts
    WHERE promptName LIKE '%${searchTerm}%'
    OR prompt LIKE '%${searchTerm}%'
  `;
  const result: IPrompt[] = await db.select(selectQuery);
  return result;
};

export const deletePrompt = async (uuid: string) => {
  const deleteQuery = `
    DELETE FROM prompts
    WHERE uuid = '${uuid}'
  `;

  const getCategoryQuery = `
    SELECT category_id
    FROM prompts
    WHERE uuid = '${uuid}'
  `;

  const result: { category_id: string | null }[] = await db.select(getCategoryQuery);
  const categoryId = result[0]?.category_id;

  await db.execute(deleteQuery);

  if (categoryId) {
    await updateCategoryPromptsCount(categoryId);
  }
};

export const incrementUsageAndSetLastUsed = async (uuid: string) => {
  const updateQuery = `
    UPDATE prompts
    SET used = used + 1, last_used_at = strftime('%s', 'now')
    WHERE uuid = '${uuid}'
  `;

  await db.execute(updateQuery);
};

export const toggleFavorite = async (uuid: string, isFavorite: boolean) => {
  const favorite = isFavorite ? 0 : 1;
  const updateQuery = `
    UPDATE prompts
    SET isFavorite = ${favorite}
    WHERE uuid = '${uuid}'
  `;

  await db.execute(updateQuery);
};
