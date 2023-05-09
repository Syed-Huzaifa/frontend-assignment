<template>
  <div>
    <h2>View/Update To-Do</h2>
    <form @submit.prevent="updateTodo()">
      <v-text-field v-model="todo.title" :value="todo.title" label="Title" type="text" />
      <v-textarea label="Description" :value="todo.description" v-model="todo.description" required></v-textarea>
      <v-btn color="black" type="submit">Create</v-btn>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const router = useRouter()

const todoId = route.params.id
// const todo = ref(null)

const todo = computed(() => {
  return store.getters['todos/todo']
})

console.log(todo.value);

const getTodo = (async () => {
  todo.value = await store.dispatch('todos/fetchTodo', todoId)
})

getTodo();

const updateTodo = async () => {
  store.dispatch('todos/updateTodo', todo.value).then(() => {
    router.push({ path: '/todos' })
  })
}
</script>
