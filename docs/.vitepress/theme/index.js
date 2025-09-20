import DefaultTheme, { VPBadge } from 'vitepress/theme'
import './custom.css'

import BrowserIcons from './components/BrowserIcons.vue'

import Contributors from '@cssnr/vitepress-plugin-contributors'
import '@cssnr/vitepress-plugin-contributors/style.css'
import contributors from '../contributors.json'

import VPSwiper from '@cssnr/vitepress-swiper'
import '@cssnr/vitepress-swiper/style.css'

// noinspection JSUnusedGlobalSymbols
export default {
    ...DefaultTheme,

    enhanceApp({ app }) {
        app.component('Badge', VPBadge)

        app.component('BrowserIcons', BrowserIcons)

        app.component('Contributors', Contributors)
        app.config.globalProperties.$contributors = contributors

        app.component('VPSwiper', VPSwiper)
    },
}
