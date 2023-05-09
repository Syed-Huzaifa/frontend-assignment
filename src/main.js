import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import stores from './store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.use(router).use(vuetify).use(stores).mount('#app')
