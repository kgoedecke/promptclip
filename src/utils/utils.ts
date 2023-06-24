import { appWindow } from '@tauri-apps/api/window';
import { register } from '@tauri-apps/api/globalShortcut';
import { join } from '@tauri-apps/api/path';
import { readTextFile } from '@tauri-apps/api/fs';
import { preferences, paths } from '../cache';
import { appDataDir } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { createPromptsTable } from './database';

export const fetchPreferencesData = async () => {
  const preferencesData = await readTextFile(
    await join(paths.get('appDataDirPath'), `preferences.json`)
  ).then(data => JSON.parse(data));
  Object.keys(preferencesData).forEach(key => {
    preferences.set(key, preferencesData[key]);
  });
};

export async function listenForHotkey(shortcut: string) {
  await register(shortcut, async () => {
    if (document.hasFocus()) {
      await appWindow.hide();
    } else {
      await appWindow.show();
      await appWindow.center();
      await appWindow.setFocus();
      // document.getElementById('searchBarInput').focus();
    }
  });
}

export async function initialiseApp(setShowDashboard: (arg0: boolean) => void) {
  await createPromptsTable();
  paths.set('appDataDirPath', await appDataDir());
  await fetchPreferencesData();
  await invoke("init_ns_panel", { appShortcut: preferences.get('shortcut'), dashboardShortcut: preferences.get('dashboard_shortcut') });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      appWindow.hide();
    }
  });

  await listen('showDashboard', () => {
    setShowDashboard(true);
  });

  await listen('showApp', () => {
    setShowDashboard(false);
  });

  await invoke('launch_on_login', {
    enable: preferences.get('launch_on_login'),
  });

}
