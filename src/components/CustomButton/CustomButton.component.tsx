import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

interface CustomButtonProps {
    icon?: React.ReactElement;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    dark?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ icon, size = 'sm', dark = false, children, onClick}) => {
    const lightBackground = 'linear-gradient(180deg, #6851E2 0%, #7C69E9 100%)';
    const darkBackground = 'linear-gradient(180deg, #1D1D1F 0%, #2A2A2C 100%)';
    const darkBackgroundBorder = '#2A2A2C';
    const lightBackgroundBorder = '#8F7FF5';
    return (
        <Box
            borderRadius="7px"
            background={dark ? darkBackground : lightBackground}
            display="inline-flex"
            height="40px"
            padding="0px 0px"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-end"
            border="2px"
            borderColor={dark ? darkBackgroundBorder : lightBackgroundBorder}
            gap={8}
            outline="none"
        >
            <Button
                size={size}
                onClick={onClick}
                leftIcon={icon}
                borderRadius="7px"
                background="transparent"
                color="white"
                _hover={{ background: 'transparent' }}
                _active={{ background: 'transparent' }}
                _focus={{ background: 'transparent' }}
            >
                <Flex align="center">
                    <Text flex={1} textAlign="left">
                        {children}
                    </Text>
                </Flex>
            </Button>
        </Box>
    );
};

export default CustomButton;
