<!-- banquet-web/src/components/products/ProductCard.vue -->

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import type { Product } from '@/types'

const props = defineProps<{
    product: Product
}>()

// NOTE: Extract as a utility?
const finalPrice = computed(() => {
    if (!props.product) return 0;
    if (props.product.deal_type === 'percentage' && props.product.deal_discount) {
        return props.product.price_in_pence * (1 - props.product.deal_discount / 100);
    }
    if (props.product.deal_type === 'fixed_amount' && props.product.deal_discount) {
        return props.product.price_in_pence - props.product.deal_discount;
    }
    return props.product.price_in_pence;
})

const formattedPrice = computed(() => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(finalPrice.value / 100)
})
</script>

<template>
    <Card class="flex flex-col">
        <CardHeader>
            <div class="aspect-square w-full bg-muted overflow-hidden rounded-lg mb-4">
                <img :src="product.image_url" :alt="product.name"
                    class="flex h-full w-full items-center justify-center object-cover text-center" />
            </div>
            <CardTitle class="text-lg">{{ product.name }}</CardTitle>
            <CardTitle class="text-sm text-muted-foreground text-right">{{ product.brand }}</CardTitle>
            <CardDescription class=" text-sm h-10">{{ product.description.substring(0, 70) }}&hellip;</CardDescription>
        </CardHeader>
        <CardContent class="mt-8 grow items-end justify-end">
            <p class="text-2xl font-semibold">{{ formattedPrice }}</p>
        </CardContent>
        <CardFooter class="flex flex-col xl:flex-row justify-between">
            <RouterLink class="mb-4 w-full lg:mr-2 xl:mb-0 max-xl:w-auto" :to="`/products/${product.id}`">
                <Button variant="outline">View Details</Button>
            </RouterLink>
            <Button class="w-full">Add to Cart</Button>
        </CardFooter>
    </Card>
</template>
