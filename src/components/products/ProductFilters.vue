<!-- banquet-web/src/components/products/ProductFilters.vue -->

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

const productsStore = useProductsStore()

onMounted(() => {
    productsStore.fetchAvailableBrands();
});

function onFilterChange() {
    productsStore.updateUrlWithFilters();
    productsStore.fetchProducts();
}
</script>

<template>
    <!-- <aside class="w-full md:w-64 lg:w-72"> -->
    <aside class="w-full md:w-48 lg:w-64">
        <h2 class="text-xl font-bold mb-4">Filters</h2>
        <div class="space-y-6">
            <div>
                <Label for="category" class="font-semibold inline-flex mb-2">Category</Label>
                <Select id="category" v-model="productsStore.filters.category" @update:model-value="onFilterChange">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="surfboard">Surfboards</SelectItem>
                            <SelectItem value="accessory">Accessories</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <div class="flex justify-between items-center mb-2" aria-live="polite">
                    <Label class="font-semibold">Max Price</Label>
                    <span class="text-sm text-muted-foreground">{{ productsStore.formattedMaxPrice }}</span>
                </div>
                <Slider :default-value="[80000]" :model-value="[productsStore.filters.price_in_pence_lt ?? 80000]"
                    @update:model-value="(val?) => { productsStore.filters.price_in_pence_lt = val[0] }"
                    @value-commit="onFilterChange" :max="80000" :step="1000" />
            </div>
            <div>
                <Label for="brand" class="font-semibold inline-flex mb-2">Brand</Label>
                <Select id="brand" v-model="productsStore.filters.brand" @update:model-value="onFilterChange">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All Brands</SelectItem>
                            <SelectItem v-for="brand in productsStore.availableBrands" :key="brand" :value="brand">
                                {{ brand }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <!-- We'll add Model filters here later when the API supports them -->
        </div>
    </aside>
</template>
