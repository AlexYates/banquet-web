<!-- banquet-web/src/views/NewsletterView.vue -->

<script setup lang="ts">
import { onMounted, computed } from 'vue'

import { useNewsletterStore } from '@/stores/newsletter'
import { useAuthStore } from '@/stores/auth'

import NewsletterDisplay from '@/components/newsletter/NewsletterDisplay.vue'
import NewsletterArchiveList from '@/components/newsletter/NewsletterArchiveList.vue'
import SubscriptionForm from '@/components/newsletter/SubscriptionForm.vue'

const newsletterStore = useNewsletterStore()
const authStore = useAuthStore()

// A computed property to determine if the user should see the subscription prompt.
// This covers both logged-out users and logged-in but unsubscribed users.
const shouldShowSubscriptionPrompt = computed(() => {
    return !authStore.isAuthenticated || newsletterStore.error?.includes('Access Denied');
});

onMounted(() => {
    // We only fetch the archive if the user is authenticated.
    // The router guard will redirect unauthenticated users away, but this adds a layer of safety.
    if (authStore.isAuthenticated) {
        newsletterStore.fetchArchive()
    }
})
</script>

<template>
    <div class="container py-12">

        <div class="text-center mb-12">
            <h1 class="text-4xl font-extrabold tracking-tight">Our Newsletters</h1>
            <p class="mt-2 text-lg text-muted-foreground">Find out about what's going on in world of surfing.</p>
        </div>

        <!-- Case 1: Show subscription prompt for logged-out or non-subscribed users -->
        <div v-if="shouldShowSubscriptionPrompt" class="flex flex-col items-center justify-center text-center py-12">
            <SubscriptionForm title="Access the Archive"
                description="Subscribe to our newsletter to view past issues and get the latest news." />
        </div>
        <!-- Case 2: Show a generic loading state -->
        <div v-if="newsletterStore.isLoading" class="text-center">
            <p>Loading archive&hellip;</p>
        </div>
        <!-- Case 3: Show a generic error if something else went wrong -->
        <div v-else-if="newsletterStore.error"
            class="text-center p-8 bg-destructive/10 border border-destructive rounded-lg">
            <h2 class="text-xl font-bold text-destructive">An Error Occurred</h2>
            <p class="text-muted-foreground mt-2">{{ newsletterStore.error }}</p>
        </div>
        <!-- Case 4: Show the newsletter content if everything is successful -->
        <div v-else-if="newsletterStore.latestNewsletter" class="space-y-12">
            <NewsletterDisplay :newsletter="newsletterStore.latestNewsletter" />
            <NewsletterArchiveList v-if="newsletterStore.olderNewsletters.length > 0"
                :newsletters="newsletterStore.olderNewsletters" />
        </div>
        <!-- Case 5: Handle the edge case of an empty archive -->
        <div v-else class="text-center">
            <p>No newsletters found in the archive yet.</p>
        </div>
    </div>
</template>
