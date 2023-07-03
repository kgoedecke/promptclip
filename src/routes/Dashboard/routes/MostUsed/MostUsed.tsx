import { Text } from '@chakra-ui/react';
import DetailedPrompt from '../../../../components/DetailedPrompt/DetailedPrompt.component';
import { IPrompt } from '../../../../types/Prompt.types';

function MostUsed({ prompts } : {
  prompts: IPrompt[]
}) {
  const sortedPrompts = prompts.sort((a, b) => b.used - a.used);
  return (
    <div>
      <Text fontWeight="bold">Most Used</Text>
      {sortedPrompts.map((prompt, index) => <DetailedPrompt key={index} {...prompt} />)}
    </div>
  );
}

export default MostUsed;
