// banquet-web/src/stores/stores.test.ts

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useCartStore, type CartItem } from '@/stores/cart'
import { useNewsletterStore, type Newsletter } from '@/stores/newsletter'
import { useProductsStore, type ProductFilters } from '@/stores/products'
import { useUserStore } from '@/stores/user'
import type { UserProfile, Address, Product } from '@/types'

// Mock external dependencies
vi.mock('@/lib/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}))

vi.mock('vue-sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
    },
}))

const mockRouter = {
    push: vi.fn(),
}
const mockRoute = {
    query: {},
}

vi.mock('vue-router', () => ({
    useRouter: () => mockRouter,
    useRoute: () => mockRoute,
}))

// We need to import the mocked modules to use them in tests
import api from '@/lib/api'
import { toast } from 'vue-sonner'

// Mock window.location.reload for the auth store logout
const originalLocation = window.location
// @ts-ignore
delete window.location
window.location = { ...originalLocation, reload: vi.fn() }

// Helper to cast mocked functions
const mockedApi = vi.mocked(api)
const mockedToast = vi.mocked(toast)

describe('Pinia Stores', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
        localStorage.clear()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    /**
     * Auth Store Tests
     */
    describe('useAuthStore', () => {
        it('initializes with no token and isAuthenticated is false', () => {
            const authStore = useAuthStore()
            expect(authStore.token).toBeNull()
            expect(authStore.isAuthenticated).toBe(false)
        })

        it('initializes token from localStorage', () => {
            localStorage.setItem('authToken', 'test-token')
            const authStore = useAuthStore()
            expect(authStore.token).toBe('test-token')
            expect(authStore.isAuthenticated).toBe(true)
        })

        it('logins successfully and updates state', async () => {
            const authStore = useAuthStore()
            const token = 'jwt-token'
            mockedApi.post.mockResolvedValue({ data: { token } })

            const result = await authStore.login({ email: 'test@test.com', password: 'password' })

            expect(result).toBe(true)
            expect(authStore.token).toBe(token)
            expect(authStore.isAuthenticated).toBe(true)
            expect(localStorage.getItem('authToken')).toBe(token)
            expect(mockedToast.success).toHaveBeenCalledWith('Login successful!')
        })

        it('handles login failure', async () => {
            const authStore = useAuthStore()
            mockedApi.post.mockRejectedValue(new Error('Login failed'))

            const result = await authStore.login({ email: 'test@test.com', password: 'password' })

            expect(result).toBe(false)
            expect(authStore.token).toBeNull()
            expect(authStore.isAuthenticated).toBe(false)
            expect(mockedToast.error).toHaveBeenCalledWith('Login Failed', expect.any(Object))
        })

        it('registers successfully', async () => {
            const authStore = useAuthStore()
            mockedApi.post.mockResolvedValue({})

            const result = await authStore.register({ email: 'new@test.com', password: 'password123' })

            expect(result).toBe(true)
            expect(mockedToast.success).toHaveBeenCalledWith('Registration successful!', expect.any(Object))
        })

        it('logs out and clears auth state', () => {
            localStorage.setItem('authToken', 'test-token')
            const authStore = useAuthStore() // Re-init to pick up localStorage
            expect(authStore.isAuthenticated).toBe(true)

            authStore.logout()

            expect(authStore.token).toBeNull()
            expect(authStore.user).toBeNull()
            expect(authStore.isAuthenticated).toBe(false)
            expect(localStorage.getItem('authToken')).toBeNull()
            expect(mockedToast.info).toHaveBeenCalledWith('You have been logged out.')
            expect(window.location.reload).toHaveBeenCalled()
        })
    })

    /**
     * Cart Store Tests
     */
    describe('useCartStore', () => {
        const mockCartItems: CartItem[] = [
            { id: 1, name: 'Surfboard A', price_in_pence: 50000, image_url: '', quantity: 1 },
            { id: 2, name: 'Leash B', price_in_pence: 2500, image_url: '', quantity: 2 },
        ]

        it('initializes with an empty cart', () => {
            const cartStore = useCartStore()
            expect(cartStore.items).toEqual([])
            expect(cartStore.itemCount).toBe(0)
            expect(cartStore.cartTotal).toBe('£0.00')
            expect(cartStore.isPanelOpen).toBe(false)
        })

        it('fetches cart items successfully', async () => {
            const cartStore = useCartStore()
            mockedApi.get.mockResolvedValue({ data: { items: mockCartItems } })

            await cartStore.fetchCart()

            expect(cartStore.items).toEqual(mockCartItems)
            expect(cartStore.itemCount).toBe(3) // 1 + 2
            expect(cartStore.cartTotal).toBe('£550.00') // (50000 + 2500*2) / 100
            expect(cartStore.isLoading).toBe(false)
        })

        it('adds an item to the cart', async () => {
            const cartStore = useCartStore()
            mockedApi.post.mockResolvedValue({})
            // Mock the subsequent fetchCart call
            mockedApi.get.mockResolvedValue({ data: { items: [mockCartItems[0]] } })

            await cartStore.addToCart(1, 1)

            expect(mockedApi.post).toHaveBeenCalledWith('/cart/items', { productId: 1, quantity: 1 })
            expect(mockedToast.success).toHaveBeenCalledWith('Item added to cart!')
            expect(cartStore.items).toEqual([mockCartItems[0]]) // Verifies fetchCart was called
            expect(cartStore.isPanelOpen).toBe(true)
        })

        it('updates an item quantity', async () => {
            const cartStore = useCartStore()
            mockedApi.put.mockResolvedValue({})
            mockedApi.get.mockResolvedValue({ data: { items: [] } }) // fetchCart is called

            await cartStore.updateQuantity(1, 5)

            expect(mockedApi.put).toHaveBeenCalledWith('/cart/items/1', { quantity: 5 })
            expect(mockedApi.get).toHaveBeenCalledWith('/cart')
        })

        it('removes an item when quantity is updated to 0', async () => {
            const cartStore = useCartStore()
            mockedApi.delete.mockResolvedValue({})
            mockedApi.get.mockResolvedValue({ data: { items: [] } }) // fetchCart is called

            await cartStore.updateQuantity(1, 0)

            expect(mockedApi.delete).toHaveBeenCalledWith('/cart/items/1')
            expect(mockedToast.info).toHaveBeenCalledWith('Item removed from cart.')
            expect(mockedApi.get).toHaveBeenCalledWith('/cart')
        })
    })

    /**
     * Newsletter Store Tests
     */
    describe('useNewsletterStore', () => {
        const mockNewsletters: Newsletter[] = [
            { id: 2, subject: 'Latest News', content: '...', published_at: '2023-10-27T10:00:00Z' },
            { id: 1, subject: 'Old News', content: '...', published_at: '2023-09-27T10:00:00Z' },
        ]

        it('subscribes successfully', async () => {
            const store = useNewsletterStore()
            mockedApi.post.mockResolvedValue({})

            const result = await store.subscribe('test@example.com')

            expect(result).toBe(true)
            expect(mockedApi.post).toHaveBeenCalledWith('/newsletter/subscribe', { email: 'test@example.com' })
            expect(mockedToast.success).toHaveBeenCalled()
        })

        it('handles already subscribed (409 conflict)', async () => {
            const store = useNewsletterStore()
            mockedApi.post.mockRejectedValue({ response: { status: 409 } })

            const result = await store.subscribe('test@example.com')

            expect(result).toBe(true)
            expect(mockedToast.info).toHaveBeenCalledWith('You are already subscribed!')
        })

        it('fetches archive successfully and computes properties', async () => {
            const store = useNewsletterStore()
            mockedApi.get.mockResolvedValue({ data: mockNewsletters })

            await store.fetchArchive()

            expect(store.newsletters).toEqual(mockNewsletters)
            expect(store.latestNewsletter).toEqual(mockNewsletters[0])
            expect(store.olderNewsletters).toEqual([mockNewsletters[1]])
            expect(store.error).toBeNull()
        })

        it('handles fetch archive forbidden (403) error', async () => {
            const store = useNewsletterStore()
            mockedApi.get.mockRejectedValue({ response: { status: 403 } })

            await store.fetchArchive()

            expect(store.newsletters).toEqual([])
            expect(store.error).toBe("Access Denied. You must be a logged-in subscriber to view the archive.")
        })
    })

    /**
     * Products Store Tests
     */
    describe('useProductsStore', () => {
        const mockProducts: Product[] = [
            { id: 1, name: 'A', brand: 'BrandX', category: 'surfboard', price_in_pence: 100, description: '', image_url: '' },
            { id: 2, name: 'B', brand: 'BrandY', category: 'accessory', price_in_pence: 200, description: '', image_url: '' },
            { id: 3, name: 'C', brand: 'BrandX', category: 'surfboard', price_in_pence: 300, description: '', image_url: '' },
        ]

        it('fetches available brands', async () => {
            const store = useProductsStore()
            mockedApi.get.mockResolvedValue({ data: mockProducts })

            await store.fetchAvailableBrands()

            expect(mockedApi.get).toHaveBeenCalledWith('/products')
            expect(store.availableBrands).toEqual(['BrandX', 'BrandY'])
        })

        it('fetches products with filters', async () => {
            const store = useProductsStore()
            store.filters = {
                category: 'surfboard',
                price_in_pence_lt: 250,
                price_in_pence_gt: null,
                brand: 'BrandX'
            }
            mockedApi.get.mockResolvedValue({ data: [mockProducts[0]] })

            await store.fetchProducts()

            const expectedParams = 'category=surfboard&price_in_pence_lt=250&brand=BrandX'
            expect(mockedApi.get).toHaveBeenCalledWith(`/products?${expectedParams}`)
            expect(store.products).toEqual([mockProducts[0]])
        })

        it('fetches a single product by ID', async () => {
            const store = useProductsStore()
            mockedApi.get.mockResolvedValue({ data: mockProducts[0] })

            await store.fetchProductById('1')

            expect(mockedApi.get).toHaveBeenCalledWith('/products/1')
            expect(store.selectedProduct).toEqual(mockProducts[0])
        })

        it('updates URL with filters', () => {
            const store = useProductsStore()
            store.filters = {
                category: 'accessory',
                price_in_pence_lt: 5000,
                brand: 'BrandY',
                price_in_pence_gt: null
            }

            store.updateUrlWithFilters()

            expect(mockRouter.push).toHaveBeenCalledWith({
                query: { category: 'accessory', maxPrice: 5000, brand: 'BrandY' }
            })
        })

        it('initializes filters from URL', () => {
            mockRoute.query = { category: 'surfboard', maxPrice: '10000', brand: 'TestBrand' }
            const store = useProductsStore()

            store.initializeFiltersFromUrl()

            expect(store.filters.category).toBe('surfboard')
            expect(store.filters.price_in_pence_lt).toBe(10000)
            expect(store.filters.brand).toBe('TestBrand')
        })
    })

    /**
     * User Store Tests
     */
    describe('useUserStore', () => {
        const mockProfile: UserProfile = { user_id: 1, first_name: 'John', last_name: 'Doe', phone_number: '123' };
        const mockAddress: Address = { id: 1, user_id: 1, address_line_1: '123 Main St', city: 'Anytown', postcode: '12345', country: 'UK' };

        it('fetches profile successfully', async () => {
            const store = useUserStore()
            mockedApi.get.mockResolvedValue({ data: mockProfile })

            await store.fetchProfile()

            expect(store.profile).toEqual(mockProfile)
        })

        it('handles profile not found (404) gracefully', async () => {
            const store = useUserStore()
            mockedApi.get.mockRejectedValue({ response: { status: 404 } })

            await store.fetchProfile()

            expect(store.profile).toBeNull()
            expect(mockedToast.error).not.toHaveBeenCalled()
        })

        it('saves a new profile via POST', async () => {
            const store = useUserStore() // store.profile is null
            const profileData = { first_name: 'Jane', last_name: 'Doe' }
            mockedApi.post.mockResolvedValue({ data: { ...mockProfile, ...profileData } })

            await store.saveProfile(profileData)

            expect(mockedApi.post).toHaveBeenCalledWith('/profile', profileData)
            expect(mockedToast.success).toHaveBeenCalledWith('Profile updated successfully!')
            expect(store.profile?.first_name).toBe('Jane')
        })

        it('updates an existing profile via PUT', async () => {
            const store = useUserStore()
            store.profile = mockProfile // Profile already exists
            const profileUpdate = { first_name: 'Johnny' }
            mockedApi.put.mockResolvedValue({ data: { ...mockProfile, ...profileUpdate } })

            await store.saveProfile(profileUpdate)

            expect(mockedApi.put).toHaveBeenCalledWith('/profile', profileUpdate)
            expect(mockedToast.success).toHaveBeenCalledWith('Profile updated successfully!')
            expect(store.profile?.first_name).toBe('Johnny')
        })

        it('saves a new address and refetches', async () => {
            const store = useUserStore()
            const addressData = { address_line_1: '456 Side St', city: 'Otherville', postcode: '67890', country: 'UK' }
            mockedApi.post.mockResolvedValue({})
            mockedApi.get.mockResolvedValue({ data: [mockAddress, { ...addressData, id: 2 }] })

            const result = await store.saveAddress(addressData)

            expect(result).toBe(true)
            expect(mockedApi.post).toHaveBeenCalledWith('/addresses', addressData)
            expect(mockedToast.success).toHaveBeenCalledWith('Address added successfully!')
            // check that addresses were refetched
            expect(mockedApi.get).toHaveBeenCalledWith('/addresses')
            expect(store.addresses.length).toBe(2)
        })

        it('deletes an address and refetches', async () => {
            const store = useUserStore()
            mockedApi.delete.mockResolvedValue({})
            mockedApi.get.mockResolvedValue({ data: [] })

            const result = await store.deleteAddress(1)

            expect(result).toBe(true)
            expect(mockedApi.delete).toHaveBeenCalledWith('/addresses/1')
            expect(mockedToast.info).toHaveBeenCalledWith('Address removed.')
            expect(mockedApi.get).toHaveBeenCalledWith('/addresses')
            expect(store.addresses.length).toBe(0)
        })
    })
})
