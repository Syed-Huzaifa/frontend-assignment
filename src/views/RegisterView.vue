<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Email:</label>
      <input v-model="userEmail" type="email">
      <div v-if="v$?.email?.$error">
        <span v-if="v$?.email?.required">Email is required.</span>
        <span v-if="v$?.email?.email">Email is invalid.</span>
      </div>
    </div>
    <div>
      <label>Password:</label>
      <input v-model="userPassword" type="password">
      <div v-if="v$?.password?.$error">
        <span v-if="v$?.password?.required">Password is required.</span>
      </div>
    </div>
    <div>
      <label>Confirm Password:</label>
      <input v-model="confirmPassword" type="password">
      <div v-if="v$?.confirmPassword?.$error">
        <span v-if="v$?.confirmPassword?.required">Confirm Password is required.</span>
        <span v-if="v$?.confirmPassword?.sameAsPassword">Passwords do not match.</span>
      </div>
    </div>
    <button :disabled="v$?.$invalid">Submit</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'

export default {
  setup() {
    const userEmail = ref('')
    const userPassword = ref('')
    const confirmPassword = ref('')
    
    const rules = {
      email: { required, email },
      password: { required },
      confirmPassword: { required, sameAsPassword: sameAs(() => userPassword.value) }
    }

    const v$ = useVuelidate(rules, { userEmail, userPassword, confirmPassword })

    const submitForm = () => {
      v$.value.$touch()
      if (!v$.value.$error) {
        // form is valid, submit data to server
      }
    }

    return { userEmail, userPassword, confirmPassword, v$, submitForm }
  }
}
</script>
