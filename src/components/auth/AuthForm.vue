<!-- banquet-web/src/components/auth/AuthForm.vue -->

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
    formType: 'login' | 'register'
    onSubmit: (values: any) => Promise<boolean>
}>()

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email('Please enter a valid email address.'),
        password: z.string().min(props.formType === 'register' ? 6 : 1, {
            message: props.formType === 'register' ? 'Password must be at least 6 characters.' : 'Password is required.',
        }),
    })
)

const form = useForm({
    validationSchema: formSchema,
})

const isSubmitting = form.isSubmitting

const submitHandler = form.handleSubmit(async (values) => {
    await props.onSubmit(values)
})
</script>

<template>
    <form @submit="submitHandler" class="space-y-6">
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="you@example.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="••••••••" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" class="w-full" :disabled="isSubmitting">
            <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
            <span v-if="formType === 'login'">Log In</span>
            <span v-else>Create Account</span>
        </Button>
    </form>
</template>
