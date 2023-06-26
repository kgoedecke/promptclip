import React from 'react';
import Prompt from '../PromptButton/PromptButton.component';

export interface IPrompt {
    prompt: string;
    promptName: string;
    id: string;
}

const Prompts: React.FC<{ prompts: IPrompt[] }> = ({ prompts }) => {
    const renderPrompts = () => {
        if (prompts.length === 0) {
            return (
                <p style={{ color: '#7D7A75', fontSize: '18px', fontWeight: 500, textAlign: 'center' }}>
                    No prompts found
                </p>
            );
        }

        return prompts.slice(0, 9).map((prompt, index) => (
            <Prompt
                key={prompt.id}
                number={index + 1}
                title={prompt.promptName}
                text={prompt.prompt}
            />
        ));
    };

    return (
        <div style={{ padding: '5px 10px 10px 10px' }}>
            {renderPrompts()}
        </div>
    );
};

export default Prompts;
