<!-- banquet-web/src/views/LoginView.vue -->

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthForm from '@/components/auth/AuthForm.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const authStore = useAuthStore()
const router = useRouter()

async function handleLogin(values: any) {
    const success = await authStore.login(values)
    if (success) {
        router.push({ name: 'home' })
    }
    return success
}
</script>

<template>
    <div class="flex items-center justify-center min-h-[80vh] px-4">
        <Card class="w-full max-w-sm">
            <CardHeader class="text-center">
                <CardTitle class="text-2xl">Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm form-type="login" :on-submit="handleLogin" />
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <RouterLink to="/register" class="underline"> Sign up </RouterLink>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
