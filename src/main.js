import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/app/App.vue'
import '@/app/index.css'
import { helpers } from '@/shared/mixins/helpers'

const app = createApp(App)

app.mixin(helpers)
app.use(createPinia())
app.mount('#app')
