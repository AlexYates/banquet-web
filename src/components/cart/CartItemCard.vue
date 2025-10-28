<!-- banquet-web/src/components/cart/CartItemCard.vue -->

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

import type { CartItem } from '@/stores/cart'
import { useCartStore } from '@/stores/cart'

const props = defineProps<{ item: CartItem }>()
const cartStore = useCartStore()

const formattedPrice = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(props.item.price_in_pence / 100)

function updateQuantity(newQuantity: number) {
    cartStore.updateQuantity(props.item.id, newQuantity)
}
</script>
<template>
    <div class="flex items-center gap-4 py-4">
        <div class="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
            <img :src="item.image_url" :alt="item.name" class="w-full h-full object-cover">
        </div>
        <div class="flex-grow">
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-muted-foreground">{{ formattedPrice }}</p>
            <div class="flex items-center border rounded-md mt-2 w-fit">
                <Button variant="ghost" @click="updateQuantity(item.quantity - 1)" class="px-2 h-8">-</Button>
                <span class="px-3 text-sm">{{ item.quantity }}</span>
                <Button variant="ghost" @click="updateQuantity(item.quantity + 1)" class="px-2 h-8">+</Button>
            </div>
        </div>
        <Button variant="ghost" size="icon" @click="cartStore.removeFromCart(item.id)">
            <X class="h-4 w-4" />
        </Button>
    </div>
</template>
