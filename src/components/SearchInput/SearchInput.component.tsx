import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { Fragment } from "react"
import { searchPrompts } from "../../utils/database"

const onSearchInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchPrompts(event.target.value);
}

const SearchInput = () => {
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
                    onChange={onSearchInputChanged}
                />
            </InputGroup>
        </Fragment>
    )
}

export default SearchInput;