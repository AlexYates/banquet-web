<!-- banquet-web/src/components/layout/Footer.vue -->

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>

<template>
    <footer class="border-t">
        <div class="container grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            <div>
                <h3 class="text-lg font-bold">Banquet Surf Co.</h3>
                <p class="text-muted-foreground mt-2">Ride the tide with the best gear.</p>
            </div>
            <div>
                <h3 class="font-semibold">Quick Links</h3>
                <ul class="mt-4 space-y-2">
                    <li><a href="#" class="text-muted-foreground hover:text-primary-foreground">About Us</a></li>
                    <li><a href="#" class="text-muted-foreground hover:text-primary-foreground">Contact</a></li>
                    <li><a href="#" class="text-muted-foreground hover:text-primary-foreground">FAQ</a></li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold">Join the Newsletter</h3>
                <p class="text-muted-foreground mt-2">Get the latest deals and drops straight to your inbox.</p>
                <form class="mt-4 flex gap-2">
                    <Input type="email" placeholder="Enter your email" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
        </div>
        <div class="border-t py-4">
            <p class="text-center text-sm text-muted-foreground">
                &copy; {{ new Date().getFullYear() }} Banquet Surf Co. All Rights Reserved.
            </p>
        </div>
    </footer>
</template>
