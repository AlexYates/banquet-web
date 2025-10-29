// banquet-web/src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import MainLayout from '@/layouts/Main.vue'
import HomeView from '@/views/HomeView.vue'

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
                    component: () => import('@/views/ProductsView.vue'),
                },
                {
                    path: '/products/:id',
                    name: 'product-detail',
                    component: () => import('@/views/ProductDetailView.vue'),
                },
                {
                    path: '/newsletter',
                    name: 'newsletter',
                    component: () => import('@/views/NewsletterView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/LoginView.vue'),
                    meta: { requiresGuest: true }
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('@/views/RegisterView.vue'),
                    meta: { requiresGuest: true }
                },
                {
                    path: '/about-us',
                    name: 'about-us',
                    component: () => import('@/views/AboutUsView.vue'),
                },
                {
                    path: '/cart',
                    name: 'cart',
                    component: () => import('@/views/CartView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/checkout',
                    name: 'checkout',
                    component: () => import('@/views/CheckoutView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/account',
                    name: 'account',
                    component: () => import('@/views/AccountView.vue'),
                    meta: { requiresAuth: true },
                    children: [
                        {
                            path: 'orders/:id',
                            name: 'account-order-detail',
                            component: () => import('@/views/OrderDetailView.vue')
                        }
                    ]
                },
                {
                    path: '/orders/:id',
                    name: 'order-confirmation',
                    component: () => import('@/views/OrderConfirmationView.vue'),
                    meta: { requiresAuth: true }
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