<!-- src/App.vue -->

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'

import CartSheet from '@/components/cart/CartSheet.vue'
import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'

const cartStore = useCartStore()

onMounted(() => {
    cartStore.fetchCart()
})
</script>

<template>
    <RouterView />
    <Toaster :dismissible="true" position="top-center" :rich-colors="false" :toast-options="{
        classes: {
            // --- Base Toast ---
            toast:
                'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',

            // --- Toast Content ---
            title: 'text-base',
            description: 'group-[.toast]:text-muted-foreground',

            // --- Toast Types ---
            success: '!bg-secondary !text-secondary-foreground !border-primary',
            info: '!bg-secondary !text-secondary-foreground !border-blue-400',
            warning: '!bg-secondary !text-secondary-foreground !border-yellow-400',
            error: '!bg-destructive !text-destructive-foreground !border-destructive-foreground/20',

            // --- Action Buttons ---
            actionButton:
                'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            cancelButton:
                'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',

            // --- Other Elements ---
            closeButton: 'group-[.toast]:bg-card group-[.toast]:border-border group-[.toast]:text-muted-foreground hover:!bg-muted',
            icon: 'scale-110',
            loader: 'animate-spin'
        },
    }" />
    <CartSheet />
</template>
