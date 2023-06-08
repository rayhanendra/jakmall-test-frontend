import { createApp } from 'vue'
import { pinia } from '@/stores'

import App from './App.vue'
import router from '@/router'

import filters from '@/plugins/filters'

import SvgIcon from 'vue3-icon'
import './assets/basic.styl'

createApp(App).component('svg-icon', SvgIcon).use(filters).use(pinia).use(router).mount('#app')
