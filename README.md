<div align="center">
  <h1>
    <code>file-icons</code>
  </h1>
  <p>
    <strong>File Icons for IDEs</strong>
  </p>
  <p>

![MIT or Apache 2.0 licensed][mit-or-apache-badge]

</p>
</div>

[mit-or-apache-badge]: https://img.shields.io/badge/license-MIT%20or%20Apache%202.0-blue.svg

This package provides simple & fast programmatic access to the icons from
[vscode-icons](https://github.com/vscode-icons/vscode-icons), letting you use
them in your own projects!

There are only two functions exported from this package: `getIconForFile` and
`getIconForFolder`. They employ a matching heuristic similar to the one used in
vscode-icons to find the best matching icon for a given file or folder.

> Note that this heuristic is simplified from the `vscode-icons` one, so it may
> not be as accurate or complete. It should be _good enough_ though, but feel
> free to open a PR if you find any issues!

## Installation

For usage in JavaScript/TypeScript projects:

```sh
npm install file-icons
# OR
yarn add file-icons
# OR
pnpm add file-icons
```

For usage in Rust projects:

```sh
cargo add file-icons
```

## Usage

### Matching a File Icon

`getIconForFile` returns the URL of the icon for a given file or `null` if no
matching icon could be found. You **MUST** call `setCDN` before calling this
function with a valid URL to where the icons from this package are hosted.

```js
import { getIconForFile, setCDN } from "file-icons";

setCDN("/icons/"); // point this to wherever you have hosted the file-icons/icons folder

const icon = getIconForFile("foo.js");
```

### Matching a Folder Icon

`getIconForFolder` returns the URL of the icon for a given folder or `null` if
no matching icon could be found. You **MUST** call `setCDN` before calling this
function with a valid URL to where the icons from this package are hosted.

```js
import { getIconForFolder, setCDN } from "file-icons";

setCDN("/icons/"); // point this to wherever you have hosted the file-icons/icons folder

const icon = getIconForFolder(".github");
```

### Usage from Rust

This package can also be used as a Rust crate. The API is a bit lower level
though, i.e. instead of returning a URL to the icon, it returns the `u64` ID of
the icon. Each ID maps to a `.svg` file in the `icons` folder.

```rust
use file_icons::get_icon_for_file;

fn main() {
    let icon = get_icon_for_file("foo.js"); // Returns the ID of the icon
    println!("{}", icon);
}
```

## Benchmarks

You said fast, but how fast is t really?

Well, plenty! Here's the benchmark results on a 2023 MacBook Pro:

```
                                [   min       mean        max   ]
_get_icon_for_file      time:   [42.963 ns  43.045 ns  43.134 ns]
_get_icon_for_folder    time:   [68.751 ns  68.879 ns  69.019 ns]
```

and here is the same running as WebAssembly in Safari on that same 2023 MacBook Pro:

```
                                [   min       mean        max   ]   
_get_icon_for_file      time:   [53.251 ns  53.374 ns  53.538 ns]
_get_icon_for_folder    time:   [70.595 ns  70.680 ns  70.771 ns]
```

## Usage with Vite

If you are using [Vite](https://vitejs.dev/) as your build tool you might want to use the plugin [vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy) to pull the icons from the node_modules folder. 

Just install the plugin with

> Taken from the plugin [README](https://github.com/sapphi-red/vite-plugin-static-copy#install)

```shell 
npm i -D vite-plugin-static-copy # yarn add -D vite-plugin-static-copy
```

and add the following configuration to your `vite.config.js` / `vite.config.ts`

```javascript
// vite.config.js / vite.config.ts
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { normalizePath } from "vite";

export default {
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(
            path.resolve(__dirname, "node_modules/file-icons/icons") + "/[!.]*"
          ),
          dest: "./icons/",
        }
      ]
    })
  ]
}
```
 
> :warning: **Make sure that the "dest" is set correctly** otherwise the ``setCDN("/icons/");`` will not work. Make sure they match.

> :warning: **This will copy all the icons into your ``./dist/icons`` directory on build and add around ~3.32 MB to it**


## Contributing

PRs are welcome!

#### License

<sup>
Licensed under either of <a href="LICENSE-APACHE">Apache License, Version
2.0</a> or <a href="LICENSE-MIT">MIT license</a> at your option.
</sup>

<br>

<sub>
Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in this crate by you, as defined in the Apache-2.0 license, shall
be dual licensed as above, without any additional terms or conditions.
</sub>
