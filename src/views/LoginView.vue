<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const email = ref('');
const password = ref('');
const store = useStore();

const registers = async () => {
    await store.dispatch('user/login', {
        email: email.value,
        password: password.value
    })
}

console.log(store.state.user);
</script>



<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>Login form</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field
                                            v-model="email"
                                            prepend-icon="person"
                                            name="login"
                                            label="Login"
                                            type="text"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="password"
                                            id="password"
                                            prepend-icon="lock"
                                            name="password"
                                            label="Password"
                                            type="password"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="registers">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>