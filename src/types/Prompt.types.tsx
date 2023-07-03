export interface IPrompt {
  uuid: string;
  promptName: string;
  prompt: string;
  created_at: number;
  last_used_at: number | null;
  used: number;
  isFavorite: boolean;
  category_id: string | null;
}

export interface ICategory {
  uuid: string;
  name: string;
  promptsCount: number;
}
