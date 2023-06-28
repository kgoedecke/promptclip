export interface IPrompt {
  uuid: string;
  promptName: string;
  prompt: string;
  created_at: number;
  last_used_at: number;
  used: number;
  isFavorite: boolean;
}
