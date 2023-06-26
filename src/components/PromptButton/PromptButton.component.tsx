import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { StartIcon } from './Icon';
import { appWindow } from '@tauri-apps/api/window';
import CustomIconButton from '../CustomIconButton/CustomIconButton.component';

interface PromptProps {
    number: number;
    title: string;
    text: string;
}

const copyToClipboard = async (value: string, e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent<HTMLButtonElement>).key !== 'Enter') {
        return;
    }
    await navigator.clipboard.writeText(value);
    await appWindow.hide();
};

const Prompt: React.FC<PromptProps> = ({ number, title, text }) => {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
        copyToClipboard(text, e);
    };

    return (
        <Button
            width="100%"
            height="42px"
            px={3}
            py={5}
            justifyContent="space-between"
            alignItems="center"
            borderRadius="10px"
            bg="transparent"
            color="white"
            onClick={handleButtonClick}
            onKeyDown={handleButtonClick}
            margin="5px 0"
            _hover={{ bg: '#1B1A1D' }}
            _active={{ bg: '#1B1A1D' }}
            id={number.toString()}
        >
            <Flex align="center">
                <StartIcon width="24px" height="24px" />
                <Text ml={2}>{title}</Text>
            </Flex>
            <Flex>
                <CustomIconButton iconText="⌘" dark />
                <CustomIconButton dark iconText={number.toString()} />
            </Flex>
        </Button>
    );
};

export default Prompt;