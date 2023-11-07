/*!
This package provides simple & fast programmatic access to the icons from
[vscode-icons](https://github.com/vscode-icons/vscode-icons).

This crate is heavily optimized for small file size.

## `no_std` support

This crate is primarily meant to be used on the web through npm.
To this end a lot of optimization has been done to reduce the size of the WASM binary (the current file size is 17.6kB).

When `no_std` support is enabled, this crate will use neither `std` nor `alloc`.
To enable it, you have to disable default features:

```toml
file-icons = { version = "0.1", default-features = false }
```

In `no_std` mode, [`get_icon_for_file`] and [`get_icon_for_folder`] are *not* available.
 */

#![cfg_attr(not(feature = "std"), no_std)]
#![cfg_attr(feature = "_web_build", feature(core_intrinsics))]

use core::{slice, str};
use fst::Map;
use lazy_static::lazy_static;
#[cfg(feature = "std")]
use std::path::Path;

lazy_static! {
    static ref FILENAME_ICONS: Map<&'static [u8]> = {
        const FILENAME_ICONS_BYTES: &[u8] =
            include_bytes!(concat!(env!("OUT_DIR"), "/filename_icons.bin"));

        // the bytes are generated by fst in the build script, so we can use `unwrap_unchecked`
        unsafe { Map::new(FILENAME_ICONS_BYTES).unwrap_unchecked() }
    };
    static ref EXT_ICONS: Map<&'static [u8]> = {
        const EXT_ICONS_BYTES: &[u8] = include_bytes!(concat!(env!("OUT_DIR"), "/ext_icons.bin"));

        // the bytes are generated by fst in the build script, so we can use `unwrap_unchecked`
        unsafe {
            Map::new(EXT_ICONS_BYTES).unwrap_unchecked()
        }
    };
    static ref FOLDER_ICONS: Map<&'static [u8]> = {
        const FOLDER_ICONS_BYTES: &[u8] =
            include_bytes!(concat!(env!("OUT_DIR"), "/folder_icons.bin"));

        // the bytes are generated by fst in the build script, so we can use `unwrap_unchecked`
        unsafe{ Map::new(FOLDER_ICONS_BYTES).unwrap_unchecked() }
    };
}

/// Unsafe low-level version of [`get_icon_for_file`]. Only use this in `no_std` mode.
#[no_mangle]
#[inline]
pub unsafe fn _get_icon_for_file(data: *const u8, len: usize) -> Option<u64> {
    let buf = unsafe { slice::from_raw_parts(data, len) };
    let path = str::from_utf8_unchecked(buf);
    let filename = path.rsplit_once('/').map(|(_, f)| f).unwrap_or(path);

    let icon = FILENAME_ICONS.get(filename.as_bytes()).or_else(|| {
        let ext = path.rsplit_once('.')?.1;

        EXT_ICONS.get(ext.as_bytes())
    });

    icon
}

/// Unsafe low-level version of [`get_icon_for_folder`]. Only use this in `no_std` mode.
#[no_mangle]
#[inline]
pub unsafe fn _get_icon_for_folder(data: *const u8, len: usize) -> Option<u64> {
    let buf = unsafe { slice::from_raw_parts(data, len) };
    let path = str::from_utf8_unchecked(buf);
    let foldername = path.rsplit_once('/').map(|(_, f)| f).unwrap_or(path);

    let icon = FOLDER_ICONS.get(foldername.as_bytes());

    icon
}

/// Returns the ID of an icon for a given file.
///
/// If no icon can be found, `None` is returned.
/// The ID corresponds to the file names in the `icons` folder
#[cfg(feature = "std")]
pub fn get_icon_for_file(path: &Path) -> Option<u64> {
    let path = path.to_string_lossy();
    unsafe { _get_icon_for_file(path.as_ptr() as *mut u8, path.len()) }
}

/// Returns the ID of an icon for a given folder.
///
/// If no icon can be found, `None` is returned.
/// The ID corresponds to the file names in the `icons` folder
#[cfg(feature = "std")]
pub fn get_icon_for_folder(path: &Path) -> Option<u64> {
    let path = path.to_string_lossy();
    unsafe { _get_icon_for_folder(path.as_ptr() as *mut u8, path.len()) }
}

#[cfg(feature = "_web_build")]
#[panic_handler]
fn panic_handler(_info: &core::panic::PanicInfo) -> ! {
    core::intrinsics::abort()
}
