import React from 'react';
import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';

interface InputProps extends Omit<ChakraInputProps, 'size'> {
  containerStyle?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg' | 'xs';
}

const CustomInput: React.FC<InputProps> = ({ containerStyle, size, ...rest }) => {
  const mergedContainerStyle = {
    display: 'flex',
    padding: '10px 12px',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'stretch',
    borderRadius: '7px',
    border: '0.5px solid var(--dark-quaternary, rgba(255, 255, 255, 0.10))',
    background: 'rgba(255, 255, 255, 0.05)',
    ...containerStyle,
  };

  return <ChakraInput size={size} {...rest} style={mergedContainerStyle} _placeholder={{ color: "#667085" }} />;
};

export default CustomInput;
