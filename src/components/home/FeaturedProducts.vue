<!-- banquet-web/src/components/home/FeaturedProducts.vue -->

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/products/ProductCard.vue'

const productsStore = useProductsStore()

const featuredProducts = computed(() => {
    return productsStore.products.filter((product:Product) => product.rating && product.rating >= 4.5).slice(0, 3)
})

onMounted(() => {
    if (productsStore.products.length === 0) {
        productsStore.fetchProducts()
    }
})
</script>

<template>
    <section class="py-16 md:py-24 bg-secondary/50">
        <div class="container">
            <div class="text-center">
                <h2 class="text-3xl font-bold tracking-tight">Featured Gear</h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Hand-picked by our team, these are the standout items you'll love.
                </p>
            </div>
            <div v-if="featuredProducts.length" class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
            </div>
            <div class="mt-12 text-center">
                <Button size="lg" as-child>
                    <RouterLink to="/products">Shop The Full Collection</RouterLink>
                </Button>
            </div>
        </div>
    </section>
</template>
