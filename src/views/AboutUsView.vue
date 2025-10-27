<!-- banquet-web/src/views/AboutUsView.vue -->

<script setup lang="ts">
import { Waves, HeartHandshake, ShieldCheck } from 'lucide-vue-next'
</script>

<template>
    <div>
        <!-- Hero Section -->
        <section class="relative h-[50vh] bg-cover bg-center"
            style="background-image: url('http://localhost:3000/images/about-hero.jpg');">
            <div class="absolute inset-0 bg-secondary flex items-center justify-center">
                <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-center text-primary">
                    More Than Just a Shop.
                    <br>
                    We Are Surfers.
                </h1>
            </div>
        </section>

        <div class="container py-16 md:py-24">
            <!-- Our Story Section -->
            <section class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold tracking-tight">Our Story</h2>
                <p class="mt-6 text-lg leading-relaxed text-muted-foreground">
                    Banquet Surf Co. was born from a simple idea shared between friends on a windswept coastline: the
                    gear we use should be as dedicated and passionate as the people who use it. We were tired of
                    equipment that didn't last and brands that felt disconnected from the soul of surfing.
                </p>
                <p class="mt-4 text-lg leading-relaxed text-muted-foreground">
                    We believe surfing is a feast for the senses—a banquet of experiences, from the pre-dawn patrol to
                    the sunset glass-off. Our mission is to provide you with the highest quality, most reliable gear so
                    you can focus on what truly matters: your next wave. We are a collective of surfers, shapers, and
                    ocean lovers, and this is our offering to the community we cherish.
                </p>
            </section>

            <!-- Our Values Section -->
            <section class="mt-20">
                <div class="text-center">
                    <h2 class="text-3xl font-bold tracking-tight">What We Stand For</h2>
                    <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Our principles guide every decision we make, from the products we stock to the way we interact
                        with our community.
                    </p>
                </div>
                <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary mb-4">
                            <HeartHandshake class="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h3 class="text-xl font-semibold">Passion & Authenticity</h3>
                        <p class="mt-2 text-muted-foreground">
                            We're not just retailers; we're surfers, first and foremost. We test our gear, share our
                            knowledge, and are deeply invested in the culture.
                        </p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary mb-4">
                            <ShieldCheck class="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h3 class="text-xl font-semibold">Curated Quality</h3>
                        <p class="mt-2 text-muted-foreground">
                            Every item in our shop is hand-picked and vetted for quality, performance, and durability.
                            If we wouldn't use it ourselves, we don't sell it.
                        </p>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary mb-4">
                            <Waves class="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h3 class="text-xl font-semibold">Ocean Stewardship</h3>
                        <p class="mt-2 text-muted-foreground">
                            Our playground is the ocean, and we're committed to protecting it. We prioritize
                            eco-friendly products and support initiatives that preserve our coastlines.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
