<!-- banquet-web/src/views/HomeView.vue -->

<script setup lang="ts">
import FeaturedProducts from '@/components/home/FeaturedProducts.vue';
import CategoryShowcase from '@/components/home/CategoryShowcase.vue';
import ValueProposition from '@/components/home/ValueProposition.vue';
import NewsletterCallout from '@/components/home/NewsletterCallout.vue';
import SiteHero from '@/components/home/SiteHero.vue';
</script>

<template>
    <SiteHero />
    <FeaturedProducts />
    <CategoryShowcase />
    <ValueProposition />
    <NewsletterCallout />
</template>
