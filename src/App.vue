<!-- src/App.vue -->

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'

import CartSheet from '@/components/cart/CartSheet.vue'
import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => {
    cartStore.fetchCart()
    // if (authStore.isAuthenticated) {
    //     cartStore.fetchCart()
    // }
})
</script>

<template>
    <RouterView />
    <Toaster rich-colors position="bottom-left" />
    <CartSheet />
</template>
