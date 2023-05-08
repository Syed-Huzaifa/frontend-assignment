<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const drawer = ref(false);
const group = ref(null);

const logout = async () => {
  await store.dispatch('user/logout').then(() => {
    router.push({ path: '/login' })
  })
}

watch(group, () => {
    drawer.value = false
})
</script>

<template>
    <div>
        <v-app style="width: 100%">
            <v-app-bar
                color="black"
                prominent
            >
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>Welcome to TODOs</v-toolbar-title>
                <v-spacer></v-spacer>
                <div v-if="store.state.user.token !== null">
                    <v-btn @click="logout">Logout</v-btn>    
                </div>
                <div v-else>
                    <v-btn @click="router.push({ path: '/login' })">Login</v-btn>
                    <v-btn @click="router.push({ path: '/register' })">Signup</v-btn>
                </div>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                location="left"
            >
                <v-list style="display: flex; flex-direction: column;">
                    <v-btn variant="text" class="mb-4">View All</v-btn>
                    <v-btn variant="text">Create Todo</v-btn>
                </v-list>
            </v-navigation-drawer>
        </v-app>
    </div>
</template>