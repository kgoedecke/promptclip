import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { darkBackground, darkBackgroundBorder, lightBackground, lightBackgroundBorder } from '../../utils/colors';

interface CustomButtonProps {
    icon?: React.ReactElement;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    dark?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ icon, size = 'sm', dark = false, children, onClick}) => {
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
