import { IconButton, Text } from "@chakra-ui/react"
import { darkBackground, darkBackgroundBorder, lightBackground, lightBackgroundBorder } from '../../utils/colors';

interface CustomIconButtonProps {
    iconText?: React.ReactElement | string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    dark?: boolean;
    flat?: boolean;
    backgroundColour?: string;
    [key: string]: any;
    onClick?: () => void;
}
// TODO: Fix blue border on focus
const CustomIconButton = ({ onClick, dark, iconText, size = 'sm', flat, backgroundColour, ...rest }: CustomIconButtonProps) => {
    return (
        <IconButton
            icon={<Text fontSize="md" color="#5A595C" {...rest}>{iconText}</Text>}
            aria-label="icon-button"
            onClick={onClick}
            mr={2}
            size={size}
            border={flat ? 'none' : '2px'}
            textColor={'white'}
            _hover={{}}
            borderColor={dark ? darkBackgroundBorder : lightBackgroundBorder}
            background={backgroundColour ? backgroundColour : (dark ? darkBackground : lightBackground)}
            disabled={true}
        />
    )
}

export default CustomIconButton;