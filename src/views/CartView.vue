<!-- banquet-web/src/views/CartView.vue -->

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import CartItemCard from '@/components/cart/CartItemCard.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const cartStore = useCartStore()
</script>
<template>
    <div class="container py-12">
        <h1 class="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
        <div v-if="cartStore.items.length > 0" class="grid lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 divide-y border rounded-lg">
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
                            <span>{{ cartStore.cartTotal }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Shipping</span>
                            <span>£4.99</span>
                        </div>
                        <Separator />
                        <div class="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{{ cartStore.cartTotal }} + Shipping</span> <!-- NOTE: Simple display, can be improved -->
                        </div>
                        <Button size="lg" class="w-full">Proceed to Checkout</Button>
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
