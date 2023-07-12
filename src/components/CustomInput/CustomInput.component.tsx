import React, { CSSProperties } from 'react';
import { Textarea, TextareaProps } from '@chakra-ui/react';

interface InputProps extends Omit<TextareaProps, 'size'> {
  containerStyle?: CSSProperties;
  size?: 'sm' | 'md' | 'lg' | 'xs';
  multiline?: boolean;
}

const CustomInput: React.FC<InputProps> = ({
  containerStyle, size, multiline, ...rest
}) => {
  const mergedContainerStyle: CSSProperties = {
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

  return (
    <Textarea
      size={size}
      {...rest}
      style={mergedContainerStyle}
      _placeholder={{ color: '#667085' }}
      resize={multiline ? 'vertical' : 'none'}
      rows={multiline ? 5 : 1}
    />
  );
};

export default CustomInput;
