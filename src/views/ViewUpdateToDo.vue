<template>
  <div>
    <h2>View/Update To-Do</h2>
    {{ todo }}
    <!-- <form @submit.prevent="createTodo">
      <v-text-field v-model="title" :value="todo.title" label="Title" type="text" />
      <v-textarea label="Description" :value="todo.description" v-model="description" required></v-textarea>
      <v-btn color="black" type="submit">Create</v-btn>
    </form> -->
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const todoId = route.params.id
const todo = ref(null)

const getTodo = (async () => {
  todo.value = await store.dispatch('todos/fetchTodo', { id: todoId })
})

getTodo()

// todo.value = await store.dispatch('todos/fetchTodo', { id: todoId })
console.log(todoId);

const updateTodo = async () => {
  // await updateTodo(todo.value)
  // Redirect to ToDo list screen
}
</script>
