<!-- banquet-web/src/components/layout/Header.vue -->

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { ShoppingCart, LogIn, User, LogOut, Waves } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
</script>

<template>
    <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-16 items-center justify-between">

            <RouterLink title="Banquet Surf Co." to="/"
                class="flex items-center justify-center h-12 w-12 rounded-full bg-primary ">
                <Waves class="h-6 w-6 text-primary-foreground" />
            </RouterLink>

            <nav class="flex items-center space-x-6 text-sm font-medium">
                <RouterLink to="/" class="transition-colors hover:text-primary/80">
                    Home
                </RouterLink>
                <RouterLink to="/products" class="transition-colors hover:text-primary/80">
                    Products
                </RouterLink>
            </nav>

            <div class="flex items-center space-x-4">
                <Button title="Open cart" variant="ghost" size="icon" class="relative" @click="cartStore.togglePanel">
                    <Badge v-if="cartStore.itemCount > 0" variant="destructive"
                        class="absolute bg-primary rounded-full text-primary-foreground -top-2 -right-2 h-5 w-5 justify-center p-0">
                        {{ cartStore.itemCount }}</Badge>
                    <ShoppingCart class="h-5 w-5" />
                    <span class="sr-only">Open cart</span>
                </Button>
                <template v-if="authStore.isAuthenticated">
                    <Button variant="ghost" size="icon">
                        <User class="h-5 w-5" />
                        <span class="sr-only">My Account</span>
                    </Button>
                    <Button title="Log Out" variant="ghost" size="icon" @click="authStore.logout">
                        <LogOut class="h-5 w-5" />
                        <span class="sr-only">Log Out</span>
                    </Button>
                </template>
                <template v-else>
                    <Button title="Log In" variant="ghost" as-child>
                        <RouterLink to="/login">
                            <LogIn class="mr-2 h-4 w-4" />
                            Log In
                        </RouterLink>
                    </Button>
                </template>
            </div>
        </div>
    </header>
</template>
