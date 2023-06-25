import Prompt from "../PromptButton/PromptButton.component";
import { IPrompt } from "../Search/Search.component";

const Prompts = ({ prompts }: { prompts: IPrompt[] }) => {
    return (
        <div style={{
            padding: "5px 10px 10px 10px",
        }}>
            {prompts.slice(0, 9).map((prompt, index) => (
                <Prompt key={index} number={index + 1} title={prompt.promptName} text={prompt.prompt} onClick={() => {
                    console.log(prompt.id);
                }} />
            ))}
        </div>
    )
}

export default Prompts;