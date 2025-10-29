<!-- banquet-web/src/views/CheckoutView.vue -->

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useOrderStore } from '@/stores/order'

const cartStore = useCartStore()
const userStore = useUserStore()
const orderStore = useOrderStore()

const { items: cartItems, cartSubtotal } = storeToRefs(cartStore)
const { addresses } = storeToRefs(userStore)
const { isConfirming } = storeToRefs(orderStore)

const selectedAddressId = ref<number | null>(null)

const SHIPPING_COST = 499 // 4.99 GBP in pence
const TAX_RATE = 0.20 // 20%

const taxAmount = computed(() => Math.round((cartSubtotal.value + SHIPPING_COST) * TAX_RATE))
const grandTotal = computed(() => cartSubtotal.value + SHIPPING_COST + taxAmount.value)

const formatCurrency = (pence: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(pence / 100);

onMounted(async () => {
    await userStore.fetchAddresses()
    const defaultAddress = addresses.value.find(a => a.is_default) || addresses.value[0]
    if (defaultAddress) {
        selectedAddressId.value = defaultAddress.id
    }
})

function handleCheckout() {
    if (selectedAddressId.value) {
        orderStore.createAndConfirmOrder(selectedAddressId.value)
    } else {
        alert('Please select a shipping address.')
    }
}
</script>

<template>
    <div class="container py-12">
        <h1 class="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup v-if="addresses.length > 0" v-model="selectedAddressId">
                            <div v-for="address in addresses" :key="address.id"
                                class="flex items-center space-x-2 mb-4 border p-4 rounded-md">
                                <RadioGroupItem :value="address.id" :id="`addr-${address.id}`" />
                                <Label :for="`addr-${address.id}`" class="font-normal w-full">
                                    <p class="font-semibold">{{ address.street_address }}</p>
                                    <p>{{ address.city }}, {{ address.post_code }}</p>
                                    <p>{{ address.country }}</p>
                                </Label>
                            </div>
                        </RadioGroup>
                        <Alert v-else>
                            <AlertTitle>No Addresses Found</AlertTitle>
                            <AlertDescription>
                                Please add a shipping address to your account before proceeding.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
                <Card class="mt-8">
                    <CardHeader>
                        <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-sm text-muted-foreground">
                            This is a demo store. No real payment will be processed. Clicking "Confirm Order" will
                            simulate a successful transaction.
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center mb-2">
                            <span>{{ item.name }} x {{ item.quantity }}</span>
                            <span>{{ formatCurrency(item.price_in_pence * item.quantity) }}</span>
                        </div>
                        <Separator class="my-4" />
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>{{ formatCurrency(cartSubtotal) }}</span>
                        </div>
                        <div class="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span>{{ formatCurrency(SHIPPING_COST) }}</span>
                        </div>
                        <div class="flex justify-between text-muted-foreground">
                            <span>Taxes (20%)</span>
                            <span>{{ formatCurrency(taxAmount) }}</span>
                        </div>
                        <Separator class="my-4" />
                        <div class="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{{ formatCurrency(grandTotal) }}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button @click="handleCheckout"
                            :disabled="!selectedAddressId || isConfirming || cartItems.length === 0" class="w-full">
                            {{ isConfirming ? 'Processing...' : 'Confirm Order' }}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
</template>
