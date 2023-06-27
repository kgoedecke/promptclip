import React from 'react';
import CustomInput from "../../../../components/CustomInput/CustomInput.component";
import {
    Box,
    FormControl,
    FormLabel,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { storePrompt } from '../../../../utils/database';
import CustomButton from '../../../../components/CustomButton/CustomButton.component';
import { AddIcon } from '@chakra-ui/icons';

const AddPrompt = () => {
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const toast = useToast();

    const handleAddPrompt = async () => {
        if (title === '' || text === '') {
            toast({
                title: "Error",
                description: "Please enter a title and text.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        await storePrompt(title, text);
        toast({
            title: "Prompt added.",
            description: "We've added your prompt for you.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
        setTitle('');
        setText('');
    };

    return (
        <Box borderRadius="md">
            <VStack spacing={4} align="start">
                <FormControl>
                    <Text fontWeight={'bold'}>Add New Prompt</Text>
                </FormControl>

                <FormControl>
                    <FormLabel>Prompt title</FormLabel>
                    <CustomInput
                        placeholder="Write your prompt title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Prompt text</FormLabel>
                    <CustomInput
                        placeholder="Enter your prompt text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </FormControl>
                <CustomButton icon={<AddIcon />} onClick={handleAddPrompt}>Add Prompt</CustomButton>
            </VStack>
        </Box>
    );
};

export default AddPrompt;