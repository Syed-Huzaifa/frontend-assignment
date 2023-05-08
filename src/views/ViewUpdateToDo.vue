<template>
    <div>
      <h2>View/Update To-Do</h2>
      <form @submit.prevent="updateTodo">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="todo.title" required>
  
        <label for="description">Description:</label>
        <textarea id="description" v-model="todo.description" required></textarea>
  
        <button type="submit">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  // import { getTodo, updateTodo } from '../store/index'
  
  export default {
    setup() {
      const route = useRoute()
      const todoId = route.params.id
      const todo = ref(null)
  
      watchEffect(async () => {
        todo.value = await getTodo(todoId)
      })
  
      const updateTodo = async () => {
        // await updateTodo(todo.value)
        // Redirect to ToDo list screen
      }
  
      return {
        todo,
        updateTodo
      }
    }
  }
  </script>
  