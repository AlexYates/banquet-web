// banquet-web/src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/Main.vue'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView,
                },
                {
                    path: '/products',
                    name: 'products',
                    component: ProductsView,
                },
                // We'll add /register, /cart, /login, etc. here later
            ],
        },
    ],
})

export default router