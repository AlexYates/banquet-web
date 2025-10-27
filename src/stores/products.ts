// banquet-web/src/stores/products.ts

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/lib/api'
import type { Product, ProductCategory } from '@/types'
import { useRoute, useRouter } from 'vue-router'

export interface ProductFilters {
    category: ProductCategory | 'all'
    price_in_pence_gt: number | null
    price_in_pence_lt: number | null
}

export const useProductsStore = defineStore('products', () => {
    const router = useRouter()
    const route = useRoute()

    const products = ref<Product[]>([])
    const isLoading = ref(false)
    const filters = ref<ProductFilters>({
        category: 'all',
        price_in_pence_gt: null,
        price_in_pence_lt: null,
    })

    const formattedMaxPrice = computed(() => {
        if (!filters.value.price_in_pence_lt) return 'Any'
        return `£${(filters.value.price_in_pence_lt / 100).toFixed(2)}`
    })

    /**
     * Fetches products from the API based on the current filters.
     */
    async function fetchProducts() {
        isLoading.value = true
        try {
            const params = new URLSearchParams()
            if (filters.value.category && filters.value.category !== 'all') {
                params.append('category', filters.value.category)
            }
            if (filters.value.price_in_pence_gt) {
                params.append('price_in_pence_gt', filters.value.price_in_pence_gt.toString())
            }
            if (filters.value.price_in_pence_lt) {
                params.append('price_in_pence_lt', filters.value.price_in_pence_lt.toString())
            }

            const response = await api.get<Product[]>(`/products?${params.toString()}`)
            products.value = response.data
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Updates the URL query parameters whenever filters change.
     * This allows for shareable, bookmarkable filter links.
     */
    function updateUrlWithFilters() {
        const query: Record<string, any> = {}
        if (filters.value.category !== 'all') query.category = filters.value.category
        if (filters.value.price_in_pence_lt) query.maxPrice = filters.value.price_in_pence_lt

        router.push({ query })
    }

    /**
     * Reads filter values from the URL on page load.
     */
    function initializeFiltersFromUrl() {
        const { category, maxPrice } = route.query
        if (category && (category === 'surfboard' || category === 'accessory')) {
            filters.value.category = category
        }
        if (maxPrice && !isNaN(Number(maxPrice))) {
            filters.value.price_in_pence_lt = Number(maxPrice)
        }
    }

    return {
        products,
        isLoading,
        filters,
        formattedMaxPrice,
        fetchProducts,
        updateUrlWithFilters,
        initializeFiltersFromUrl,
    }
})