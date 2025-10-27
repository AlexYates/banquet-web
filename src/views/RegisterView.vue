<!-- banquet-web/src/views/RegisterView.vue -->

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthForm from '@/components/auth/AuthForm.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const authStore = useAuthStore()
const router = useRouter()

async function handleRegister(values: any) {
    const success = await authStore.register(values)
    if (success) {
        router.push({ name: 'login' })
    }
    return success
}
</script>

<template>
    <div class="flex items-center justify-center min-h-[80vh] px-4">
        <Card class="w-full max-w-sm">
            <CardHeader class="text-center">
                <CardTitle class="text-2xl">Create an Account</CardTitle>
                <CardDescription>Enter your email and password to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm form-type="register" :on-submit="handleRegister" />
                <div class="mt-4 text-center text-sm">
                    Already have an account?
                    <RouterLink to="/login" class="underline"> Log in </RouterLink>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
