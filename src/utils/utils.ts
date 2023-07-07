import { appWindow } from '@tauri-apps/api/window';
import { register } from '@tauri-apps/api/globalShortcut';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { Store } from 'tauri-plugin-store-api';
import { createPromptsTable } from './database';
import { createDashboardWindow, getDashboardWindow } from './window';
import { IPrompt } from '../types/Prompt.types';

export const listenForHotkey = async (shortcut: string) => {
  await register(shortcut, async () => {
    if (document.hasFocus()) {
      await appWindow.hide();
    } else {
      await appWindow.show();
      await appWindow.center();
      await appWindow.setFocus();
    }
  });
};

const createSettings = async (store: Store) => {
  if (!(await store.get('shortcut'))) {
    await store.set('shortcut', 'Command+Shift+G');
    await store.set('launch_on_login', true);
  }
};

export const initialiseApp = async () => {
  await createPromptsTable();
  const store = new Store('.settings.dat');
  await createSettings(store);
  await invoke('init_ns_panel', {
    appShortcut: await store.get('shortcut'),
  });
  createDashboardWindow();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      appWindow.hide();
    }
  });

  document.onkeyup = (event) => {
    if (event.metaKey && event.key === 'n') {
      getDashboardWindow()?.show();
      getDashboardWindow()?.setFocus();
    }
  };

  document.onblur = async () => {
    await appWindow.hide();
  };

  await listen('showDashboard', () => {
    appWindow.show();
    appWindow.setFocus();
    getDashboardWindow()?.show();
  });

  await listen('showApp', () => {
    // document.getElementById('search-input')!.focus();
  });

  await invoke('launch_on_login', {
    enable: await store.get('launch_on_login'),
  });
};

export const filterPrompts = (prompts: IPrompt[], searchInput: string): IPrompt[] => {
  const filteredPrompts = prompts.filter((prompt) => {
    const promptNameMatches = prompt.promptName.toLowerCase().includes(searchInput.toLowerCase());
    const promptMatches = prompt.prompt.toLowerCase().includes(searchInput.toLowerCase());
    return promptNameMatches || promptMatches;
  });

  return filteredPrompts;
};
