import { Fragment } from "react";
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const Search = () => {
  return (
    <Fragment>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon boxSize='24px' color="#4F4F4F" />
        </InputLeftElement>
        <Input type='tel' placeholder='Search for a prompt' size='lg' variant='filled' focusBorderColor='0' background="transparent" color="white" />
      </InputGroup>
    </Fragment>
  )
}

export default Search;
