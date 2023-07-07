import { useState } from 'react';
import {
  Text, Switch, Button, Box,
} from '@chakra-ui/react';

const Settings = () => {
  const [shortcut, setShortcut] = useState('');
  const [launchOnLogin, setLaunchOnLogin] = useState(false);

  const handleShortcutChange = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;
    setShortcut(key);
  };

  const handleLaunchOnLoginChange = () => {
    setLaunchOnLogin((prevValue) => !prevValue);
  };

  return (
    <div>
      <Text fontWeight="bold">Settings</Text>

      <Box display="flex" alignItems="center" mt="4">
        <Text mr="4">Change Shortcut:</Text>
        <Button
          variant="outline"
          borderWidth="1px"
          borderRadius="4px"
          p="2"
          onClick={() => {}}
          onKeyDown={handleShortcutChange}
        >
          {shortcut || 'Press a key...'}
        </Button>
      </Box>

      <Box display="flex" alignItems="center" mt="4">
        <Text mr="4">Launch on Login:</Text>
        <Switch
          isChecked={launchOnLogin}
          onChange={handleLaunchOnLoginChange}
        />
      </Box>
    </div>
  );
};

export default Settings;
