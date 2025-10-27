<!-- banquet-web/src/components/cart/CartSheet.vue -->

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { useCartStore } from '@/stores/cart'
import CartItemCard from './CartItemCard.vue'

const cartStore = useCartStore()
</script>
<template>
    <Sheet v-model:open="cartStore.isPanelOpen">
        <SheetContent class="flex flex-col">
            <SheetHeader>
                <SheetTitle>Your Cart ({{ cartStore.itemCount }})</SheetTitle>
                <SheetDescription>
                    Items in your shopping cart.
                </SheetDescription>
            </SheetHeader>
            <Separator />
            <div v-if="cartStore.items.length > 0" class="flex-grow overflow-y-auto -mx-6 px-6 divide-y">
                <CartItemCard v-for="item in cartStore.items" :key="item.id" :item="item" />
            </div>
            <div v-else class="flex-grow flex flex-col items-center justify-center text-center">
                <h3 class="text-lg font-semibold">Your cart is empty</h3>
                <p class="text-sm text-muted-foreground">Add some items to get started.</p>
            </div>
            <SheetFooter v-if="cartStore.items.length > 0">
                <div class="w-full space-y-4">
                    <div class="flex justify-between font-semibold text-lg">
                        <span>Subtotal</span>
                        <span>{{ cartStore.cartTotal }}</span>
                    </div>
                    <Button @click="cartStore.togglePanel" as-child size="lg" class="w-full">
                        <RouterLink to="/cart">Proceed to Checkout</RouterLink>
                    </Button>
                </div>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>
