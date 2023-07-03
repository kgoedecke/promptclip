import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DetailedPrompt from '../../../../components/DetailedPrompt/DetailedPrompt.component';
import CustomInput from '../../../../components/CustomInput/CustomInput.component';
import { IPrompt } from '../../../../types/Prompt.types';
import { filterPrompts } from '../../../../utils/utils';

interface ViewAllPromptsProps {
  prompts: IPrompt[];
  setPrompts: (prompts: IPrompt[]) => void;
}

const ViewAllPrompts = ({ prompts }: ViewAllPromptsProps) => {
  const [sortedPrompts, setSortedPrompts] = useState(prompts);

  useEffect(() => {
    setSortedPrompts(prompts);
  }, [prompts]);

  return (
    <div>
      <Text fontWeight="bold">All Prompts</Text>
      <CustomInput
        placeholder="Search"
        marginTop="16px"
        onChange={async (e) => {
          const searchResults = filterPrompts(prompts, e.target.value);
          setSortedPrompts(searchResults);
        }}
      />
      {sortedPrompts.map((prompt, index) => (
        <DetailedPrompt key={index} {...prompt} />
      ))}
    </div>
  );
};

export default ViewAllPrompts;
