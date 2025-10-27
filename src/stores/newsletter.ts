// banquet-web/src/stores/newsletter.ts

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import api from '@/lib/api'

// This matches the Newsletter type from your backend's src/types/index.ts // TODO: Extract Types to a seperate, shared repo.?
export type Newsletter = {
    id: number;
    subject: string;
    content: string;
    published_at: string;
};

export const useNewsletterStore = defineStore('newsletter', () => {
    const newsletters = ref<Newsletter[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const latestNewsletter = computed(() => {
        return newsletters.value.length > 0 ? newsletters.value[0] : null
    })

    const olderNewsletters = computed(() => {
        return newsletters.value.length > 1 ? newsletters.value.slice(1) : []
    })

    /**
     * Subscribes an email address to the newsletter.
     * @param email The email to subscribe.
     * @returns True on success, false on failure.
     */
    async function subscribe(email: string): Promise<boolean> {
        if (!email) {
            toast.error('Please enter a valid email address.')
            return false
        }
        try {
            await api.post('/newsletter/subscribe', { email })
            toast.success('Subscription successful!', {
                description: "You're now on the list."
            })
            return true
        } catch (err: any) {
            if (err.response?.status === 409) {
                toast.info('You are already subscribed!')
                return true
            }
            toast.error('Subscription failed', {
                description: 'An unexpected error occurred. Please try again.'
            })
            console.error(err)
            return false
        }
    }

    /**
     * Fetches the newsletter archive from the API.
     * Requires the user to be authenticated and subscribed.
     */
    async function fetchArchive() {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.get<Newsletter[]>('/newsletter/archive')
            newsletters.value = response.data
        } catch (err: any) {
            if (err.response?.status === 403) {
                error.value = "Access Denied. You must be a logged-in subscriber to view the archive."
            } else {
                error.value = "Failed to load the newsletter archive."
            }
            console.error(err)
        } finally {
            isLoading.value = false
        }
    }

    return {
        newsletters,
        isLoading,
        error,
        latestNewsletter,
        olderNewsletters,
        subscribe,
        fetchArchive
    }
})
