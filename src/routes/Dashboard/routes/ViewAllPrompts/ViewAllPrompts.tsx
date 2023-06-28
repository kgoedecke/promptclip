import DetailedPrompt from "../../../../components/DetailedPrompt/DetailedPrompt.component";
import { Text } from "@chakra-ui/react";
import CustomInput from "../../../../components/CustomInput/CustomInput.component";
import { IPrompt } from "../../../Search/Prompts/Prompts.component";

const ViewAllPrompts = ({ prompts }: {
    prompts: IPrompt[]
}) => {
    return (
        <div>
            <Text fontWeight={'bold'}>All Prompts</Text>
            <CustomInput placeholder="Search" marginTop={'16px'} />
            {prompts.map((prompt, index) => {
                return <DetailedPrompt key={index} {...prompt} />
            })}
        </div>
    )
}

export default ViewAllPrompts;