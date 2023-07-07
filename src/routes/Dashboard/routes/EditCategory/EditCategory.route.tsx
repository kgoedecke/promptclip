import { useState, useContext, useEffect } from 'react';
import {
  Box, FormControl, FormLabel, Text, VStack, useToast,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import CustomInput from '../../../../components/CustomInput/CustomInput.component';
import { updateCategory, getCategoryByUUID } from '../../../../utils/database';
import CustomButton from '../../../../components/CustomButton/CustomButton.component';
import { UpdateContext } from '../../../../contexts/update.context';

function EditCategory() {
  const { uuid } = useParams();
  if (!uuid) {
    return null;
  }
  const [newCategoryName, setNewCategoryName] = useState('');
  const { setUpdate } = useContext(UpdateContext);
  const toast = useToast();

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const category = await getCategoryByUUID(uuid);
        if (category) {
          setNewCategoryName(category.name);
        }
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to fetch the category.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    };

    fetchCategoryName();
  }, [uuid]);

  const handleEditCategory = async () => {
    const categorySlug = newCategoryName.trim().toLowerCase();

    if (!/^[a-z0-9]+$/i.test(categorySlug)) {
      toast({
        title: 'Error',
        description: 'Category name can only contain letters and numbers.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (categorySlug === '') {
      toast({
        title: 'Error',
        description: 'Please enter a category name.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      await updateCategory(uuid, categorySlug);
      setUpdate();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update the category.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Category updated.',
      description: "We've updated the category for you.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    setUpdate();
  };

  return (
    <Box borderRadius="md">
      <VStack spacing={4} align="start">
        <FormControl>
          <Text fontWeight="bold">Edit Category</Text>
        </FormControl>

        <FormControl>
          <FormLabel>Category name</FormLabel>
          <CustomInput
            placeholder="Enter the category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            autoFocus
          />
        </FormControl>

        <CustomButton icon={<CheckIcon />} onClick={handleEditCategory}>
          Save Changes
        </CustomButton>
      </VStack>
    </Box>
  );
}

export default EditCategory;
