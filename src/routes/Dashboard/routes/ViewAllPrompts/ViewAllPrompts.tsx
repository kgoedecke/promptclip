import { useState, useEffect } from "react";
import DetailedPrompt from "../../../../components/DetailedPrompt/DetailedPrompt.component";
import { getPrompts } from "../../../../utils/database";
import { IPrompt } from "../../../Search/Prompts/Prompts.component";
import { Text } from "@chakra-ui/react";
import CustomInput from "../../../../components/CustomInput/CustomInput.component";

const ViewAllPrompts = () => {
    const [prompts, setPrompts] = useState<IPrompt[]>([]);
    useEffect(() => {
        (async () => {
            setPrompts(await getPrompts());
        })();
    }, [prompts]);
    return (
        <div>
            <Text fontWeight={'bold'}>All Prompts</Text>
            <CustomInput placeholder="Search" marginTop={'16px'} />
            {prompts.map((prompt, index) => {
                return <DetailedPrompt key={index} promptName={prompt.promptName} prompt={prompt.prompt} id={prompt.id} />
            })}
        </div>
    )
}

export default ViewAllPrompts;