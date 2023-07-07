#![warn(clippy::nursery, clippy::pedantic)]

mod ns_panel;
mod util;

use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
    Window,
};

#[allow(unused_imports)]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

use util::launch_on_login;

fn create_system_tray() -> SystemTray {
    let quit = CustomMenuItem::new("Quit".to_string(), "Quit");
    let show = CustomMenuItem::new("Show".to_string(), "Show");
    let hide = CustomMenuItem::new("Hide".to_string(), "Hide");
    let dashboard = CustomMenuItem::new("Dashboard".to_string(), "Dashboard");
    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        .add_item(dashboard)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    SystemTray::new().with_menu(tray_menu)
}

#[tauri::command]
fn apply_vibrancy_to_dashboard(window: Window) {
    // let window = app.get_window("main").unwrap();
    apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(10.0))
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            launch_on_login,
            ns_panel::init_ns_panel,
            ns_panel::show_app,
            ns_panel::hide_app,
            apply_vibrancy_to_dashboard
        ])
        .setup(|app| {
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            let window = app.get_window("main").unwrap();
            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(10.0))
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
            window.hide().unwrap();
            Ok(())
        })
        .manage(ns_panel::State::default())
        .system_tray(create_system_tray())
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "Hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                "Show" => {
                    let window = app.get_window("main").unwrap();
                    window.emit("showApp", Some("Yes")).unwrap();
                    window.show().unwrap();
                    window.center().unwrap();
                }
                "Dashboard" => {
                    let window = app.get_window("main").unwrap();
                    window.emit("showDashboard", Some("Yes")).unwrap();
                    window.show().unwrap();
                    window.center().unwrap();
                }
                "Quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
