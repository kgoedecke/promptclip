import React, { createContext, useState } from "react";
import { IPrompt } from "../components/Search/Search.component";

export interface IPromptsContext {
    prompts: IPrompt[];
    setPrompts: React.Dispatch<React.SetStateAction<IPrompt[]>>;
}

export const PromptsContext = createContext<IPromptsContext>({
    prompts: [],
    setPrompts: () => { }
});

export const PromptsProvider = ({ children }: { children: React.ReactNode }) => {
    const [prompts, setPrompts] = useState<IPrompt[]>([]);
    return (
        <PromptsContext.Provider value={{ prompts, setPrompts }}>
            {children}
        </PromptsContext.Provider>
    )
}