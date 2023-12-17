// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::SystemTray;
use tauri::{ActivationPolicy, CustomMenuItem, SystemTrayEvent, SystemTrayMenu};
extern crate ptime;
extern crate time;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new().add_item(quit);
    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .system_tray(tray)
        .setup(|app| {
            let p_tm = ptime::from_gregorian(time::now());
            let _ = app.tray_handle().set_title(&p_tm.to_string("E d MMM"));
            let _ = app.set_activation_policy(ActivationPolicy::Accessory);
            Ok(())
        })
        .on_system_tray_event(|_app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
