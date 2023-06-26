import { appWindow, LogicalSize } from "@tauri-apps/api/window";

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