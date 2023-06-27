import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { darkBackground, darkBackgroundBorder, lightBackground, lightBackgroundBorder } from '../../utils/colors';

interface CustomButtonProps {
    icon?: React.ReactElement;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    dark?: boolean;
    children: React.ReactNode;
    flat?: boolean;
    backgroundColour?: string;
    active?: boolean;
    [key: string]: any;
    onClick?: () => void;
}

const darkStyle = {
    background: darkBackground,
    borderColor: darkBackgroundBorder,
    border: '2px',
};

const lightStyle = {
    background: lightBackground,
    borderColor: lightBackgroundBorder,
    border: '2px',
};

const CustomButton: React.FC<CustomButtonProps> = ({ icon, size = 'sm', dark = false, backgroundColour, flat, active, children, onClick, ...rest }) => {
    return (
        <Box
            className={flat ? `flatButton` : ''}
            background={active ? 'rgba(255, 255, 255, 0.1) !important' : 'transparent'}
            borderRadius="7px"
            display="inline-flex"
            height="40px"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            gap={8}
            outline="none"
            style={flat ? {} : (dark ? darkStyle : lightStyle)}
            {...rest}
        >
            <Button
                margin={0}
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
                    {children}
                </Flex>
            </Button>
        </Box>
    );
};

export default CustomButton;
