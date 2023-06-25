import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import CustomIconButton from '../CustomIconButton/CustomIconButton.component';

const Actions: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'21px'}}>
      <Flex width="680px" justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="xs" color="#7D7A75">Actions</Text>

        <Flex width="fit-content" justifyContent="space-between" alignItems="center">
          <Text color="#CECECE" size="12px" fontWeight="normal" mr="2">Copy Selected</Text>
          <CustomIconButton iconText={"↵"} dark marginTop="4px"></CustomIconButton>
        </Flex>

        <Flex width="fit-content" justifyContent="space-between" alignItems="center">
          <Text color="#CECECE" size="12px" fontWeight="normal" mr="2">New Prompt</Text>
          <CustomIconButton iconText={"⌘"} dark></CustomIconButton>
          <CustomIconButton iconText={"N"} dark></CustomIconButton>
        </Flex>

        <Flex width="fit-content" justifyContent="space-between" alignItems="center">
          <Text color="#CECECE" size="12px" fontWeight="normal" mr="2">Delete Selected</Text>
          <CustomIconButton iconText={"⌘"} dark></CustomIconButton>
          <CustomIconButton iconText={"⌫"} dark marginTop="1px"></CustomIconButton>
        </Flex>
      </Flex>
    </div>
  );
};

export default Actions;
