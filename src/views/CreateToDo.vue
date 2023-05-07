<template>
  <div>
    <h1>Create ToDo</h1>
    <form @submit.prevent="createTodo">
      <label for="title">Title</label>
      <input id="title" type="text" v-model="todo.title" required>
      <label for="description">Description</label>
      <textarea id="description" v-model="todo.description" required></textarea>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createTodo } from '../store/index'

export default {
  name: 'CreateToDo',
  setup() {
    const todo = ref({ title: '', description: '' })

    const createTodo = async () => {
      try {
        await createTodo(todo.value)
        router.push('/')
      } catch (error) {
        console.error(error)
      }
    }

    return {
      todo,
      createTodo
    }
  }
}
</script>
