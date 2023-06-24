import Database from "tauri-plugin-sql-api";

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

export const getPrompts = async () => {
  const db = await Database.load("sqlite:prompts.db");
  const selectQuery = `
    SELECT * FROM prompts
  `;

  const result = await db.select(selectQuery);
  db.close();
  return result;
}

export const searchPrompts = async (searchTerm: string) => {
  const db = await Database.load("sqlite:prompts.db");
  const selectQuery = `
    SELECT * FROM prompts
    WHERE promptName LIKE '%${searchTerm}%'
  `;

  const result = await db.select(selectQuery);
  db.close();
  return result;
}