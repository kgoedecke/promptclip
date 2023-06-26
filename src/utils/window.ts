import { invoke } from "@tauri-apps/api";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { WebviewWindow } from '@tauri-apps/api/window'

const configureWindow = async () => {
    await appWindow.center();
    await appWindow.show();
    await appWindow.setFocus();
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

export const createDashboardWindow = async () => {
    const DashboardWindow = new WebviewWindow('dashboard', {
        url: '/dashboard',
        title: 'PromptClip',
        resizable: false,
        transparent: true,
        decorations: false,
    });
    await invoke('apply_vibrancy_to_dashboard', {
        window: DashboardWindow
    })
    DashboardWindow.hide();
    DashboardWindow.setSize(new LogicalSize(1000, 722));
    DashboardWindow.center();
    DashboardWindow.onCloseRequested((event) => {
        event.preventDefault();
        DashboardWindow.hide();
    });
}

export const getDashboardWindow = () => {
    return WebviewWindow.getByLabel('dashboard');
}