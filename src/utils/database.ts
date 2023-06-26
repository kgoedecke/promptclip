import Database from "tauri-plugin-sql-api";
import { IPrompt } from "../components/Prompts/Prompts.component";

// TODO: Add UUID, created_at, last_used_at
export const createPromptsTable = async () => {
  const db = await Database.load("sqlite:prompts.db");
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS prompts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      promptName TEXT,
      prompt TEXT
    )
  `;
  await db.execute(createTableQuery);
  db.close();
}

export const storePrompt = async (promptName: string, prompt: string) => {
  const db = await Database.load("sqlite:prompts.db");
  const insertQuery = `
    INSERT INTO prompts (promptName, prompt)
    VALUES ('${promptName}', '${prompt}')
  `;
  await db.execute(insertQuery);
  db.close();
}

export const getPrompts = async (): Promise<IPrompt[]> => {
  const db = await Database.load("sqlite:prompts.db");
  const selectQuery = `
    SELECT * FROM prompts
  `;

  const result: [] = await db.select(selectQuery);
  db.close();
  return result;
}

export const searchPrompts = async (searchTerm: string): Promise<IPrompt[]> => {
  const db = await Database.load("sqlite:prompts.db");
  const selectQuery = `
    SELECT * FROM prompts
    WHERE promptName LIKE '%${searchTerm}%'
    OR prompt LIKE '%${searchTerm}%'
  `;
  const result: IPrompt[] = await db.select(selectQuery);
  db.close();
  return result;
}

export const deletePrompt = async (id: number) => {
  const db = await Database.load("sqlite:prompts.db");
  const deleteQuery = `
        DELETE FROM prompts
        WHERE id = ${id}
    `;

  await db.execute(deleteQuery);
  db.close();
}