<!-- banquet-web/src/components/newsletter/SubscriptionForm.vue -->

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNewsletterStore } from '@/stores/newsletter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
    title: string
    description: string
}>()

const email = ref('')
const router = useRouter()
const authStore = useAuthStore()
const newsletterStore = useNewsletterStore()

async function handleSubmit() {
    const success = await newsletterStore.subscribe(email.value)
    if (success) {
        if (authStore.isAuthenticated) {
            // If the user is somehow logged in on this page, redirect them.
            router.push({ name: 'newsletter' }).then(() => {
                // Force a reload to fetch the archive after redirecting
                window.location.reload() // NOTE: Is this not just going to reload forever?
            })
        }
        // For unauthenticated users, we just show the toast and clear the form.
        email.value = ''
    }
}
</script>

<template>
    <Card class="max-w-lg mx-auto">
        <CardHeader class="text-center">
            <CardTitle>{{ title }}</CardTitle>
            <CardDescription>{{ description }}</CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="handleSubmit" class="flex gap-2 w-full">
                <Input class="w-full" type="email" placeholder="Enter your email" v-model="email" />
                <Button type="submit">Subscribe</Button>
            </form>
        </CardContent>
    </Card>
</template>
