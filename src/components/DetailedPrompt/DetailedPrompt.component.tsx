import React, { useContext } from 'react';
import {
  Box, Text, Tag, useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CopyIcon } from '@chakra-ui/icons';
import { IPrompt } from '../../types/Prompt.types';
import { deletePrompt, toggleFavorite } from '../../utils/database';
import { UpdateContext } from '../../contexts/update.context';
import { CategoriesContext } from '../../contexts/categories.context';
import { routes } from '../../routes/Dashboard/routes/routes';
import StarsIcon from '../Icons/StarsIcon.png';
import { UsedForIcon } from '../Icons/UsedForIcon';
import { HeartIcon } from '../Icons/HeartIcon';
import { TrashIcon } from '../Icons/TrashIcon';

const DetailedPrompt: React.FC<IPrompt> = ({
  promptName,
  prompt,
  used,
  isFavorite,
  uuid,
  category_id,
}) => {
  const { setUpdate } = useContext(UpdateContext);
  const { categories } = useContext(CategoriesContext);
  const toast = useToast();
  const promptCategory = categories.find((category) => category.uuid === category_id)?.name;
  const navigate = useNavigate();

  const editPrompt = () => {
    navigate(`${routes.editPrompt}/${uuid}`);
  };

  const handleToggleFavorite = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await toggleFavorite(uuid, isFavorite);
    setUpdate();
  };

  const handleDeletePrompt = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await deletePrompt(uuid);
    setUpdate();
  };

  const handleCopyPrompt = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await navigator.clipboard.writeText(prompt);
    toast({
      title: 'Prompt copied to clipboard',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        backgroundColor="var(--lighter-overlay-color)"
        borderRadius="10px"
        padding="16px"
        marginTop="8px"
        cursor="pointer"
        _hover={{
          backgroundColor: 'var(--light-overlay-color)',
        }}
        onClick={editPrompt}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <img
            src={StarsIcon}
            alt="Star icon"
            style={{
              width: '24px', height: '24px', marginRight: '12px',
            }}
          />
          <div
            style={{
              width: '506px',
            }}
          >
            <Text fontWeight="bold" color="white">
              {promptName}
            </Text>
            <Text color="white" opacity="60%" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
              {prompt}
            </Text>
            {promptCategory && (
              <Tag
                size="sm"
                backgroundColor="var(--lighter-overlay-color)"
                color="grey"
                marginTop="8px"
              >
                {promptCategory}
              </Tag>
            )}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <UsedForIcon width="18px" height="18px" marginRight="4px" />
            <Text fontSize="14px" color="grey" marginTop="-2px">
              {used}
            </Text>
          </div>
          <CopyIcon
            width="18px"
            height="18px"
            color="grey"
            cursor="pointer"
            onClick={handleCopyPrompt}
          />
          <HeartIcon
            width="18px"
            height="18px"
            color={isFavorite ? 'red' : 'grey'}
            cursor="pointer"
            onClick={handleToggleFavorite}
          />
          <TrashIcon
            width="18px"
            height="18px"
            cursor="pointer"
            color="grey"
            onClick={handleDeletePrompt}
          />
        </div>
      </Box>
    </div>
  );
};

export default DetailedPrompt;
