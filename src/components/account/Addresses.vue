<!-- banquet-web/src/components/account/Addresses.vue -->

<script setup lang="ts">
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Trash2, Edit } from 'lucide-vue-next';

import { useUserStore } from '@/stores/user';
import type { Address } from '@/types';
import AddressForm from './AddressForm.vue';

const userStore = useUserStore();
const isDialogOpen = ref(false);
const editingAddress = ref<Address | null>(null);

function openAddDialog() {
    editingAddress.value = null;
    isDialogOpen.value = true;
}

function openEditDialog(address: Address) {
    editingAddress.value = address;
    isDialogOpen.value = true;
}

function onFormSuccess() {
    isDialogOpen.value = false;
    editingAddress.value = null;
}
</script>

<template>
    <Card>
        <CardHeader class="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Your Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses.</CardDescription>
            </div>
            <Button @click="openAddDialog">
                <PlusCircle class="h-4 w-4 mr-2" />
                Add Address
            </Button>
        </CardHeader>
        <CardContent>
            <div v-if="userStore.addresses.length === 0" class="text-center text-muted-foreground py-8">
                You haven't added any addresses yet.
            </div>
            <div v-else class="grid sm:grid-cols-2 gap-4">
                <div v-for="address in userStore.addresses" :key="address.id"
                    class="p-4 border rounded-md relative group">
                    <p class="font-semibold capitalize flex items-center">
                        {{ address.address_type }} Address
                        <span v-if="address.is_default"
                            class="ml-2 text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Default</span>
                    </p>
                    <p>{{ address.street_address }}</p>
                    <p>{{ address.city }}, {{ address.post_code }}</p>
                    <p>{{ address.country }}</p>
                    <div class="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" @click="openEditDialog(address)">
                            <Edit class="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" @click="userStore.deleteAddress(address.id)">
                            <Trash2 class="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
    <Dialog v-model:open="isDialogOpen">
        <DialogContent class="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle>{{ editingAddress ? 'Edit Address' : 'Add a New Address' }}</DialogTitle>
                <DialogDescription>
                    {{ editingAddress ? 'Update your address details below.' : 'Enter your new address details.' }}
                </DialogDescription>
            </DialogHeader>
            <AddressForm :initial-data="editingAddress" :on-success="onFormSuccess" />
        </DialogContent>
    </Dialog>
</template>
