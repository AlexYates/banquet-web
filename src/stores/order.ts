// banquet-web/src/stores/order.ts

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import api from '@/lib/api'
import type { Order } from '@/types'
import { useCartStore } from './cart'

export const useOrderStore = defineStore('order', () => {
    const router = useRouter()
    const cartStore = useCartStore()

    const orders = ref<Order[]>([])
    const currentOrder = ref<Order | null>(null)
    const isLoading = ref(false)
    const isConfirming = ref(false)

    async function fetchOrders() {
        isLoading.value = true
        try {
            const response = await api.get<Order[]>('/orders')
            orders.value = response.data
        } catch (error) {
            console.error('Failed to fetch orders:', error)
            toast.error('Could not fetch order history.')
        } finally {
            isLoading.value = false
        }
    }

    async function fetchOrderById(orderId: number) {
        isLoading.value = true
        currentOrder.value = null
        try {
            const response = await api.get<Order>(`/orders/${orderId}`)
            currentOrder.value = response.data
        } catch (error) {
            console.error(`Failed to fetch order ${orderId}:`, error)
            toast.error('Could not fetch order details.')
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Creates a payment intent and confirms the order.
     */
    async function createAndConfirmOrder(shippingAddressId: number) {
        if (isConfirming.value) return
        isConfirming.value = true
        toast.loading('Processing payment...')

        try {
            const intentResponse = await api.post<{ paymentIntentId: string }>('/orders/intent', {
                shipping_address_id: shippingAddressId,
            })
            const { paymentIntentId } = intentResponse.data

            const confirmResponse = await api.post<Order>('/orders/confirm', {
                payment_intent_id: paymentIntentId,
                shipping_address_id: shippingAddressId,
            })
            const newOrder = confirmResponse.data

            cartStore.clearCart()
            toast.dismiss()
            toast.success('Order placed successfully!')
            router.push({ name: 'order-confirmation', params: { id: newOrder.id } })

        } catch (error: any) {
            console.error('Order creation failed:', error)
            toast.dismiss()
            toast.error('Order Failed', {
                description: error.response?.data?.error || 'Could not complete your order. Please try again.',
            })
        } finally {
            isConfirming.value = false
        }
    }

    return {
        orders,
        currentOrder,
        isLoading,
        isConfirming,
        fetchOrders,
        fetchOrderById,
        createAndConfirmOrder,
    }
})
