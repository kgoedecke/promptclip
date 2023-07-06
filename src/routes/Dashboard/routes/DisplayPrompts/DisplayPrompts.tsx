import { Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import DetailedPrompt from '../../../../components/DetailedPrompt/DetailedPrompt.component';
import CustomInput from '../../../../components/CustomInput/CustomInput.component';
import { IPrompt, ICategory } from '../../../../types/Prompt.types';
import { filterPrompts } from '../../../../utils/utils';
import { UpdateContext } from '../../../../contexts/update.context';

interface DisplayPromptsProps {
  prompts: IPrompt[];
  setPrompts: (prompts: IPrompt[]) => void;
  filterOption?:
  | 'DateCreated'
  | 'Favorites'
  | 'MostUsed'
  | 'RecentlyUsed'
  | 'AllPrompts'
  | ICategory
  | null;
}

const DisplayPrompts = ({ prompts, filterOption }: DisplayPromptsProps) => {
  const [sortedPrompts, setSortedPrompts] = useState(prompts);
  const { setUpdate } = useContext(UpdateContext);

  useEffect(() => {
    if (filterOption) {
      let filteredPrompts = prompts;

      if (filterOption === 'Favorites') {
        filteredPrompts = prompts.filter((prompt) => prompt.isFavorite);
      } else if (filterOption === 'DateCreated') {
        filteredPrompts = prompts.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
      } else if (filterOption === 'MostUsed') {
        filteredPrompts = prompts.sort((a, b) => b.used - a.used);
      } else if (filterOption === 'RecentlyUsed') {
        filteredPrompts = prompts.sort((a, b) => (b.last_used_at || 0) - (a.last_used_at || 0));
      } else if (filterOption === 'AllPrompts') {
        filteredPrompts = prompts;
      } else if (filterOption instanceof Object) {
        filteredPrompts = prompts.filter((prompt) => prompt.category_id === filterOption.uuid);
      }

      setSortedPrompts([...filteredPrompts]);
    } else {
      setSortedPrompts([...prompts]);
    }
  }, [filterOption, prompts]);

  const getFilterOptionLabel = (): string => {
    if (filterOption === 'DateCreated') {
      return 'All Prompts';
    }
    if (typeof filterOption === 'string') {
      return filterOption;
    }
    if (filterOption instanceof Object && filterOption.name) {
      return filterOption.name;
    }
    return 'All Prompts';
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Text fontWeight="bold">{getFilterOptionLabel()}</Text>
        <Text
          fontWeight="light"
          color="grey"
          cursor="pointer"
          onClick={() => {
            setUpdate();
          }}
        >
          Refresh
        </Text>
      </div>
      <CustomInput
        placeholder="Search"
        marginTop="16px"
        onChange={(e) => {
          const searchResults = filterPrompts(prompts, e.target.value);
          setSortedPrompts(searchResults);
        }}
      />
      <div className="detailedPromptsContainer">
        {sortedPrompts.map((prompt, index) => (
          <DetailedPrompt key={index} {...prompt} />
        ))}
      </div>
    </div>
  );
};

export default DisplayPrompts;
