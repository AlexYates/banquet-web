// banquet-web/src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/Main.vue'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import NewsletterView from '@/views/NewsletterView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import ProductDetailView from '@/views/ProductDetailView.vue'

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
                {
                    path: '/products/:id',
                    name: 'product-detail',
                    component: ProductDetailView,
                },
                {
                    path: '/newsletter',
                    name: 'newsletter',
                    component: NewsletterView,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/login',
                    name: 'login',
                    component: LoginView,
                    meta: { requiresGuest: true }
                },
                {
                    path: '/register',
                    name: 'register',
                    component: RegisterView,
                    meta: { requiresGuest: true }
                },
            ],
        },
    ],
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Redirect to login if auth is required and user is not authenticated
        next({ name: 'login' })
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        // Redirect to home if the page is for guests and user is already authenticated
        next({ name: 'home' })
    } else {
        // Otherwise, allow navigation
        next()
    }
})

export default router