<!-- banquet-web/src/components/products/ProductCard.vue -->

<script setup lang="ts">
import type { Product } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { computed } from 'vue';

const props = defineProps<{
    product: Product
}>()

const formattedPrice = computed(() => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(props.product.price_in_pence / 100)
})
</script>

<template>
    <Card class="flex flex-col">
        <CardHeader>
            <div class="aspect-square w-full bg-muted overflow-hidden rounded-lg mb-4">
                <img :src="product.image_url" :alt="product.name"
                    class="flex h-full w-full items-center justify-center object-cover" />
            </div>
            <CardTitle class="text-lg">{{ product.name }}</CardTitle>
            <CardDescription class="text-sm h-10">{{ product.description.substring(0, 70) }}...</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
            <p class="text-2xl font-semibold">{{ formattedPrice }}</p>
        </CardContent>
        <CardFooter class="flex justify-between">
            <Button variant="outline">View Details</Button>
            <Button>Add to Cart</Button>
        </CardFooter>
    </Card>
</template>
