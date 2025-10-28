<!-- banquet-web/src/components/home/CategoryShowcase.vue -->

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { Button } from '@/components/ui/button';
</script>

<template>
    <section class="container py-16 md:py-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div class="relative h-96 flex items-center justify-center text-center p-8 rounded-lg overflow-hidden bg-cover bg-center"
                style="background-image: url('surfboard.webp');">
                <div class="absolute inset-0 bg-black/60"></div>
                <div class="relative text-white">
                    <h3 class="text-4xl font-extrabold">Surfboards</h3>
                    <p class="mt-2 text-lg">From classic longboards to high-performance thrusters.</p>
                    <Button class="mt-6" size="lg" variant="secondary" as-child>
                        <RouterLink to="/products?category=surfboard">Shop Boards</RouterLink>
                    </Button>
                </div>
            </div>

            <div class="relative h-96 flex items-center justify-center text-center p-8 rounded-lg overflow-hidden bg-cover bg-center"
                style="background-image: url('surfboard.webp');">
                <div class="absolute inset-0 bg-black/60"></div>
                <div class="relative text-white">
                    <h3 class="text-4xl font-extrabold">Accessories</h3>
                    <p class="mt-2 text-lg">Wetsuits, fins, leashes, and all the essentials.</p>
                    <Button class="mt-6" size="lg" variant="secondary" as-child>
                        <RouterLink to="/products?category=accessory">Shop Gear</RouterLink>
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>
