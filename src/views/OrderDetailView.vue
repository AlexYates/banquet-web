<!-- banquet-web/src/views/OrderDetailView.vue -->

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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

const shippingAddress = (order: any) => {
    if (!order || !order.shipping_address) return null;
    try {
        return JSON.parse(order.shipping_address);
    } catch (e) {
        return null;
    }
};
</script>

<template>
    <div>
        <div v-if="isLoading">Loading order...</div>
        <div v-else-if="currentOrder">
            <Card>
                <CardHeader>
                    <CardTitle>Order #{{ currentOrder.id }}</CardTitle>
                    <CardDescription>
                        Placed on {{ formatDate(currentOrder.created_at) }} | Status: <span
                            class="capitalize font-medium">{{ currentOrder.status }}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="font-semibold mb-2">Items Ordered</h3>
                            <div v-for="item in currentOrder.items" :key="item.id"
                                class="flex justify-between items-center mb-1">
                                <span>{{ item.product_name_at_purchase }} x {{ item.quantity }}</span>
                                <span>{{ formatCurrency(item.price_in_pence_at_purchase * item.quantity) }}</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2">Shipping Address</h3>
                            <div v-if="shippingAddress(currentOrder)" class="text-muted-foreground">
                                <p>{{ shippingAddress(currentOrder)?.street_address }}</p>
                                <p>{{ shippingAddress(currentOrder)?.city }}, {{
                                    shippingAddress(currentOrder)?.post_code }}</p>
                                <p>{{ shippingAddress(currentOrder)?.country }}</p>
                            </div>
                        </div>
                    </div>

                    <Separator class="my-6" />

                    <div class="w-full md:w-1/2 ml-auto">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>{{ formatCurrency(currentOrder.subtotal_in_pence) }}</span>
                        </div>
                        <div class="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span>{{ formatCurrency(currentOrder.shipping_in_pence) }}</span>
                        </div>
                        <div class="flex justify-between text-muted-foreground">
                            <span>Taxes</span>
                            <span>{{ formatCurrency(currentOrder.tax_in_pence) }}</span>
                        </div>
                        <Separator class="my-2" />
                        <div class="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{{ formatCurrency(currentOrder.total_in_pence) }}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div v-else>
            <p class="text-muted-foreground py-4">Order not found.</p>
        </div>
    </div>
</template>
