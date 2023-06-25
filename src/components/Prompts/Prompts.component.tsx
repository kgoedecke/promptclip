import Prompt from "../PromptButton/PromptButton.component";

export interface IPrompt {
    prompt: string;
    promptName: string;
    id: string;
}

const Prompts = ({ prompts }: { prompts: IPrompt[] }) => {
    return (
        <div style={{
            padding: "5px 10px 10px 10px",
        }}>
            {prompts.length === 0
                ? <p style={{ color: "#7D7A75", fontSize: "18px", fontWeight: 500, textAlign: "center", }}>No prompts found</p>
                : prompts.slice(0, 9).map((prompt, index) => (
                    <Prompt key={index} number={index + 1} title={prompt.promptName} text={prompt.prompt} onClick={() => {
                        console.log(prompt.id);
                    }} />
                ))
            }
        </div>
    )
}

export default Prompts;