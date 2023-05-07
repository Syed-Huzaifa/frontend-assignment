<script setup>
import { useStore } from 'vuex';

const store = useStore();

const logout = () => {
  store.dispatch('logoutUser')
}
</script>

<template>
    <div>
        <v-app>
            <v-app-bar>
                <v-app-bar-title>Welcome to TODOs</v-app-bar-title>
                <v-btn @click="logout">Logout</v-btn>
            </v-app-bar>
        </v-app>
    </div>
</template>