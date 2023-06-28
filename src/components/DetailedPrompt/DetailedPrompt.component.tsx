import { Box, Text } from '@chakra-ui/react';
import { StarIcon } from '../Icons/StarsIcon';
import { UsedForIcon } from '../Icons/UsedForIcon';
import { IPrompt } from '../../types/Prompt.types';
import { HeartIcon } from '../Icons/HeartIcon';
import { deletePrompt, toggleFavorite } from '../../utils/database';
import { TrashIcon } from '../Icons/TrashIcon';

const DetailedPrompt: React.FC<IPrompt> = ({
  promptName, prompt, used, isFavorite, uuid,
}) => (
  <Box
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: 'var(--lighter-overlay-color)',
      borderRadius: '10px',
      padding: '16px',
      marginTop: '16px',
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
        <Text color="grey" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
          {prompt}
        </Text>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginRight: '24px',
        }}
      >
        <UsedForIcon width="18px" height="18px" marginRight="4px" />
        <Text fontSize="14px" color="grey" marginTop="-2px">
          {used}
        </Text>
      </div>
      {/* <EditIcon
        marginTop="1px"
        cursor="pointer"
        onClick={() => {
          console.log('Hei');
        }}
      /> */}
      <HeartIcon
        width="18px"
        height="18px"
        color={isFavorite ? 'red' : 'grey'}
        cursor="pointer"
        marginRight="24px"
        onClick={async () => {
          await toggleFavorite(uuid, isFavorite);
        }}
      />
      <TrashIcon
        width="18px"
        height="18px"
        cursor="pointer"
        color="grey"
        onClick={async () => {
          await deletePrompt(uuid);
        }}
      />
    </div>
  </Box>
);
export default DetailedPrompt;
