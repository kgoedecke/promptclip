import { useState, useContext, useEffect } from 'react';
import {
  Box, FormControl, FormLabel, Text, VStack, useToast, Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CustomInput from '../../../../components/CustomInput/CustomInput.component';
import { storePrompt, getCategories } from '../../../../utils/database';
import CustomButton from '../../../../components/CustomButton/CustomButton.component';
import { UpdateContext } from '../../../../contexts/update.context';
import { ICategory } from '../../../../types/Prompt.types';

function AddPrompt() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { setUpdate } = useContext(UpdateContext);
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategories());
    };

    fetchCategories();
  }, []);

  const handleAddPrompt = async () => {
    if (!title.trim() || !text.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid title and text.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    await storePrompt(title, text, selectedCategory || null);
    toast({
      title: 'Prompt added.',
      description: "We've added your prompt for you.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    setTitle('');
    setText('');
    setSelectedCategory('');
    setUpdate();
  };

  return (
    <Box borderRadius="md" overflowY="auto" maxHeight="calc(100vh - 127px)">
      <VStack spacing={4} align="start">
        <FormControl>
          <Text fontWeight="bold">Add New Prompt</Text>
        </FormControl>

        <FormControl>
          <FormLabel>Prompt title</FormLabel>
          <CustomInput
            placeholder="Write your prompt title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </FormControl>

        <FormControl>
          <FormLabel>Prompt text</FormLabel>
          <CustomInput
            placeholder="Enter your prompt text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
          />
        </FormControl>

        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select a category"
            color="#667085"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              borderRadius: '7px',
              border: '0.5px solid var(--dark-quaternary, rgba(255, 255, 255, 0.10))',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {categories.map((category) => (
              <option key={category.uuid} value={category.uuid}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <CustomButton icon={<AddIcon />} onClick={handleAddPrompt}>
          Add Prompt
        </CustomButton>
      </VStack>
    </Box>
  );
}

export default AddPrompt;
