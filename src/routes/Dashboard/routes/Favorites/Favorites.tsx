import { Text } from '@chakra-ui/react';
import DetailedPrompt from '../../../../components/DetailedPrompt/DetailedPrompt.component';
import CustomInput from '../../../../components/CustomInput/CustomInput.component';
import { IPrompt } from '../../../../types/Prompt.types';

function Favorites({ prompts } : {
  prompts: IPrompt[]
}) {
  const favoritePrompts = prompts.filter((prompt) => prompt.isFavorite);
  return (
    <div>
      <Text fontWeight="bold">All Prompts</Text>
      <CustomInput placeholder="Search" marginTop="16px" />
      {favoritePrompts.map((prompt, index) => <DetailedPrompt key={index} {...prompt} />)}
    </div>
  );
}

export default Favorites;
