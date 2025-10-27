<!-- banquet-web/src/views/AccountView.vue -->

<script setup lang="ts">
import { onMounted } from 'vue'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileForm from '@/components/account/ProfileForm.vue'
import Addresses from '@/components/account/Addresses.vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
    userStore.fetchProfile()
    userStore.fetchAddresses()
})
</script>

<template>
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
</template>
