<!-- banquet-web/src/components/newsletter/NewsletterArchiveList.vue -->

<script setup lang="ts">
import type { Newsletter } from '@/stores/newsletter'

defineProps<{
    newsletters: Newsletter[]
}>()

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Past Issues</h2>
        <ul class="space-y-3">
            <li v-for="item in newsletters" :key="item.id">
                <a href="#" class="block p-4 border rounded-lg hover:bg-muted transition-colors">
                    <p class="font-semibold">{{ item.subject }}</p>
                    <p class="text-sm text-muted-foreground mt-1">{{ formatDate(item.published_at) }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>
