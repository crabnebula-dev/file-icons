use fst::Map;
use std::path::Path;
use std::{env, fs};

include!("generated.rs");

fn main() {
    let out_dir = env::var_os("OUT_DIR").unwrap();

    let ext_icons_path = Path::new(&out_dir).join("ext_icons.bin");
    let ext_icons = Map::from_iter(EXT_ICONS).unwrap();
    fs::write(&ext_icons_path, ext_icons.into_fst().as_bytes()).unwrap();

    let filename_icons_path = Path::new(&out_dir).join("filename_icons.bin");
    let filename_icons = Map::from_iter(FILENAME_ICONS).unwrap();
    fs::write(&filename_icons_path, filename_icons.into_fst().as_bytes()).unwrap();

    let folder_icons_path = Path::new(&out_dir).join("folder_icons.bin");
    let folder_icons = Map::from_iter(FOLDER_ICONS).unwrap();
    fs::write(&folder_icons_path, folder_icons.into_fst().as_bytes()).unwrap();

    println!("cargo:rerun-if-changed=build.rs");
}
