import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../components/Accueil.vue'
import Populaire from '../components/Popular.vue'
import Best from '../components/Best.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Accueil',
            component: Accueil
        },
        {
            path: '/popular',
            name: 'Populaire',
            component: Populaire
        },
        {
        path: '/best',
        name: 'Best',
        component: Best
    }
    ]
})

export default router