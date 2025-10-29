<!-- banquet-web/src/views/AccountView.vue -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import ProfileForm from '@/components/account/ProfileForm.vue'
import Addresses from '@/components/account/Addresses.vue'
import OrderHistory from '@/components/order/OrderHistory.vue'
import { useUserStore } from '@/stores/user'

const route = useRoute();
const userStore = useUserStore()
const activeTab = ref(route.name === 'account-order-detail' ? 'orders' : 'profile');

onMounted(() => {
    userStore.fetchProfile()
    userStore.fetchAddresses()
})
</script>

<!-- <template>
    <div class="container py-12">
        <h1 class="text-3xl font-bold tracking-tight mb-8">My Account</h1>
        <Tabs default-value="profile" class="w-full">
            <TabsList class="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="orders">My Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" class="mt-6">
                <ProfileForm />
            </TabsContent>
            <TabsContent value="addresses" class="mt-6">
                <Addresses />
            </TabsContent>
            <TabsContent value="orders" class="mt-6">
                <div class="text-center text-muted-foreground py-12 border rounded-lg">
                    <p>You have no past orders.</p>
                </div>
            </TabsContent>
        </Tabs>
    </div>
</template> -->


<template>
    <div class="container py-12">
        <h1 class="text-3xl font-bold tracking-tight mb-8">My Account</h1>

        <div class="flex border-b mb-6">
            <button @click="activeTab = 'profile'"
                :class="['px-4 py-2', activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground']">
                Profile
            </button>
            <button @click="activeTab = 'addresses'"
                :class="['px-4 py-2', activeTab === 'addresses' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground']">
                Addresses
            </button>
            <button @click="activeTab = 'orders'"
                :class="['px-4 py-2', activeTab === 'orders' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground']">
                My Orders
            </button>
        </div>

        <div>
            <div v-if="activeTab === 'profile'">
                <ProfileForm />
            </div>
            <div v-if="activeTab === 'addresses'">
                <Addresses />
            </div>
            <div v-if="activeTab === 'orders'">
                <!-- If on a specific order detail page, show that. Otherwise, show the history list. -->
                <RouterView v-if="route.name === 'account-order-detail'" />
                <OrderHistory v-else />
            </div>
        </div>
    </div>
</template>