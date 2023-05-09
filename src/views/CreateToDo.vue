<template>
  <div>
    <v-alert
      v-if="created"
      color="success"
      icon="$success"
      title="Alert title"
      text="Todo created!"
    ></v-alert>
    <h1>Create ToDo</h1>
    <form @submit.prevent="createTodo">
      <v-text-field v-model="title" label="Title" type="text" />
      <v-textarea label="Description" v-model="description" required></v-textarea>
      <v-btn color="black" type="submit">Create</v-btn>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const title = ref('')
const description = ref('')
const created = ref(false)

const createTodo = async () => {
  try {
    await store
      .dispatch('todos/createTodo', {
        title: title.value,
        description: description.value
      })
      .then(() => {
        created.value = true
        router.push({ path: '/todos' })
      })
  } catch (error) {
    console.error(error)
  }
}
</script>
