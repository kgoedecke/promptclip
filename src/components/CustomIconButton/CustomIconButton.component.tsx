import { IconButton, Text } from "@chakra-ui/react"

const lightBackground = 'linear-gradient(180deg, #6851E2 0%, #7C69E9 100%)';
const darkBackground = 'linear-gradient(180deg, #1D1D1F 0%, #2A2A2C 100%)';
const darkBackgroundBorder = '#2A2A2C';
const lightBackgroundBorder = '#8F7FF5';

interface CustomIconButtonProps {
    iconText?: React.ReactElement | string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    dark?: boolean;
    [key: string]: any;
    onClick?: () => void;
}
// TODO: Fix blue border on focus
const CustomIconButton = ({ onClick, dark, iconText, size = 'sm', ...rest }: CustomIconButtonProps) => {
    return (
        <IconButton
            icon={<Text fontSize="md" color="#5A595C" {...rest}>{iconText}</Text>}
            aria-label="New Prompt (Cmd+N)"
            onClick={onClick}
            mr={2}
            size={size}
            border={'2px'}
            textColor={'white'}
            _hover={{}}
            borderColor={dark ? darkBackgroundBorder : lightBackgroundBorder}
            background={dark ? darkBackground : lightBackground}
            disabled={true}
        />
    )
}

export default CustomIconButton;