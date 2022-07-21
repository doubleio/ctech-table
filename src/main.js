import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/css/index.css'
import { helpers } from './mixins/helpers'

const app = createApp(App)

app.mixin(helpers).use(createPinia()).mount('#app')
