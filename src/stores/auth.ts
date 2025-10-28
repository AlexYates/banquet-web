// banquet-web/src/stores/auth.ts

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import api from '@/lib/api'
import type { User } from '@/types'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const useAuthStore = defineStore('auth', () => {
    // Initialize token from localStorage to keep the user logged in across page reloads
    const token = ref<string | null>(localStorage.getItem('authToken'))
    const user = ref<User | null>(null) // We can store user data here later if needed

    const isAuthenticated = computed(() => !!token.value)

    /**
     * Sets the auth token in the store, localStorage, and axios headers.
     * @param newToken The JWT token received from the API.
     */
    function setToken(newToken: string) {
        token.value = newToken
        localStorage.setItem('authToken', newToken)
    }

    /**
     * Clears the auth token from the store, localStorage, and axios headers.
     */
    function clearAuth() {
        token.value = null
        user.value = null
        localStorage.removeItem('authToken') 
        console.log('clearAuth')
        window.location.reload()
    }

    /**
     * Logs in the user, fetches a token, and stores it.
     * @param credentials The user's email and password.
     * @returns True if login was successful, otherwise false.
     */
    async function login(credentials: z.infer<typeof loginSchema>): Promise<boolean> {
        try {
            const response = await api.post<{ token: string }>('/login', credentials)
            setToken(response.data.token)
            toast.success('Login successful!')
            return true
        } catch (error) {
            console.error('Login failed:', error)
            toast.error('Login Failed', {
                description: 'Please check your email and password.',
            })
            return false
        }
    }

    /**
     * Registers a new user.
     * @param credentials The new user's email and password.
     * @returns True if registration was successful, otherwise false.
     */
    async function register(credentials: z.infer<typeof registerSchema>): Promise<boolean> {
        try {
            await api.post('/register', credentials)
            toast.success('Registration successful!', {
                description: 'You can now log in with your new account.',
            })
            return true
        } catch (error) {
            console.error('Registration failed:', error)
            toast.error('Registration Failed', {
                description: 'This email may already be in use.',
            })
            return false
        }
    }

    /**
     * Logs the user out by clearing all auth data.
     */
    function logout() {
        clearAuth()
        toast.info('You have been logged out.')
    }

    return {
        token,
        user,
        isAuthenticated,
        login,
        register,
        logout,
    }
})