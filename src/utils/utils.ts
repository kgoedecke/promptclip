import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import { register } from '@tauri-apps/api/globalShortcut';
import { join } from '@tauri-apps/api/path';
import { readTextFile } from '@tauri-apps/api/fs';
import { preferences, paths } from '../cache';
import { appDataDir } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { createPromptsTable } from './database';

// TODO: Remove this
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
    }
  });
}

const configureWindow = async () => {
  await appWindow.center();
  await appWindow.show();
  await appWindow.setFocus();
};

export const switchToDashboard = async () => {
  await setWindowSize(1000, 722);
  await configureWindow();
};

export const switchToApp = async () => {
  await setWindowSize(728, 646);
  await configureWindow();
};

export const setWindowSize = async (width: number, height: number) => {
  await appWindow.setSize(new LogicalSize(width, height));
};

export const setWindowSizeToBody = async () => {
  const body = document.body;
  await appWindow.setSize(new LogicalSize(body.clientWidth, body.clientHeight));
};

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

  document.onkeyup = (event) => {
    if (event.metaKey && event.key === 'n') {
      setShowDashboard(true);
    }
  };

  document.onblur = async () => {
    await appWindow.hide();
    setShowDashboard(false);
  };

  await listen('showDashboard', () => {
    setShowDashboard(true);
  });

  await listen('showApp', () => {
    setShowDashboard(false);
    document.getElementById('search-input')!.focus();
  });

  await invoke('launch_on_login', {
    enable: preferences.get('launch_on_login'),
  });

}
