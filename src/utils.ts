import { appWindow } from '@tauri-apps/api/window';
import { register } from '@tauri-apps/api/globalShortcut';
import { join } from '@tauri-apps/api/path';
import { readTextFile } from '@tauri-apps/api/fs';
import { preferences, paths } from './cache';


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
