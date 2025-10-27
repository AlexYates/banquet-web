<!-- banquet-web/src/components/home/SiteHero.vue -->

<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import { Button } from '@/components/ui/button';
</script>

<template>
    <section class="container text-center py-20 md:py-32">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tighter">
            Catch Your Perfect Wave
        </h1>
        <p class="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            From high-performance shortboards to classic longboards and essential accessories, we've got everything you
            need to hit the water.
        </p>
        <div class="mt-8">
            <Button size="lg" as-child>
                <RouterLink to="/products">
                    Shop All Products
                </RouterLink>
            </Button>
        </div>
    </section>
</template>
