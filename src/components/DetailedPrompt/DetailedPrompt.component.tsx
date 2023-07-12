import React, { useContext } from 'react';
import { Box, Text, Tag } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IPrompt } from '../../types/Prompt.types';
import { deletePrompt, toggleFavorite } from '../../utils/database';
import { UpdateContext } from '../../contexts/update.context';
import { CategoriesContext } from '../../contexts/categories.context';
import { routes } from '../../routes/Dashboard/routes/routes';
import { StarIcon } from '../Icons/StarsIcon';
import { UsedForIcon } from '../Icons/UsedForIcon';
import { HeartIcon } from '../Icons/HeartIcon';
import { TrashIcon } from '../Icons/TrashIcon';
import { EditIcon } from '../Icons/EditIcon';

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
  const promptCategory = categories.find((category) => category.uuid === category_id)?.name;
  const navigate = useNavigate();

  const handleEditPrompt = () => {
    navigate(`${routes.editPrompt}/${uuid}`);
  };

  const handleToggleFavorite = async () => {
    await toggleFavorite(uuid, isFavorite);
    setUpdate();
  };

  const handleDeletePrompt = async () => {
    await deletePrompt(uuid);
    setUpdate();
  };

  return (
    <div>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: 'var(--lighter-overlay-color)',
          borderRadius: '10px',
          padding: '16px',
          marginTop: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <StarIcon width="24px" height="24px" marginRight="12px" />
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
          <EditIcon
            cursor="pointer"
            marginTop="1px"
            onClick={handleEditPrompt}
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
