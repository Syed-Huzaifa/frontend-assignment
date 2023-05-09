import axios from 'axios'

export const todos = {
  namespaced: true,
  state: () => ({
    todos: [],
    currentTodo: null
  }),
  mutations: {
    setTodos(state, todos) {
      let todosRef = [];
      if (state.todos.length) {
        todosRef = [
          ...todosRef,
          ...state.todos
        ]
      }
      if (todos.length) {
        todosRef = [
          ...todosRef,
          ...todos
        ]
      }
      state.todos = todosRef
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex((t) => t.id === todo.id)
      if (index !== -1) {
        state.todos.splice(index, 1, todo)
      }
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((t) => t.id === id)
      if (index !== -1) {
        state.todos.splice(index, 1)
      }
    },
    setSingleTodo(state, todo) {
      state.currentTodo = todo
    }
  },
  actions: {
    async fetchTodos({ commit }, page) {
      const response = await axios.get(`http://3.232.244.22/api/items?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      commit('setTodos', response.data.items.data)
    },
    async fetchTodo({ commit }, id) {
      const response = await axios.get(`http://3.232.244.22/api/item/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      commit('setSingleTodo', response.data.item)
    },
    async createTodo({ commit }, { title, description }) {
      const response = await axios.post(
        'http://3.232.244.22/api/item',
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      commit('addTodo', response.data)
    },
    async updateTodo({ commit }, { id, title, description }) {
      const response = await axios.put(
        `http://3.232.244.22/api/item/${id}`,
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      commit('updateTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
      await axios.delete(`http://3.232.244.22/api/item/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      commit('deleteTodo', id)
    }
  },
  getters: {
    todos({ todos }) {
      return todos
    },
    todo({ currentTodo }) {
      return currentTodo
    }
  }
}
