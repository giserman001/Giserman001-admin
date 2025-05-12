import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import directives from "@/directives/index";

import 'virtual:svg-icons-register'

import pinia from '@/store'

import 'ant-design-vue/dist/reset.css'

import '@/utils/default-passive-events'

import 'virtual:uno.css'

import '@/style/global.less'

const app = createApp(App)

app.use(directives)

app.use(router)

app.use(pinia)

app.mount('#app')

window.env = import.meta.env.MODE

window.log = console.log
