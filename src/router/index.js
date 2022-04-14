import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../components/Accueil.vue'
import BandeA from '../components/BandeA.vue'
import Best from '../components/Best.vue'
import Genre from '../components/Genre.vue'
import Film from '../components/Film.vue'
import Erreur from '../components/Erreur.vue'
import Parametres from '../components/Parametres.vue'
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
            component: Best
        },
        {
            path: '/best',
            name: 'Best',
            component: Best
        },
        {
            path: '/bandeannonce',
            name: 'BandeA',
            component: BandeA
        },
        {
            path: '/',
            name: 'Accueil',
            component: Accueil
        },
        {
            path: '/genre',
            name: 'Genre',
            component: Genre
        },
        {
            path: '/film/:id',
            name: 'Film',
            component: Film,
            props: true
        },
        {
            path: '/:catchAll(.*)',
            name: 'notFound',
            component: Erreur
        },
        {
            path: '/parametres',
            name: 'Paramètres',
            component: Parametres
        }
    ]
})

export default router