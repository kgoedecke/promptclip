mod preferences;
use auto_launch::AutoLaunchBuilder;
pub use preferences::create_preferences_if_missing;

#[tauri::command]
pub fn launch_on_login(enable: bool) -> bool {
    let auto = AutoLaunchBuilder::new()
        .set_app_name("promptclip")
        .set_app_path("/Applications/promptclip.app")
        .build()
        .unwrap();

    if enable {
        match auto.enable() {
            Ok(_) => return true,
            Err(_) => {
                println!("Failed to set auto launch on login. Permission denied");
                false
            }
        }
    } else {
        match auto.disable() {
            Ok(_) => return true,
            Err(_) => return false,
        }
    }
}
