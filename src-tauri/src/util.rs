mod preferences;
mod search;

use auto_launch::AutoLaunchBuilder;
use std::{process::Command, time::Instant};

pub use preferences::create_preferences_if_missing;
pub use search::{search, similarity_sort};

pub enum ResultType {
    Applications = 1,
    Files = 2,
}

#[tauri::command]
pub async fn handle_input(input: String) -> (Vec<String>, f32, i32) {
    let mut result: Vec<String>;
    let result_type: ResultType;
    let start_time = Instant::now();
    if !input.starts_with("/") {
        result = search(
            input.as_str(),
            vec![
                "/Applications",
                "/System/Applications",
                "/System/Applications/Utilities",
            ],
            Some(".app"),
            Some(1),
        );
        similarity_sort(&mut result, input.as_str());
        result_type = ResultType::Applications;
    } else {
        result = search(
            input.trim_start_matches("/"),
            vec!["/Users/"],
            None,
            Some(10000),
        );
        println!("{:?}", result);
        result_type = ResultType::Files;
    }
    if result.len() == 0 {}
    let time_taken = start_time.elapsed().as_secs_f32();
    return (result, time_taken, result_type as i32);
}

#[tauri::command]
pub fn open_command(path: &str) {
    Command::new("open")
        .arg(path.trim())
        .spawn()
        .expect("failed to execute process");
}

#[tauri::command]
pub fn launch_on_login(enable: bool) -> bool {
    let auto = AutoLaunchBuilder::new()
        .set_app_name("verve")
        .set_app_path("/Applications/verve.app")
        .build()
        .unwrap();

    if enable {
        match auto.enable() {
            Ok(_) => return true,
            Err(_) => {
                println!("Failed");
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
