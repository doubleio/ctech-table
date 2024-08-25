import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/app/App.vue'
import '@/app/index.css'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.mount('#app')
