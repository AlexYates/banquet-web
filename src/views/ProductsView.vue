<!-- banquet-web/src/views/ProductsView.vue -->

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductFilters from '@/components/products/ProductFilters.vue'
import ProductCard from '@/components/products/ProductCard.vue'

const productsStore = useProductsStore()

onMounted(() => {
    productsStore.initializeFiltersFromUrl();
    productsStore.fetchProducts()
})
</script>

<template>
    <div class="container py-8">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-extrabold tracking-tight">Our Collection</h1>
            <p class="mt-2 text-lg text-muted-foreground">Find your next favorite board or accessory.</p>
        </div>
        <div class="flex flex-col md:flex-row gap-8">
            <ProductFilters />
            <div class="flex-1">
                <div v-if="productsStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="n in 6" :key="n" class="animate-pulse bg-muted rounded-lg h-96"></div>
                </div>
                <div v-else-if="productsStore.products.length > 0"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProductCard v-for="product in productsStore.products" :key="product.id" :product="product" />
                </div>
                <div v-else class="text-center py-20 bg-muted rounded-lg">
                    <h3 class="text-xl font-semibold">No Products Found</h3>
                    <p class="text-muted-foreground mt-2">Try adjusting your filters.</p>
                </div>
            </div>
        </div>
    </div>
</template>
