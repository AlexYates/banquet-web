<!-- banquet-web/src/components/account/AddressForm.vue -->

<script setup lang="ts">

import { watch } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useForm } from 'vee-validate';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-vue-next';

import { useUserStore } from '@/stores/user';
import type { Address } from '@/types';

const props = defineProps<{
    initialData?: Address | null;
    onSuccess: () => void;
}>();

const userStore = useUserStore();

const addressFormSchema = toTypedSchema(z.object({
    address_type: z.enum(['shipping', 'billing'], { required_error: 'Please select an address type.' }),
    street_address: z.string().min(1, 'Street address is required.'),
    city: z.string().min(1, 'City is required.'),
    post_code: z.string().min(1, 'Post code is required.'),
    country: z.string().min(1, 'Country is required.'),
    is_default: z.boolean().default(false),
}));

const form = useForm({
    validationSchema: addressFormSchema,
    initialValues: props.initialData ? { ...props.initialData, is_default: props.initialData.is_default || false } : { is_default: false },
});

watch(() => props.initialData, (newData) => {
    form.resetForm({
        values: newData ? { ...newData, is_default: newData.is_default || false } : { is_default: false },
    });
});

const onSubmit = form.handleSubmit(async (values) => {
    let success = false;
    if (props.initialData) {
        // We are editing
        success = await userStore.updateAddress(props.initialData.id, values);
    } else {
        // We are creating
        success = await userStore.saveAddress(values);
    }
    if (success) {
        props.onSuccess();
    }
});
</script>

<template>
    <form @submit="onSubmit" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="address_type">
                <FormItem>
                    <FormLabel>Address Type</FormLabel>
                    <Select v-bind="componentField">
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="shipping">Shipping</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
        <FormField v-slot="{ componentField }" name="street_address">
            <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl><Input type="text" v-bind="componentField" /></FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <div class="grid grid-cols-3 gap-4">
            <FormField v-slot="{ componentField }" name="city">
                <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input type="text" v-bind="componentField" /></FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="post_code">
                <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl><Input type="text" v-bind="componentField" /></FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="country">
                <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl><Input type="text" v-bind="componentField" /></FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
        <FormField v-slot="{ value, handleChange }" name="is_default">
            <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
                <FormControl>
                    <Checkbox :checked="value" @update:checked="handleChange" />
                </FormControl>
                <div class="space-y-1 leading-none">
                    <FormLabel>Set as default address</FormLabel>
                </div>
            </FormItem>
        </FormField>
        <Button type="submit" :disabled="form.isSubmitting.value">
            <Loader2 v-if="form.isSubmitting.value" class="w-4 h-4 mr-2 animate-spin" />
            {{ initialData ? 'Save Changes' : 'Add Address' }}
        </Button>
    </form>
</template>
