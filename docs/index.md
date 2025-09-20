---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Zipline Extension
  text: Browser Addon
  tagline: Upload, View and Edit Files and URLs for a Self-Hosted Diced/Zipline v4 Server.
  image:
    src: /images/logo.png
    alt: Zipline Extension
  actions:
    - text: Get Started
      link: /guides/get-started
      theme: brand
    - text: Features
      link: /guides/features
      theme: brand
    - text: Documentation
      link: /docs/popup
      theme: alt
    - text: Support
      link: /support
      theme: alt

features:
  - title: Install and Setup
    details: View Install and Setup Guides
    link: /guides/get-started
  - title: Features
    details: View Features and Screenshots
    link: /guides/features
  - title: Documentation
    details: Read The Documentation
    link: /docs/popup
  - title: Support
    details: Get Help with Anything
    link: /support
  - title: Open Source
    details: View Source Code on GitHub
    link: https://github.com/cssnr/zipline-extension
  - title: Android Application
    details: Get the Android Application
    link: https://zipline-android.cssnr.com/
---

<BrowserIcons
animation="animate__rotateIn  animate__slow"
:centered="true"
margin="40px 0 0 0"
size="64"
/>

<Contributors :contributors="$contributors" heading="Contributors" size="48" margin="36px 0 96px" />
