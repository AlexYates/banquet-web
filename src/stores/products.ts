// banquet-web/src/stores/products.ts

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/lib/api'
import type { Product, ProductCategory } from '@/types'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

export interface ProductFilters {
    category: ProductCategory | 'all'
    price_in_pence_gt: number | null
    price_in_pence_lt: number | null
    brand: string | 'all'
}

export const useProductsStore = defineStore('products', () => {
    const router = useRouter()
    const route = useRoute()

    const products = ref<Product[]>([])
    const selectedProduct = ref<Product | null>(null);

    const availableBrands = ref<string[]>([])
    const isLoading = ref(false)
    const filters = ref<ProductFilters>({
        category: 'all',
        price_in_pence_gt: null,
        price_in_pence_lt: null,
        brand: 'all',
    })

    const formattedMaxPrice = computed(() => {
        if (!filters.value.price_in_pence_lt) return 'Any'
        return `£${(filters.value.price_in_pence_lt / 100).toFixed(2)}`
    })

    /**
     * Fetches all products once to populate the brand filter options
     */
    async function fetchAvailableBrands() {
        try {
            const response = await api.get<Product[]>('/products');
            const uniqueBrands = [...new Set(response.data.map((product: Product) => product.brand))];
            availableBrands.value = uniqueBrands;
        } catch (error) {
            console.error('Failed to fetch brands:', error);
        }
    }

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
            if (filters.value.brand !== 'all') {
                params.append('brand', filters.value.brand);
            }
            const response = await api.get<Product[]>(`/products?${params.toString()}`)
            products.value = response.data
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            isLoading.value = false
        }
    }

    async function fetchProductById(productId: string) {
        isLoading.value = true;
        selectedProduct.value = null;
        try {
            const response = await api.get<Product>(`/products/${productId}`);
            selectedProduct.value = response.data;
        } catch (error) {
            console.error(`Failed to fetch product ${productId}:`, error);
            toast.error('Product not found', {
                description: 'The product you are looking for does not exist.'
            });
            // Optionally redirect here if needed
        } finally {
            isLoading.value = false;
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
        if (filters.value.brand !== 'all') query.brand = filters.value.brand
        router.push({ query })
    }

    /**
     * Reads filter values from the URL on page load.
     */
    function initializeFiltersFromUrl() {
        const { category, maxPrice, brand } = route.query
        if (category && (category === 'surfboard' || category === 'accessory')) {
            filters.value.category = category
        }
        if (maxPrice && !isNaN(Number(maxPrice))) {
            filters.value.price_in_pence_lt = Number(maxPrice)
        }
        if (brand && typeof brand === 'string') {
            filters.value.brand = brand;
        }
    }

    return {
        products,
        selectedProduct, 
        isLoading,
        filters,
        formattedMaxPrice,
        availableBrands,
        fetchProducts,
        fetchProductById, 
        fetchAvailableBrands,
        updateUrlWithFilters,
        initializeFiltersFromUrl,
    }
})