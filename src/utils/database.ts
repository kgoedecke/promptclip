import Database from 'tauri-plugin-sql-api';
import { v4 as uuidv4 } from 'uuid';
import { IPrompt } from '../types/Prompt.types';

const db = await Database.load('sqlite:prompts.db');

export const createPromptsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS prompts (
      uuid TEXT PRIMARY KEY,
      promptName TEXT,
      prompt TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      last_used_at INTEGER DEFAULT NULL,
      used INTEGER DEFAULT 0,
      isFavorite INTEGER DEFAULT 0
    )
  `;
  await db.execute(createTableQuery);
};

export const storePrompt = async (promptName: string, prompt: string) => {
  const uuid = uuidv4();
  const insertQuery = `
    INSERT INTO prompts (uuid, promptName, prompt)
    VALUES ('${uuid}', '${promptName}', '${prompt}')
  `;
  await db.execute(insertQuery);
};

export const getPrompts = async (
  filter: 'lastUsed' | 'used' | 'dateCreated',
  favorites?: boolean,
): Promise<IPrompt[]> => {
  let selectQuery = `
    SELECT * FROM prompts
  `;

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

  await db.execute(deleteQuery);
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
