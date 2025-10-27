banquet-web/src/components/products/ProductSpecs.vue

<script setup lang="ts">
import type { Product } from '@/types';

defineProps<{
    product: Product
}>();

const specs: { key: keyof Product; label: string }[] = [
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'volume', label: 'Volume' },
    { key: 'ability', label: 'Rider Ability' },
    { key: 'conditions', label: 'Wave Conditions' },
    { key: 'construction', label: 'Construction' },
    { key: 'fin_system', label: 'Fin System' },
] as const;
</script>

<template>
    <div>
        <h3 class="text-xl font-bold mb-4">Tech Specs</h3>
        <dl class="grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-4">
            <template v-for="spec in specs" :key="spec.key">
                <div v-if="product[spec.key]" class="contents">
                    <dt class="text-sm font-medium text-muted-foreground">{{ spec.label }}</dt>
                    <dd class="text-sm">{{ product[spec.key] }}</dd>
                </div>
            </template>
        </dl>
    </div>
</template>
