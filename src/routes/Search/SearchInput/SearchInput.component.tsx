import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { searchPrompts } from '../../../utils/database';
import { PromptsContext } from '../../../contexts/prompts.context';
import { IPrompt } from '../../../types/Prompt.types';

const onSearchInputChanged = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setPrompts: React.Dispatch<React.SetStateAction<IPrompt[]>>,
) => {
  setPrompts(await searchPrompts(event.target.value));
};

function SearchInput() {
  const { setPrompts } = React.useContext(PromptsContext);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon
          boxSize="18px"
          color="#4F4F4F"
          style={{
            marginTop: '6px',
          }}
        />
      </InputLeftElement>
      <Input
        id="search-input"
        type="text"
        placeholder="Search for a prompt"
        _placeholder={{ color: '#4F4F4F' }}
        fontSize="18px"
        size="lg"
        variant="filled"
        focusBorderColor="0"
        background="transparent"
        color="white"
        _hover={{ bg: 'transparent' }}
        onChange={(event) => onSearchInputChanged(event, setPrompts)}
      />
    </InputGroup>
  );
}

export default SearchInput;
