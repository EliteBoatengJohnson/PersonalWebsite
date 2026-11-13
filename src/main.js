import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './directives/reveal'
import './assets/styles.css'

createApp(App).directive('reveal', vReveal).mount('#app')
