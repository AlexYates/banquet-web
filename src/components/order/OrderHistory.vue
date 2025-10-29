<!-- banquet-web/src/components/order/OrderHistory.vue -->

<script setup lang="ts">

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const { orders, isLoading } = storeToRefs(orderStore)

onMounted(() => {
    orderStore.fetchOrders()
})

const formatCurrency = (pence: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(pence / 100);
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB');
</script>

<template>
    <div>
        <div v-if="isLoading">Loading order history...</div>
        <div v-else-if="orders.length > 0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Total</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="order in orders" :key="order.id">
                        <TableCell class="font-medium">#{{ order.id }}</TableCell>
                        <TableCell>{{ formatDate(order.created_at) }}</TableCell>
                        <TableCell class="capitalize">{{ order.status }}</TableCell>
                        <TableCell class="text-right">{{ formatCurrency(order.total_in_pence) }}</TableCell>
                        <TableCell>
                            <RouterLink :to="{ name: 'account-order-detail', params: { id: order.id } }">
                                <Button variant="outline" size="sm">View</Button>
                            </RouterLink>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <div v-else>
            <p class="text-muted-foreground py-4">You have no past orders.</p>
        </div>
    </div>
</template>
