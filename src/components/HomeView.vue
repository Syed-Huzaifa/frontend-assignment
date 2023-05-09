<template>
    <v-card
        class="mx-auto"
        max-width="344"
        variant="outlined"
        width="500"
    >
    <v-card-title>
        <div class="text-overline mb-1">
            Welcome
        </div>
    </v-card-title>
    <v-card-text>
        <div>
            <div class="text-h6 mb-1">
                Get started with your day!
            </div>
            <div class="text-caption">Click below to Login or Register and get started!</div>
        </div>
    </v-card-text>
        <v-card-actions>
        <v-btn @click="router.push({ path: '/login' })" variant="outlined">
            Login
        </v-btn>
        <v-btn @click="router.push({ path: '/register' })" variant="outlined">
            Register
        </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>