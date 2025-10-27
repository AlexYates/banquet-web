// banquet-web/src/stores/user.ts

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

import api from '@/lib/api'
import type { UserProfile, Address } from '@/types'

export const useUserStore = defineStore('user', () => {
    const profile = ref<UserProfile | null>(null)
    const addresses = ref<Address[]>([])
    const isLoading = ref(false)

    async function fetchProfile() {
        isLoading.value = true
        try {
            const response = await api.get<UserProfile>('/profile')
            profile.value = response.data
        } catch (error: any) {
            if (error.response?.status !== 404) {
                toast.error('Failed to fetch profile.')
            }
            profile.value = null
        } finally {
            isLoading.value = false
        }
    }

    async function saveProfile(profileData: Partial<UserProfile>) {
        try {
            const method = profile.value ? 'put' : 'post'
            const response = await api[method]<UserProfile>('/profile', profileData)
            profile.value = response.data
            toast.success('Profile updated successfully!')
        } catch (error) {
            toast.error('Failed to save profile.')
        }
    }

    async function fetchAddresses() {
        try {
            const response = await api.get<Address[]>('/addresses')
            addresses.value = response.data
            return true;
        } catch (error) {
            toast.error('Failed to fetch addresses.')
            return false;
        }
    }

    async function saveAddress(addressData: Omit<Address, 'id' | 'user_id'>) {
        try {
            await api.post('/addresses', addressData)
            toast.success('Address added successfully!')
            await fetchAddresses()
            return true;
        } catch (error) {
            toast.error('Failed to add address.')
            return false;
        }
    }

    async function updateAddress(addressId: number, addressData: Partial<Omit<Address, 'id' | 'user_id'>>) {
        try {
            await api.put(`/addresses/${addressId}`, addressData)
            toast.success('Address updated successfully!')
            await fetchAddresses()
            return true;
        } catch (error) {
            toast.error('Failed to update address.')
            return false;
        }
    }

    async function deleteAddress(addressId: number) {
        try {
            await api.delete(`/addresses/${addressId}`)
            toast.info('Address removed.')
            await fetchAddresses()
            return true;
        } catch (error) {
            toast.error('Failed to remove address.')
            return false;
        }
    }

    return {
        profile,
        addresses,
        isLoading,
        fetchProfile,
        saveProfile,
        fetchAddresses,
        saveAddress,
        updateAddress,
        deleteAddress
    }
})
