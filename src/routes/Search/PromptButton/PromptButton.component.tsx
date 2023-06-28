import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { appWindow } from '@tauri-apps/api/window';
import { StarIcon } from '../../../components/Icons/StarsIcon';
import CustomIconButton from '../../../components/CustomIconButton/CustomIconButton.component';
import { incrementUsageAndSetLastUsed } from '../../../utils/database';
import { IPrompt } from '../../../types/Prompt.types';

interface IPromptProps extends IPrompt {
  index: number;
}

const copyToClipboard = async (
  value: string,
  e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
) => {
  if (e.type === 'keydown' && (e as React.KeyboardEvent<HTMLButtonElement>).key !== 'Enter') {
    return;
  }
  await navigator.clipboard.writeText(value);
  await appWindow.hide();
};

const Prompt: React.FC<IPromptProps> = ({
  uuid, prompt, promptName, index,
}) => {
  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    incrementUsageAndSetLastUsed(uuid);
    copyToClipboard(prompt, e);
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
      _focus={{ bg: '#1B1A1D' }}
      id={uuid.toString()}
    >
      <Flex align="center">
        <StarIcon width="24px" height="24px" />
        <Text ml={2}>{promptName}</Text>
      </Flex>
      <Flex>
        <CustomIconButton iconText="⌘" dark />
        <CustomIconButton dark iconText={index.toString()} />
      </Flex>
    </Button>
  );
};

export default Prompt;
