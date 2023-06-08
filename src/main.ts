import { createApp } from 'vue'
import { pinia } from '@/stores'

import App from './App.vue'
import router from '@/router'

import SvgIcon from 'vue3-icon'
import './assets/basic.styl'

createApp(App).component('svg-icon', SvgIcon).use(pinia).use(router).mount('#app')
