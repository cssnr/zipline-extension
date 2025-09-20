<script setup>
import 'animate.css'

// Variables
const chrome_url = 'https://chromewebstore.google.com/detail/zipline-extension/gkkloiijbkgkbmgckfefigkjckhdikkd'
const firefox_url = 'https://addons.mozilla.org/addon/zipline-extension'

// Props
const props = defineProps({
  animation: { type: String, default: null },
  centered: { type: Boolean, default: false },
  margin: { type: String, default: null },
  size: { type: String, default: '48' }, // 16,24,32,48,64,128,256,512
})

// Browsers
const baseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1'
const browsers = [
  { name: 'Chrome', url: chrome_url, img: 'chrome/chrome' },
  { name: 'Firefox', url: firefox_url, img: 'firefox/firefox' },
  { name: 'Edge', url: chrome_url, img: 'edge/edge' },
  { name: 'Opera', url: chrome_url, img: 'opera/opera' },
  { name: 'Brave', url: chrome_url, img: 'brave/brave' },
  // { name: 'Chromium', url: chrome_url, img: 'chromium/chromium' },
]

// Class
const imageClass = props.animation ? `animate__animated ${props.animation}` : null

// Style
const iconStyle = { minHeight: `${props.size}px` }
if (props.centered) iconStyle.textAlign = 'center'
if (props.margin) iconStyle.margin = props.margin
</script>

<template>
  <div class="browser-icons" :style="iconStyle">
    <a
      v-for="browser in browsers"
      :key="browser.name"
      :href="browser.url"
      :title="browser.name"
      class="px-1 hvr-grow-lg"
      target="_blank"
      rel="noopener"
    >
      <img
        :alt="browser.name"
        :width="props.size"
        :height="props.size"
        :src="`${baseUrl}/${browser.img}_${props.size}x${props.size}.png`"
        :class="imageClass"
      />
    </a>
  </div>
</template>

<style scoped>
.browser-icons a {
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  transition-duration: 0.3s;
  transition-property: transform;
}
.browser-icons a:hover {
  transform: scale(1.2);
}
</style>
