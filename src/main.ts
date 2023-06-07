import { createApp } from 'vue'
import { pinia } from '@/stores'

import App from './App.vue'
import router from '@/router'

import './assets/basic.styl'

createApp(App).use(pinia).use(router).mount('#app')
