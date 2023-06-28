import React, { createContext, useState } from 'react';
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
  return (
    // TODO: Revisit this!!
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PromptsContext.Provider value={{ prompts, setPrompts }}>
      {children}
    </PromptsContext.Provider>
  );
}
