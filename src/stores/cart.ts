// banquet-web/src/stores/cart.ts

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import api from '@/lib/api'

export type CartItem = {
    id: number;
    name: string;
    price_in_pence: number;
    image_url: string;
    quantity: number;
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])
    const isPanelOpen = ref(false)
    const isLoading = ref(false)

    const itemCount = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    const cartTotal = computed(() => {
        const totalPence = items.value.reduce((total, item) => total + (item.price_in_pence * item.quantity), 0)
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(totalPence / 100)
    })

    function togglePanel() {
        isPanelOpen.value = !isPanelOpen.value
    }

    async function fetchCart() {
        isLoading.value = true
        try {
            const response = await api.get<{ items: CartItem[] }>('/cart')
            items.value = response.data.items
        } catch (error) {
            console.error('Failed to fetch cart:', error)
        } finally {
            isLoading.value = false
        }
    }

    async function addToCart(productId: number, quantity: number) {
        try {
            await api.post('/cart/items', { productId, quantity })
            toast.success('Item added to cart!')
            await fetchCart()
            isPanelOpen.value = true
        } catch (error) {
            console.error('Failed to add to cart:', error)
            toast.error('Could not add item', {
                description: 'Please try again later.'
            })
        }
    }

    async function updateQuantity(productId: number, quantity: number) {
        if (quantity <= 0) {
            await removeFromCart(productId)
            return
        }
        try {
            await api.put(`/cart/items/${productId}`, { quantity })
            await fetchCart()
        } catch (error) {
            console.error('Failed to update quantity:', error)
            toast.error('Failed to update item quantity.')
        }
    }

    async function removeFromCart(productId: number) {
        try {
            await api.delete(`/cart/items/${productId}`)
            toast.info('Item removed from cart.')
            await fetchCart()
        } catch (error) {
            console.error('Failed to remove item:', error)
            toast.error('Failed to remove item from cart.')
        }
    }

    return {
        items,
        isPanelOpen,
        isLoading,
        itemCount,
        cartTotal,
        togglePanel,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart
    }
})
