import { defineConfig } from 'vitepress'

const settings = {
  title: 'Zipline Extension',
  name: 'Zipline Web Extension and Browser Addon',
  description: {
    short: 'Zipline Web Extension and Browser Addon.',
    long: 'Zipline Web Extension and Browser Addon to Upload, View and Edit Files and URLs for a Self-Hosted Diced/Zipline v4 Server.',
  },
  image: '/images/logo.png',
  color: '#344398',
  source_repo: 'https://github.com/cssnr/zipline-extension',
  chrome_url:
    'https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd',
  mozilla_url: 'https://addons.mozilla.org/addon/zipline-extension',
}

// https://vitepress.dev/reference/site-config
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  // srcDir: './docs',
  // base: '/path/',
  vite: {
    server: {
      allowedHosts: true,
    },
  },

  title: settings.title,
  description: settings.description.short,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
    [
      'link',
      { rel: 'apple-touch-icon', sizes: '180x180', href: settings.image },
    ],

    ['meta', { name: 'darkreader-lock' }],

    ['meta', { name: 'theme-color', content: settings.color }],
    ['meta', { name: 'description', content: settings.description.long }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: settings.name }],
    ['meta', { property: 'og:title', content: settings.title }],
    [
      'meta',
      { property: 'og:description', content: settings.description.short },
    ],
    ['meta', { property: 'og:image', content: settings.image }],
    ['meta', { property: 'og:image:alt', content: settings.title }],

    ['meta', { property: 'twitter:card', content: 'summary' }],
    ['meta', { property: 'twitter:site', content: settings.name }],
    ['meta', { property: 'twitter:title', content: settings.title }],
    [
      'meta',
      { property: 'twitter:description', content: settings.description.short },
    ],
    ['meta', { property: 'twitter:image', content: settings.image }],
    ['meta', { property: 'twitter:image:alt', content: settings.title }],
  ],

  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: settings.title,
    logo: '/images/logo-sm.png',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Get Started',
        link: '/guides/get-started',
        activeMatch: '/guides/',
      },
      { text: 'Docs', link: '/docs/popup', activeMatch: '/docs/' },
      {
        text: 'Links',
        items: [
          { text: 'Chrome Web Store', link: settings.chrome_url },
          { text: 'Mozilla Addons', link: settings.mozilla_url },
          { text: 'GitHub Source Code', link: settings.source_repo },
          {
            text: 'Android Application',
            link: 'https://github.com/cssnr/zipline-android',
          },
          { text: 'Developer Site', link: 'https://cssnr.github.io/' },
          { text: 'Contribute', link: 'https://ko-fi.com/cssnr' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: settings.source_repo },
      { icon: 'googlechrome', link: settings.chrome_url },
      { icon: 'mozilla', link: settings.mozilla_url },
      { icon: 'android', link: 'https://github.com/cssnr/zipline-android' },
      { icon: 'python', link: 'https://zipline-cli.cssnr.com/' },
      { icon: 'discord', link: 'https://discord.gg/wXy6m2X8wY' },
      { icon: 'kofi', link: 'https://ko-fi.com/cssnr' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="fill: none;" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
        },
        link: 'https://cssnr.github.io/',
      },
    ],

    sidebar: [
      {
        text: 'Guides',
        base: '/guides',
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'Features', link: '/features' },
        ],
      },
      {
        text: 'Documentation',
        base: '/docs',
        // collapsed: false,
        items: [
          { text: 'Popup', link: '/popup' },
          { text: 'Options', link: '/options' },
        ],
      },
      {
        text: 'Support',
        items: [{ text: 'Get Help', link: '/support' }],
      },
    ],

    editLink: {
      pattern: `${settings.source_repo}/blob/master/docs/:path`,
      text: 'View or Edit on GitHub',
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium',
      },
    },

    search: {
      // provider: 'local',
      provider: 'algolia',
      options: {
        appId: 'NWVKC37L32',
        apiKey: 'ead8f5921d4dd8b743d69ee4db57c7a4',
        indexName: 'zipline-extension-docs',
      },
    },

    // footer: {
    //   message: '<a href="/privacy">Privacy Policy</a>',
    //   copyright: '<a href="/privacy">Privacy Policy</a>',
    // },

    externalLinkIcon: true,
    outline: 'deep',
  },
})
