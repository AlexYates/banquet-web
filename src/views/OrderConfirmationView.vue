<!-- banquet-web/src/views/OrderConfirmationView.vue -->

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

import { useOrderStore } from '@/stores/order'

const route = useRoute()
const orderStore = useOrderStore()
const { currentOrder, isLoading } = storeToRefs(orderStore)

const formatCurrency = (pence: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(pence / 100)
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

onMounted(() => {
    const orderId = Number(route.params.id)
    if (orderId) {
        orderStore.fetchOrderById(orderId)
    }
})
</script>

<template>
    <div class="container mx-auto max-w-2xl py-12 text-center">
        <div v-if="isLoading" class="text-muted-foreground">Loading your order confirmation...</div>
        <div v-else-if="currentOrder">
            <Card>
                <CardHeader>
                    <CardTitle class="text-3xl text-primary">Thank You For Your Order!</CardTitle>
                    <CardDescription>
                        Your order #{{ currentOrder.id }} has been placed successfully on {{
                            formatDate(currentOrder.created_at) }}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="text-left">
                        <h3 class="font-semibold mb-2">Order Summary</h3>
                        <div v-for="item in currentOrder.items" :key="item.id"
                            class="flex justify-between items-center mb-1 text-sm">
                            <span>{{ item.product_name_at_purchase }} x {{ item.quantity }}</span>
                            <span>{{ formatCurrency(item.price_in_pence_at_purchase * item.quantity) }}</span>
                        </div>
                        <hr class="my-3" />
                        <div class="flex justify-between">
                            <span class="font-bold text-lg">Total</span>
                            <span class="font-bold text-lg">{{ formatCurrency(currentOrder.total_in_pence) }}</span>
                        </div>
                    </div>
                    <RouterLink :to="{ name: 'home' }" class="mt-8 block">
                        <Button>Continue Shopping</Button>
                    </RouterLink>
                </CardContent>
            </Card>
        </div>
        <div v-else>
            <h2 class="text-2xl font-semibold mb-4">Order Not Found</h2>
            <p class="text-muted-foreground">We couldn't find the details for this order.</p>
        </div>
    </div>
</template>
