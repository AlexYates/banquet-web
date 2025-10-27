<!-- banquet-web/src/views/ProductDetailView.vue -->

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Star } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'vue-sonner'

import { useAuthStore } from '@/stores/auth'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductSpecs from '@/components/products/ProductSpecs.vue'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const quantity = ref(1)

const product = computed(() => productsStore.selectedProduct)

onMounted(() => {
    const productId = route.params.id as string
    if (productId) {
        productsStore.fetchProductById(productId)
    }
})

function formatPrice(priceInPence: number) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(priceInPence / 100)
}

// NOTE: Extract as a utility?
const finalPrice = computed(() => {
    if (!product.value) return 0;
    if (product.value.deal_type === 'percentage' && product.value.deal_discount) {
        return product.value.price_in_pence * (1 - product.value.deal_discount / 100);
    }
    if (product.value.deal_type === 'fixed_amount' && product.value.deal_discount) {
        return product.value.price_in_pence - product.value.deal_discount;
    }
    return product.value.price_in_pence;
})

function incrementQuantity() {
    quantity.value++;
}

function decrementQuantity() {
    if (quantity.value > 1) {
        quantity.value--;
    }
}

function handleAddToCart() {
    if (!authStore.isAuthenticated) {
        toast.info('Please log in to add items to your cart.', {
            action: {
                label: 'Login',
                onClick: () => router.push({ name: 'login' }),
            },
        })
        return
    }
    cartStore.addToCart(product.value!.id, quantity.value)
}

const hasSpecs = computed(() => {
    return [
        'dimensions',
        'volume',
        'ability',
        'conditions',
        'construction',
        'fin_system',
    ].some((spec) => {
        return product.value[spec] != null
    });
});
</script>

<template>
    <div class="container py-12">
        <div v-if="productsStore.isLoading" class="text-center">Loading&hellip;</div>
        <div v-else-if="!product" class="text-center">
            <h2 class="text-2xl font-bold">Product Not Found</h2>
            <p class="text-muted-foreground">We couldn't find the product you're looking for.</p>
            <Button as-child class="mt-4">
                <RouterLink to="/products">Back to Products</RouterLink>
            </Button>
        </div>
        <div v-else class="grid md:grid-cols-2 gap-12">
            <div class="bg-muted rounded-lg flex items-center justify-center p-8">
                <img :src="`http://localhost:3000${product.image_url}`" :alt="product.name"
                    class="max-h-[500px] object-contain" />
            </div>
            <div class="flex flex-col space-y-4">
                <div>
                    <h1 class="text-3xl lg:text-4xl font-bold tracking-tight">{{ product.name }}</h1>
                    <h2 class="text-lg text-muted-foreground">{{ product.brand }} - {{ product.model }}</h2>
                </div>
                <div v-if="product.rating" class="flex items-center gap-2">
                    <div class="flex items-center">
                        <Star v-for="i in 5" :key="i" class="h-5 w-5"
                            :class="i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'" />
                    </div>
                    <span class="text-muted-foreground text-sm">{{ product.rating.toFixed(1) }} stars</span>
                </div>
                <p class="text-base leading-relaxed">{{ product.description }}</p>
                <div class="flex items-baseline gap-4 pt-4">
                    <span v-if="product.deal_type" class="text-2xl text-muted-foreground line-through">
                        {{ formatPrice(product.price_in_pence) }}
                    </span>
                    <span class="text-4xl font-bold text-primary">
                        {{ formatPrice(finalPrice) }}
                    </span>
                    <Badge v-if="product.deal_type === 'percentage'" variant="destructive">
                        {{ product.deal_discount }}% OFF
                    </Badge>
                    <Badge v-if="product.deal_type === 'fixed_amount'" variant="destructive">
                        {{ formatPrice(product.deal_discount!) }} OFF
                    </Badge>
                </div>
                <div class="flex items-center gap-4 pt-6">
                    <div class="flex items-center border rounded-md">
                        <Button variant="ghost" @click="decrementQuantity" class="px-3">-</Button>
                        <span class="px-4 w-12 text-center">{{ quantity }}</span>
                        <Button variant="ghost" @click="incrementQuantity" class="px-3">+</Button>
                    </div>
                    <Button size="lg" class="flex-1" @click="handleAddToCart">Add to Cart</Button>
                </div>
                <template v-if="hasSpecs">
                    <Separator />
                    <ProductSpecs :product="product" />
                </template>
            </div>
        </div>
    </div>
</template>
