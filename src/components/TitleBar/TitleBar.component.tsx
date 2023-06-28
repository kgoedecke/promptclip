/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { appWindow } from '@tauri-apps/api/window';

function TitleBar() {
  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-button" id="titlebar-close" onClick={() => appWindow.hide()} />
      <div className="titlebar-button" id="titlebar-minimize" onClick={() => appWindow.minimize()} />
    </div>
  );
}

export default TitleBar;
