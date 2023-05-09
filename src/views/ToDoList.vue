<template>
  <div>
    <h1>My ToDos</h1>
    <v-list lines="one">
      <v-list-item
        v-for="todo in getTodos"
        :key="todo.title"
        :title="todo.title"
        :subtitle="todo.description"
        >
        <v-btn color="black" @click.stop="deleteTodo(todo)">Delete</v-btn>
        <v-btn color="black" @click.stop="editTodo(todo)">Edit</v-btn>
        </v-list-item
      >
    </v-list>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-if="hasMore" ref="loadMore" @scroll="onScroll" class="load-more">Load more</div>
  </div>
  <v-btn color="black" variant="outlined" @click="onLoadMore">Load More</v-btn>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const todos = ref([])
const page = ref(1)
// const el = ref<HTMLElement>(null)

const getTodos = computed(() => {
  return store.getters['todos/todos']
})

const loadTodos = async () => {
  try {
    await store.dispatch('todos/fetchTodos', page.value)
  } catch (error) {
    console.error(error)
  }
}

const deleteTodo = async (todo) => {
  const confirmation = window.confirm(`Are you sure you want to delete "${todo.title}"?`)
  if (!confirmation) return
  try {
    await store.dispatch('todos/deleteTodo', todo.id)
    todos.value = todos.value.filter((t) => t.id !== todo.id)
  } catch (error) {
    console.error(error)
  }
}

const editTodo = async (todo) => {
  router.push(`/todos/${todo.id}`)
}
function onLoadMore() {
  page.value++
  store.dispatch('todos/fetchTodos', page.value)
}

onMounted(() => {
  loadTodos()
})
</script>
