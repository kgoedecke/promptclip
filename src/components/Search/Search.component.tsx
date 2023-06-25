import React, { Fragment, useEffect } from "react";
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Prompt from "../Prompt/Prompt.component";
import { getPrompts } from "../../utils/database";

interface IPrompt {
  prompt: string;
  promptName: string;
  id: string;
}

const Search = () => {
  const [prompts, setPrompts] = React.useState<IPrompt[]>([]);
  useEffect(() => {
    (async () => {
      setPrompts(await getPrompts());
    })();
  }, []);

  return (
    <Fragment>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon boxSize='18px' color="#4F4F4F" style={{
            marginTop: "6px"
          }} />
        </InputLeftElement>
        <Input
          type='text'
          placeholder='Search for a prompt'
          _placeholder={{ color: '#4F4F4F' }}
          fontSize="18px" size='lg'
          variant='filled'
          focusBorderColor='0'
          background="transparent"
          color="white"
          _hover={{ bg: "transparent" }} 
          />
      </InputGroup>
      {prompts.map((prompt, index) => (
        <Prompt key={index} number={index + 1} title={prompt.promptName} text={prompt.prompt} onClick={() => {
          console.log(prompt.id);
        }} />
      ))}
    </Fragment>
  )
}

export default Search;
