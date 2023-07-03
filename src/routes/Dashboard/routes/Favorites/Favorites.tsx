import { Text } from '@chakra-ui/react';
import DetailedPrompt from '../../../../components/DetailedPrompt/DetailedPrompt.component';
import { IPrompt } from '../../../../types/Prompt.types';

function Favorites({ prompts } : {
  prompts: IPrompt[]
}) {
  const favoritePrompts = prompts.filter((prompt) => prompt.isFavorite);
  return (
    <div>
      <Text fontWeight="bold">All Prompts</Text>
      {favoritePrompts.map((prompt, index) => <DetailedPrompt key={index} {...prompt} />)}
    </div>
  );
}

export default Favorites;
