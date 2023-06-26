import { appWindow } from '@tauri-apps/api/window';
import { register } from '@tauri-apps/api/globalShortcut';
import { join } from '@tauri-apps/api/path';
import { readTextFile } from '@tauri-apps/api/fs';
import { preferences, paths } from '../cache';
import { appDataDir } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { createPromptsTable } from './database';
import { createDashboardWindow, getDashboardWindow } from './window';

export const fetchPreferencesData = async () => {
  const preferencesData = await readTextFile(await join(paths.get('appDataDirPath'), `preferences.json`)).then(
    (data) => JSON.parse(data)
  );
  Object.keys(preferencesData).forEach((key) => {
    preferences.set(key, preferencesData[key]);
  });
};

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

export const initialiseApp = async () => {
  await createPromptsTable();
  paths.set('appDataDirPath', await appDataDir());
  await fetchPreferencesData();
  await invoke('init_ns_panel', {
    appShortcut: preferences.get('shortcut'),
    dashboardShortcut: preferences.get('dashboard_shortcut'),
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
    getDashboardWindow()?.show();
  });

  await listen('showApp', () => {
    document.getElementById('search-input')!.focus();
  });

  await invoke('launch_on_login', {
    enable: preferences.get('launch_on_login'),
  });
};
