<template>
  <NavBar />
  <div>
    <h1>My ToDos</h1>
    <v-list lines="one">
      <v-list-item
        v-for="todo in getTodos"
        :key="todo.title"
        :title="todo.title"
        :subtitle="todo.description"
      ><v-btn color="black" @click.stop="deleteTodo(todo)">Delete</v-btn></v-list-item>
    </v-list>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-if="hasMore" ref="loadMore" @scroll="onScroll" class="load-more">Load more</div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue';
import { ref, onMounted } from 'vue';
import { useStore, mapGetters } from 'vuex'

const store = useStore();

const todos = ref([])
const searchQuery = ref('')
const page = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)

const getTodos = store.getters['todos/todos'];

console.log('get todos', getTodos)

const loadTodos = async () => {
  isLoading.value = true
  try {
    const data = await store.dispatch('todos/fetchTodos');
    todos.value = [...todos.value, ...data.todos]
    hasMore.value = data.hasMore
    page.value++
  } catch (error) {
    console.error(error)
  }
  isLoading.value = false
}

const deleteTodo = async (todo) => {
  const confirmation = window.confirm(`Are you sure you want to delete "${todo.title}"?`)
  if (!confirmation) return
  try {
    // console.log('todo', todo.id)
    await store.dispatch('todos/deleteTodo', { id: todo.id });
    todos.value = todos.value.filter((t) => t.id !== todo.id)
  } catch (error) {
    console.error(error)
  }
}

const viewTodo = (todo) => {
  router.push(`/todos/${todo.id}`)
}

const onScroll = () => {
  const element = refs.loadMore
  const { scrollTop, clientHeight, scrollHeight } = element
  if (scrollTop + clientHeight >= scrollHeight && !isLoading.value && hasMore.value) {
    // loadTodos()
  }
}

onMounted(() => {
  loadTodos()
})
</script>
