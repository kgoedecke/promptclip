import React, { Fragment, useEffect } from "react";
import { getPrompts } from "../../utils/database";
import SearchInput from "../SearchInput/SearchInput.component";
import Actions from "../Actions/Actions.component";
import { Divider } from '@chakra-ui/react'
import Prompts from "../Prompts/Prompts.component";
import { PromptsContext } from "../../contexts/prompts.context";

export interface IPrompt {
  prompt: string;
  promptName: string;
  id: string;
}

const Search = () => {
  const { prompts, setPrompts } = React.useContext(PromptsContext);
  useEffect(() => {
    (async () => {
      setPrompts(await getPrompts());
    })();
  }, []);

  return (
    <Fragment>
      <SearchInput />
      <Divider width="728px" borderColor="#7D7A75" marginTop="5px" marginBottom="10px" marginLeft={0}/>
      <Prompts prompts={prompts} />
      <Divider width="728px" borderColor="#7D7A75" marginTop="5px" marginBottom="20px" marginLeft={0}/>
      <Actions />
    </Fragment>
  )
}

export default Search;
