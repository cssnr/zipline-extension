# Contributing

- [Workflow](#Workflow)
- [Web Extension](#Web-Extension)
  - [Building](#Building)
    - [Chrome Setup](#Chrome-Setup)
    - [Firefox Setup](#Firefox-Setup)
- [Documentation](#Documentation)

> [!WARNING]  
> This guide is a work in progress and may not be complete.

This is a basic contributing guide and is a work in progress.

## Workflow

1. Fork the repository.
2. Create a branch in your fork.
3. Make your changes to the [Web Extension](#Web-Extension) or [Docs](#Documentation).
4. Create a PR back to the source repository.
5. Verify all the checks are passing.
6. Complete any applicable tasks.
7. Make sure to keep your branch up-to-date.

## Web Extension

First, clone (or download) this repository and change into the directory.

Second, install the dependencies:

```shell
npm install
```

Finally, to run Chrome or Firefox with web-ext, run one of the following:

```shell
npm run chrome
npm run firefox
```

Additionally, to Load Unpacked/Temporary Add-on make a `manifest.json` and run from the [src](src) folder, run one of
the following:

```shell
npm run manifest:chrome
npm run manifest:firefox
```

Chrome: [https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)  
Firefox: [https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

For more information on web-ext, [read this documentation](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/).  
To pass additional arguments to an `npm run` command, use `--`.  
Example: `npm run chrome -- --chromium-binary=...`

### Building

Install the requirements and copy libraries into the `src/dist` directory by running `npm install`.
See [gulpfile.js](gulpfile.js) for more information on `postinstall`.

```shell
npm install
```

To create a `.zip` archive of the [src](src) directory for the desired browser run one of the following:

```shell
npm run build
npm run build:chrome
npm run build:firefox
```

For more information on building, see the scripts section in the [package.json](package.json) file.

#### Chrome Setup

1. Build or Download a [Release](https://github.com/cssnr/zipline-extension/releases).
2. Unzip the archive, place the folder where it must remain and note its location for later.
3. Open Chrome, click the `3 dots` in the top right, click `Extensions`, click `Manage Extensions`.
4. In the top right, click `Developer Mode` then on the top left click `Load unpacked`.
5. Navigate to the folder you extracted in step #3 then click `Select Folder`.

#### Firefox Setup

1. Build or Download a [Release](https://github.com/cssnr/zipline-extension/releases).
2. Unzip the archive, place the folder where it must remain and note its location for later.
3. Go to `about:debugging#/runtime/this-firefox` and click `Load Temporary Add-on...`
4. Navigate to the folder you extracted earlier, select `manifest.json` then click `Select File`.
5. Optional: open `about:config` search for `extensions.webextensions.keepStorageOnUninstall` and set to `true`.

If you need to test a restart, you must pack the addon. This only works in ESR, Development, or Nightly.
You may also use an Unbranded Build: [https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds](https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds)

1. Run `npm run build:firefox` then use `web-ext-artifacts/{name}-firefox-{version}.zip`.
2. Open `about:config` search for `xpinstall.signatures.required` and set to `false`.
3. Open `about:addons` and drag the zip file to the page or choose Install from File from the Settings wheel.

## Documentation

These [docs](docs) are **written in plain text** using Markdown and built with [VitePress](https://vitepress.dev/).

| Location                                                             | Description               |
| -------------------------------------------------------------------- | ------------------------- |
| [docs](docs)                                                         | Documentation Root        |
| [docs/public](docs/public)                                           | Static Files Root         |
| [docs/.vitepress](docs/.vitepress)                                   | VitePress Root            |
| [docs/.vitepress/config.mts](docs/.vitepress/config.mts)             | VitePress Config File     |
| [docs/.vitepress/theme/index.js](docs/.vitepress/theme/index.js)     | VitePress Theme File      |
| [docs/.vitepress/theme/custom.css](docs/.vitepress/theme/custom.css) | VitePress Global CSS File |
| [docs/.vitepress/theme/components](docs/.vitepress/theme/components) | VitePress Components Root |

To get started, clone the repository, install the project, and generate the contributors file.

```shell
npm install
npm run get-contributors
npm run docs
```

The site should now be available at: http://localhost:5173/

- [VitePress CLI Reference](https://vitepress.dev/reference/cli)
- [VitePress Markdown Reference](https://vitepress.dev/guide/markdown)
