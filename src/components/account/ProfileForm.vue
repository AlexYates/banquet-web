<!-- banquet-web/src/components/account/ProfileForm.vue -->

<script setup lang="ts">
import { watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-vue-next';

const userStore = useUserStore();

const profileFormSchema = toTypedSchema(z.object({
    first_name: z.string().min(1, 'First name cannot be empty').optional().or(z.literal('')),
    last_name: z.string().min(1, 'Last name cannot be empty').optional().or(z.literal('')),
    phone_number: z.string().min(6, 'Phone number cannot be empty').optional().or(z.literal('')),
}));

const form = useForm({
    validationSchema: profileFormSchema,
});

watch(() => userStore.profile, (newProfile) => {
    if (newProfile) {
        form.resetForm({
            values: {
                first_name: newProfile.first_name || '',
                last_name: newProfile.last_name || '',
                phone_number: newProfile.phone_number || '',
            }
        });
    }
}, { immediate: true });

const onSubmit = form.handleSubmit(async (values) => {
    const cleanedValues = Object.fromEntries(
        Object.entries(values).filter(([, value]) => value !== '')
    );
    await userStore.saveProfile(cleanedValues);
});
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit="onSubmit" class="space-y-6">
                <div class="grid sm:grid-cols-2 gap-6">
                    <FormField v-slot="{ componentField }" name="first_name">
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="John" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="last_name">
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Doe" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
                <FormField v-slot="{ componentField }" name="phone_number">
                    <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input type="tel" placeholder="07123 456789" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button type="submit" :disabled="form.isSubmitting.value">
                    <Loader2 v-if="form.isSubmitting.value" class="w-4 h-4 mr-2 animate-spin" />
                    Save Changes
                </Button>
            </form>
        </CardContent>
    </Card>
</template>
