import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { StartIcon } from './Icon';

interface PromptProps {
    number: number;
    title: string;
    text: string;
    onClick: () => void;
}

const Prompt: React.FC<PromptProps> = ({ number, onClick, title, text }) => {
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
            onClick={onClick}
            margin="10px 0"
            _hover={{ bg: "#1B1A1D" }}
            _active={{ bg: "#1B1A1D" }}
            id={number.toString()}
        >
            <Flex align="center">
                <StartIcon width="24px" height="24px" />
                <Text ml={2}>{title}</Text>
            </Flex>
        </Button>
    );
};

export default Prompt;

