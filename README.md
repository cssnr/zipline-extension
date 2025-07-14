[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/gkkloiijbkgkbmgckfefigkjckhdikkd?logo=google&logoColor=white&label=google%20users)](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd)
[![Mozilla Add-on Users](https://img.shields.io/amo/users/zipline-extension?logo=mozilla&label=mozilla%20users)](https://addons.mozilla.org/addon/zipline-extension)
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/gkkloiijbkgkbmgckfefigkjckhdikkd?label=chrome&logo=googlechrome)](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd)
[![Mozilla Add-on Version](https://img.shields.io/amo/v/zipline-extension?label=firefox&logo=firefox)](https://addons.mozilla.org/addon/zipline-extension)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/zipline-extension?logo=github)](https://github.com/cssnr/zipline-extension/releases/latest)
[![Build](https://img.shields.io/github/actions/workflow/status/cssnr/zipline-extension/build.yaml?logo=github&label=build)](https://github.com/cssnr/zipline-extension/actions/workflows/build.yaml)
[![Test](https://img.shields.io/github/actions/workflow/status/cssnr/zipline-extension/test.yaml?logo=github&label=test)](https://github.com/cssnr/zipline-extension/actions/workflows/test.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_zipline-extension&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cssnr_zipline-extension)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/zipline-extension?logo=github&label=updated)](https://github.com/cssnr/zipline-extension/graphs/commit-activity)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/zipline-extension?logo=htmx&logoColor=white)](https://github.com/cssnr/zipline-extension)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/zipline-extension?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/zipline-extension)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# Zipline Web Extension

A [Chrome](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd) Web Extension
and [Firefox](https://addons.mozilla.org/addon/zipline-extension) Browser Addon for
a [Zipline v4](https://github.com/diced/zipline) server to upload and shorten urls,
view and edit files, and much more...

- [Install](#install)
- [Features](#features)
  - [Known Issues](#known-issues)
- [Configure](#configure)
- [Setup](#setup)
- [Support](#support)
- [Contributing](#contributing)

# Install

- [Google Chrome Web Store](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd)
- [Mozilla Firefox Add-ons](https://addons.mozilla.org/addon/zipline-extension)

[![Chrome](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/chrome_48.png)](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd)
[![Firefox](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/firefox_48.png)](https://addons.mozilla.org/addon/zipline-extension)
[![Edge](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/edge_48.png)](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd)
[![Chromium](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/chromium_48.png)](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd)
[![Brave](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/brave_48.png)](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd)
[![Opera](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/opera_48.png)](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd)

All Chromium Based Browsers can install the extension from the
[Chrome Web Store](https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd).

Mobile browser support available for
[Firefox](https://addons.mozilla.org/addon/zipline-extension).

[![QR Code Firefox](https://raw.githubusercontent.com/smashedr/repo-images/refs/heads/master/zipline/extension/qr-code-firefox.png)](https://addons.mozilla.org/addon/zipline-extension)

[![Screenshot](https://raw.githubusercontent.com/smashedr/repo-images/refs/heads/master/zipline/extension/screenshot.jpg)](https://github.com/cssnr/zipline-extension?tab=readme-ov-file#readme)

> [!IMPORTANT]  
> This Web Extension is designed to work with a [Zipline v4](https://github.com/diced/zipline) server.

## Features

- View Recent Uploads on Popup/Popout.
- Drag and Drop Upload from Popup and Side Panel.
- Right Click any Image, Video, or Audio to Upload.
- Right Click any URL to Shorten.
- Preview Popup Images on Hover.
- Set Favorite, Password, and Expiration.
- Customize Popup Icons, Width and Number of Files.
- Automatically Authenticate with Zipline.
- Automatic Dark/Light Mode based on Browser Settings.

> [!TIP]  
> **Don't see your feature here?**
> Request one on the [Feature Request Discussion](https://github.com/cssnr/zipline-extension/discussions/categories/feature-requests).

### Planned

- Add File List to Side Panel
- Add Upload Text to Selection

### Known Issues

- Editing or Deleting files via the Popup requires Host Permissions.
  - Zipline is missing the `DELETE` and `PATCH` method in its OPTIONS response.

> [!TIP]  
> **Don't see your issue here?**
> Submit a new [Issue](https://github.com/cssnr/zipline-extension/issues).

## Configure

You can pin the Addon by clicking the `Puzzle Piece`, find the `Zipline Extension icon`, then;  
**Firefox**, click the `Settings Wheel` and `Pin to Toolbar`.  
**Chrome**, click the `Pin` icon.

## Setup

To automatically configure the web extension to work with your Zipline instance do the following:

- Log in to your Zipline Instance
- Click the Popup Icon (from above)
- Click `Add Auth from Current Site`

The addon should now be configured to work with your Zipline instance.

You can now click the Zipline icon to view your recent uploads or open Options.  
Right-click on any Image, Video, Audio, or URL upload to Zipline or Shorten URL.

Alternatively, you can open the Options page and add your URL and Token manually.

## Support

For help using the web extension, utilize any these resources:

- Q&A Discussion: https://github.com/cssnr/zipline-extension/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/zipline-extension/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, use:

- Report an Issue: https://github.com/cssnr/zipline-extension/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide Anonymous Feedback: [https://cssnr.github.io/feedback](https://cssnr.github.io/feedback?app=Zipline%20Extension)

Logs can be found inspecting the page (Ctrl+Shift+I), clicking on the Console, and;
Firefox: toggling Debug logs, Chrome: toggling Verbose from levels dropdown.

Note: When providing anonymous feedback there is no way to follow up and get more information unless you provide a contact method.

# Contributing

For instructions on building, testing and submitting a PR, see [CONTRIBUTING.md](CONTRIBUTING.md).

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

More **Zipline** Products:

- [Zipline Android](https://github.com/cssnr/zipline-android?tab=readme-ov-file#readme) - Native Android Application for Zipline
- [Zipline CLI](https://github.com/cssnr/zipline-cli?tab=readme-ov-file#readme) - CLI Interface for Zipline

Additionally, you can star or provide a 5-star rating on other Web Extensions I have created and published:

- [Link Extractor](https://github.com/cssnr/link-extractor?tab=readme-ov-file#readme)
- [Open Links in New Tab](https://github.com/cssnr/open-links-in-new-tab?tab=readme-ov-file#readme)
- [Auto Auth](https://github.com/cssnr/auto-auth?tab=readme-ov-file#readme)
- [Cache Cleaner](https://github.com/cssnr/cache-cleaner?tab=readme-ov-file#readme)
- [HLS Video Downloader](https://github.com/cssnr/hls-video-downloader?tab=readme-ov-file#readme)
- [Zipline Extension](https://github.com/cssnr/zipline-extension?tab=readme-ov-file#readme)
- [Obtainium Extension](https://github.com/cssnr/obtainium-extension?tab=readme-ov-file#readme)
- [SMWC Web Extension](https://github.com/cssnr/smwc-web-extension?tab=readme-ov-file#readme)
- [PlayDrift Extension](https://github.com/cssnr/playdrift-extension?tab=readme-ov-file#readme)
- [ASN Plus](https://github.com/cssnr/asn-plus?tab=readme-ov-file#readme)
- [Aviation Tools](https://github.com/cssnr/aviation-tools?tab=readme-ov-file#readme)
- [Text Formatter](https://github.com/cssnr/text-formatter?tab=readme-ov-file#readme)

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)
