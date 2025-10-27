<!-- banquet-web/src/components/layout/Main.vue -->

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Header />
        <main class="flex-grow">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>
