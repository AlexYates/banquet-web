<!-- banquet-web/src/components/layout/Footer.vue -->

<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useNewsletterStore } from '@/stores/newsletter'

import SubscriptionForm from '@/components/newsletter/SubscriptionForm.vue';

const email = ref('')
const router = useRouter()
const authStore = useAuthStore()
const newsletterStore = useNewsletterStore()

async function handleSubmit() {
    const success = await newsletterStore.subscribe(email.value)
    if (success) {
        if (authStore.isAuthenticated) {
            router.push('/newsletter')
        }
        email.value = ''
    }
}
</script>

<template>
    <footer class="border-t">
        <div class="container grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
            <div>
                <h3 class="text-lg font-bold">Banquet Surf Co.</h3>
                <p class="text-muted-foreground mt-2">Ride the tide with the best gear.</p>
            </div>
            <div>
                <h3 class="font-semibold">Quick Links</h3>
                <ul class="mt-4 space-y-2">
                    <li>
                        <RouterLink to="/about-us" class="text-muted-foreground hover:text-primary">About Us
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/newsletter" class="text-muted-foreground hover:text-primary">
                            Newsletter</RouterLink>
                    </li>
                    <li><a href="#" class="text-muted-foreground hover:text-primary">FAQ</a></li>
                </ul>
            </div>
            <div class="md:col-start-3 col-span-3">
                <SubscriptionForm title="Join the Newsletter"
                    description="Get the latest deals and drops straight to your inbox." />
            </div>
        </div>
        <div class="border-t py-4">
            <p class="text-center text-sm text-muted-foreground">
                &copy; {{ new Date().getFullYear() }} Banquet Surf Co. All Rights Reserved.
            </p>
        </div>
    </footer>
</template>
