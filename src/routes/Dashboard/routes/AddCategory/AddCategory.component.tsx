import { useState, useContext } from 'react';
import {
  Box, FormControl, FormLabel, Text, VStack, useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CustomInput from '../../../../components/CustomInput/CustomInput.component';
import { insertCategory } from '../../../../utils/database';
import CustomButton from '../../../../components/CustomButton/CustomButton.component';
import { UpdateContext } from '../../../../contexts/update.context';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const { setUpdate } = useContext(UpdateContext);
  const toast = useToast();

  const handleAddCategory = async () => {
    const categorySlug = categoryName.trim().toLowerCase();

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

    await insertCategory(categorySlug);
    toast({
      title: 'Category added.',
      description: "We've added the category for you.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    setCategoryName('');
    setUpdate();
  };

  return (
    <Box borderRadius="md">
      <VStack spacing={4} align="start">
        <FormControl>
          <Text fontWeight="bold">Add New Category</Text>
        </FormControl>

        <FormControl>
          <FormLabel>Category name</FormLabel>
          <CustomInput
            placeholder="Enter the category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormControl>

        <CustomButton icon={<AddIcon />} onClick={handleAddCategory}>
          Add Category
        </CustomButton>
      </VStack>
    </Box>
  );
}

export default AddCategory;
