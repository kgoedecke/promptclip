import { useState, useEffect } from 'react';
import {
  Text, Switch, Button, Box,
} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api';
import { store, updateShortcut } from '../../../../utils/utils';

const Settings = () => {
  const [shortcut, setShortcut] = useState('');
  const [launchOnLogin, setLaunchOnLogin] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setShortcut(await store.get('shortcut') || '');
      setLaunchOnLogin(await store.get('launch_on_login') || false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (isListening) {
        event.preventDefault();
        const {
          key, ctrlKey, altKey, shiftKey, metaKey,
        } = event;

        if (key !== 'Control' && key !== 'Alt' && key !== 'Shift' && key !== 'Meta') {
          let shortcutString = '';

          if (ctrlKey) shortcutString += 'Ctrl+';
          if (altKey) shortcutString += 'Alt+';
          if (shiftKey) shortcutString += 'Shift+';
          if (metaKey) shortcutString += 'Command+';

          shortcutString += key;
          setShortcut(shortcutString);
          setIsListening(false);
          updateShortcut(shortcutString);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening]);

  const handleShortcutChange = () => {
    setShortcut('');
    setIsListening(true);
  };

  const handleLaunchOnLoginChange = async (event: any) => {
    const { checked } = event.target;
    setLaunchOnLogin(checked);
    await store.set('launch_on_login', checked);
    await invoke('launch_on_login', {
      enable: checked,
    });
    store.save();
  };

  return (
    <div>
      <Text fontWeight="bold">Settings</Text>

      <Box display="flex" alignItems="center" mt="4">
        <Text mr="4">Change Shortcut:</Text>
        <Button
          borderWidth="1px"
          borderRadius="4px"
          p="2"
          onClick={handleShortcutChange}
        >
          {isListening ? 'Listening...' : shortcut
            .replace('Meta', '⌘')
            .replace('Command', '⌘')
            .replace('Control', '⌃')
            .replace('Alt', '⌥')
            .replace('Shift', '⇧')
            .toUpperCase() || 'Press a key...'}
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
