<!-- banquet-web/src/components/home/NewsletterCallout.vue -->

<script setup lang="ts">
import SubscriptionForm from '@/components/newsletter/SubscriptionForm.vue';
</script>

<template>
    <section class="bg-secondary/50 py-16 md:py-24">
        <div class="container">
            <div class="max-w-xl mx-auto text-center">
                <h2 class="text-3xl font-bold tracking-tight">Join The Lineup</h2>
                <p class="mt-4 text-lg text-muted-foreground">
                    Be the first to know about new arrivals, exclusive deals, and stories from the surf community.
                </p>
                <div class="mt-8">
                    <SubscriptionForm title="Subscribe to our Newsletter" description="" />
                </div>
            </div>
        </div>
    </section>
</template>
