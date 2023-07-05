import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  VStack,
  useToast,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CustomInput from '../../../../components/CustomInput/CustomInput.component';
import { updatePrompt, getCategories, getPromptByUUID } from '../../../../utils/database';
import CustomButton from '../../../../components/CustomButton/CustomButton.component';
import { UpdateContext } from '../../../../contexts/update.context';
import { IPrompt, ICategory } from '../../../../types/Prompt.types';

function EditPrompt() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { setUpdate } = useContext(UpdateContext);
  const toast = useToast();
  const { uuid } = useParams();
  if (!uuid) {
    return null;
  }

  useEffect(() => {
    const fetchPromptData = async () => {
      const prompt = await getPromptByUUID(uuid);
      if (prompt) {
        setTitle(prompt.promptName);
        setText(prompt.prompt);
        setSelectedCategory(prompt.category_id || '');
      }
    };

    const fetchCategories = async () => {
      setCategories(await getCategories());
    };

    fetchPromptData();
    fetchCategories();
  }, [uuid]);

  const handleEditPrompt = async () => {
    if (title === '' || text === '') {
      toast({
        title: 'Error',
        description: 'Please enter a title and text.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const updatedPrompt: IPrompt = {
      uuid,
      promptName: title,
      prompt: text,
      created_at: 0, // Set the appropriate created_at value
      last_used_at: null, // Set the appropriate last_used_at value
      used: 0, // Set the appropriate used value
      isFavorite: false, // Set the appropriate isFavorite value
      category_id: selectedCategory || null,
    };

    await updatePrompt(updatedPrompt);
    toast({
      title: 'Prompt updated.',
      description: 'Edited the prompt.',
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
          <Text fontWeight="bold">Edit Prompt</Text>
        </FormControl>

        <FormControl>
          <FormLabel>Prompt title</FormLabel>
          <CustomInput
            placeholder="Write your prompt title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

        <CustomButton icon={<AddIcon />} onClick={handleEditPrompt}>
          Save Prompt
        </CustomButton>
      </VStack>
    </Box>
  );
}

export default EditPrompt;
