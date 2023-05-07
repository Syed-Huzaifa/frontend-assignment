<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'Register',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      ...mapActions(['register']),
      registerUser() {
        this.register({ email: this.email, password: this.password, confirmPassword: this.confirmPassword })
          .then(() => {
            alert('Registration successful. Check your email for verification.')
          })
          .catch(error => {
            alert('Registration failed. ' + error.response.data.message)
          })
      }
    }
  }
  </script>
  