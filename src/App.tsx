import "./App.css";
import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';
import { appDataDir } from '@tauri-apps/api/path';
import { preferences, paths } from './cache';
import { fetchPreferencesData } from "./utils";
import { useEffect, useState } from "react";
import { listen } from '@tauri-apps/api/event';

import Search from "./components/Search/Search.component";
import Dashboard from "./components/Dashboard/Dashboard.component";

function App() {

  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    (async () => {
      paths.set('appDataDirPath', await appDataDir());
      await fetchPreferencesData();
      await invoke("init_ns_panel", { appShortcut: preferences.get('shortcut'), dashboardShortcut: preferences.get('dashboard_shortcut') });

      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          appWindow.hide();
        }
      });

      await listen('showDashboard', data => {
        setShowDashboard(true);
      });

      await listen('showApp', data => {
        setShowDashboard(false);
      });

      await invoke('launch_on_login', {
        enable: preferences.get('launch_on_login'),
      });
    })();
  }, [])

  return (
    <div className="container">
      {showDashboard ? <Dashboard /> : <Search />}
    </div>
  );
}

export default App;
