import React from 'react';
import Input from "../Input/Input.component";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    VStack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { storePrompt } from '../../utils/database';

const AddPrompt = () => {
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const toast = useToast();

    const handleAddPrompt = () => {
        storePrompt(title, text);
        toast({
            title: "Prompt added.",
            description: "We've added your prompt for you.",
            status: "success",
            duration: 4000,
            isClosable: true,
        })
        setTitle('');
        setText('');
    };

    return (
        <Box p={4} borderWidth={1} borderRadius="md">
            <VStack spacing={4} align="start">
                <FormControl>
                    <FormLabel>Add new prompt</FormLabel>
                </FormControl>

                <FormControl>
                    <FormLabel>Prompt title</FormLabel>
                    <Input
                        placeholder="Write your prompt title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Prompt text</FormLabel>
                    <Input
                        placeholder="Enter your prompt text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </FormControl>

                <Button colorScheme="blue" onClick={handleAddPrompt}>
                    Add Prompt
                </Button>
            </VStack>
        </Box>
    );
};

export default AddPrompt;