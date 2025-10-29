<!-- banquet-web/src/views/CartView.vue -->

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { useCartStore } from '@/stores/cart'
import CartItemCard from '@/components/cart/CartItemCard.vue'

const cartStore = useCartStore()
const { items, cartSubtotal, grandTotal } = storeToRefs(cartStore)

</script>

<template>
    <div class="container py-12">
        <h1 class="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
        <!-- <div v-if="cartStore.items.length > 0" class="grid lg:grid-cols-3 gap-8"> -->
        <div v-if="cartStore.items.length > 0" class="grid grid-cols-2 gap-8">
            <!-- <div class="lg:col-span-2 divide-y border rounded-lg"> -->
            <div class="border rounded-lg">
                <CartItemCard v-for="item in cartStore.items" :key="item.id" :item="item" class="px-4" />
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>{{ new Intl.NumberFormat('en-GB', {
                                style: 'currency', currency: 'GBP'
                            }).format(cartSubtotal / 100) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Shipping</span>
                            <span>{{
                                new Intl.NumberFormat('en-GB', {
                                    style: 'currency', currency: 'GBP'
                                }).format(cartStore.shippingCost / 100) }}</span>
                        </div>
                        <Separator />
                        <div class="flex justify-between font-bold text-lg pb-4">
                            <span>Total</span>
                            <span>{{ grandTotal }}</span>
                        </div>
                        <RouterLink :to="{ name: 'checkout' }">
                            <Button size="lg" class="w-full">Proceed to Checkout</Button>
                        </RouterLink>
                    </CardContent>
                </Card>
            </div>
        </div>
        <div v-else class="text-center py-20 bg-muted rounded-lg">
            <h2 class="text-2xl font-semibold">Your Cart is Empty</h2>
            <p class="text-muted-foreground mt-2">Looks like you haven't added anything yet.</p>
            <Button as-child class="mt-4">
                <RouterLink to="/products">Start Shopping</RouterLink>
            </Button>
        </div>
    </div>
</template>
