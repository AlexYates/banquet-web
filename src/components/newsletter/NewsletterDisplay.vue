<!-- banquet-web/src/components/newsletter/NewsletterDisplay.vue -->

<script setup lang="ts">
import type { Newsletter } from '@/stores/newsletter'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
    newsletter: Newsletter
}>()

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>

<template>
    <Card v-if="newsletter">
        <CardHeader>
            <CardTitle class="text-3xl font-bold">{{ newsletter.subject }}</CardTitle>
            <CardDescription>Published on {{ formatDate(newsletter.published_at) }}</CardDescription>
        </CardHeader>
        <CardContent>
            <pre class="text-base whitespace-pre-wrap font-sans">{{ newsletter.content.trim() }}</pre>
        </CardContent>
    </Card>
</template>
