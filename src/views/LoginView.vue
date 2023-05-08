<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const loginUser = async () => {
    await store.dispatch('user/login', {
        email: email.value,
        password: password.value
    }).then(() => {
        router.push({ path: '/' })
    })
}
</script>



<template>
    <h1>Welcome to ToDo!</h1>
    <v-form @submit.prevent="loginUser">
            <v-text-field
                v-model="email"
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
                autocomplete="off"
            ></v-text-field>
            <v-text-field
                v-model="password"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                autocomplete="off"
            ></v-text-field>
        <v-btn class="mx-10" color="black" type="submit">Login</v-btn>
        <v-btn style="width: 25%" variant="outlined" color="black" @click="router.push({ path: '/register' })">Not a user? Register</v-btn>
    </v-form>
</template>