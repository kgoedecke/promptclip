import { Text } from '@chakra-ui/react';
import DetailedPrompt from '../../../../components/DetailedPrompt/DetailedPrompt.component';
import CustomInput from '../../../../components/CustomInput/CustomInput.component';
import { IPrompt } from '../../../../types/Prompt.types';

function RecentlyUsed({ prompts } : {
  prompts: IPrompt[]
}) {
  // sort by date used
  const sortedPrompts = prompts.sort((a, b) => b.last_used_at - a.last_used_at);
  return (
    <div>
      <Text fontWeight="bold">Recently Used</Text>
      <CustomInput placeholder="Search" marginTop="16px" />
      {sortedPrompts.map((prompt, index) => <DetailedPrompt key={index} {...prompt} />)}
    </div>
  );
}

export default RecentlyUsed;
