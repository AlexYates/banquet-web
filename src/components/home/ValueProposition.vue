<!-- banquet-web/src/components/home/ValueProposition.vue -->

<script setup lang="ts">
import { HeartHandshake, ShieldCheck, Waves } from 'lucide-vue-next';
</script>

<template>
    <section class="py-16 md:py-24">
        <div class="container">
            <div class="text-center">
                <h2 class="text-3xl font-bold tracking-tight">Ride With Confidence</h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    We're more than a store. We're a promise of quality and passion for the sport.
                </p>
            </div>
            <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div class="flex flex-col items-center">
                    <HeartHandshake class="h-10 w-10 text-primary" />
                    <h3 class="mt-4 text-xl font-semibold">Authentically Run</h3>
                    <p class="mt-2 text-muted-foreground">
                        Every product is tested and approved by surfers who live and breathe the sport.
                    </p>
                </div>
                <div class="flex flex-col items-center">
                    <ShieldCheck class="h-10 w-10 text-primary" />
                    <h3 class="mt-4 text-xl font-semibold">Quality Guaranteed</h3>
                    <p class="mt-2 text-muted-foreground">
                        We stand by our gear with a commitment to durability and performance you can trust.
                    </p>
                </div>
                <div class="flex flex-col items-center">
                    <Waves class="h-10 w-10 text-primary" />
                    <h3 class="mt-4 text-xl font-semibold">Ocean First</h3>
                    <p class="mt-2 text-muted-foreground">
                        We champion eco-friendly products and support initiatives to protect our oceans.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
