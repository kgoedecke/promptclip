import React, { createContext, useState, useMemo } from 'react';
import { IPrompt } from '../types/Prompt.types';

export interface IPromptsContext {
  prompts: IPrompt[];
  setPrompts: React.Dispatch<React.SetStateAction<IPrompt[]>>;
}

export const PromptsContext = createContext<IPromptsContext>({
  prompts: [],
  setPrompts: () => { },
});

export function PromptsProvider({ children }: { children: React.ReactNode }) {
  const [prompts, setPrompts] = useState<IPrompt[]>([]);

  const promptsContextValue = useMemo(() => ({ prompts, setPrompts }), [prompts, setPrompts]);

  return (
    <PromptsContext.Provider value={promptsContextValue}>
      {children}
    </PromptsContext.Provider>
  );
}
