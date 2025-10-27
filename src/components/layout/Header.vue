<!-- banquet-web/src/components/layout/Header.vue -->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ShoppingCart, LogIn, User, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'

const authStore = useAuthStore()
</script>

<template>
    <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-16 items-center justify-between">
            <RouterLink to="/" class="text-2xl font-bold tracking-tight text-primary-foreground">
                Banquet
            </RouterLink>

            <nav class="flex items-center space-x-6 text-sm font-medium">
                <RouterLink to="/" class="transition-colors hover:text-primary-foreground/80">
                    Home
                </RouterLink>
                <RouterLink to="/products" class="transition-colors hover:text-primary-foreground/80">
                    Products
                </RouterLink>
            </nav>

            <div class="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                    <ShoppingCart class="h-5 w-5" />
                    <span class="sr-only">Open cart</span>
                </Button>

                <template v-if="authStore.isAuthenticated">
                    <Button variant="ghost" size="icon">
                        <User class="h-5 w-5" />
                        <span class="sr-only">My Account</span>
                    </Button>
                    <Button variant="ghost" size="icon" @click="authStore.logout">
                        <LogOut class="h-5 w-5" />
                        <span class="sr-only">Log Out</span>
                    </Button>
                </template>
                <template v-else>
                    <Button variant="ghost" as-child>
                        <RouterLink to="/login">
                            <LogIn class="mr-2 h-4 w-4" />
                            Login
                        </RouterLink>
                    </Button>
                </template>
            </div>
        </div>
    </header>
</template>
