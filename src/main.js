import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import state from './state'
import PrimeVue from 'primevue/config';

createApp(App).use(router).use(state).mount('#app').use(PrimeVue);