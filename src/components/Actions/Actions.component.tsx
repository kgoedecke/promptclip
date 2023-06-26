import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import CustomIconButton from '../CustomIconButton/CustomIconButton.component';

const Actions: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '21px' }}>
      <Flex width="680px" justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="xs" color="#7D7A75">
          Actions
        </Text>

        <ActionOption text="Copy Selected" iconText="↵" dark marginTop="4px" />

        <ActionOption text="New Prompt" iconText={['⌘', 'N']} dark />

        <ActionOption text="Delete Selected" iconText={['⌘', '⌫']} dark />
      </Flex>
    </div>
  );
};

type ActionOptionProps = {
  text: string;
  iconText: string | string[];
  dark?: boolean;
  marginTop?: string;
};

const ActionOption: React.FC<ActionOptionProps> = ({ text, iconText, dark, marginTop }) => {
  const renderIcon = () => {
    if (typeof iconText === 'string') {
      return <CustomIconButton iconText={iconText} dark={dark} />;
    } else if (Array.isArray(iconText)) {
      return (
        <>
          {iconText.map((icon, index) => (
            <CustomIconButton key={index} iconText={icon} dark={dark} />
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <Flex width="fit-content" justifyContent="space-between" alignItems="center">
      <Text color="#CECECE" fontSize="12px" fontWeight="normal" marginRight="2" marginTop={marginTop}>
        {text}
      </Text>
      {renderIcon()}
    </Flex>
  );
};

export default Actions;