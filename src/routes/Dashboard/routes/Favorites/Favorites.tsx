import DetailedPrompt from "../../../../components/DetailedPrompt/DetailedPrompt.component";
import { Text } from "@chakra-ui/react";
import CustomInput from "../../../../components/CustomInput/CustomInput.component";
import { IPrompt } from "../../../Search/Prompts/Prompts.component";

const Favorites = ({ prompts } : {
    prompts: IPrompt[]
}) => {
    const favoritePrompts = prompts.filter(prompt => prompt.isFavorite);
    return (
        <div>
            <Text fontWeight={'bold'}>All Prompts</Text>
            <CustomInput placeholder="Search" marginTop={'16px'} />
            {favoritePrompts.map((prompt, index) => {
                return <DetailedPrompt key={index} {...prompt} />
            })}
        </div>
    )
}

export default Favorites;