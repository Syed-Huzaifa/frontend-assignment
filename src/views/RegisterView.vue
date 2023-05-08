<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field
      v-model="userEmail"
      label="Email"
      :rules="emailRules"
      required
    />
    <v-text-field
      v-model="userPassword"
      label="Password"
      :rules="passwordRules"
      type="password"
      required
    />
    <v-text-field
      v-model="confirmPassword"
      label="Confirm Password"
      :rules="confirmPasswordRules"
      type="password"
      required
    />
    <v-btn color="black" :disabled="v$?.invalid" type="submit">Register</v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter();

const userEmail = ref('')
const userPassword = ref('')
const confirmPassword = ref('')

const rules = {
  email: { required, email },
  password: { required },
  confirmPassword: { required, sameAsPassword: sameAs(() => userPassword.value) }
}

const v$ = useVuelidate(rules, { userEmail, userPassword, confirmPassword })

const submitForm = async () => {
  v$.value.$touch()
  if (!!v$.value.$error) {
    await store.dispatch('user/register', {
      email: userEmail.value,
      password: userPassword.value,
      confirmPassword: confirmPassword.value
    }).then(() => {
      router.push({ path: '/login' })
    })
  }
}

const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => /^(?=.{8,})(?!.*(\d)\1{1})(?!.*([a-zA-Z])\2{1})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/.test(v) || 'Password should contain at least 8 characters, one number, one uppercase letter, one lowercase letter, and one special character'
]


const confirmPasswordRules = [
  (v) => !!v || 'Confirm Password is required',
  (v) => v === userPassword.value || 'Passwords do not match',
]
</script>
