import { appWindow } from "@tauri-apps/api/window"

const TitleBar = () => {
    return (
        <div data-tauri-drag-region className="titlebar">
            <div className="titlebar-button" id="titlebar-close" onClick={() => appWindow.hide()}>
            </div>
            <div className="titlebar-button" id="titlebar-minimize" onClick={() => appWindow.minimize()}>
            </div>
        </div>
    )
}

export default TitleBar;