import axios from 'axios'

export const todos = {
  namespaced: true,
  state: () => ({
    todos: []
  }),
  mutations: {
    setTodos(state, todos) {
      state.todos = todos
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
    async fetchTodos({ commit, rootState }) {
      const response = await axios.get('http://3.232.244.22/api/items', {
        headers: {
          Authorization: `Bearer ${rootState.user.token}`
        }
      })
      commit('setTodos', response.data.items.data)
    },
    async fetchTodo({ commit, rootState }, id) {
      const response = await axios.get(`http://3.232.244.22/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${rootState.user.token}`
        }
      })
      console.log(response.data);
      commit('setSingleTodo', response.data)
    },
    async createTodo({ commit, rootState }, { title, description }) {
      const response = await axios.post(
        'http://3.232.244.22/api/item',
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${rootState.user.token}`
          }
        }
      )
      commit('addTodo', response.data)
    },
    async updateTodo({ commit, rootState }, { id, title, description }) {
      const response = await axios.put(
        `http://3.232.244.22/api/item/${id}`,
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${rootState.user.token}`
          }
        }
      )
      commit('updateTodo', response.data)
    },
    async deleteTodo({ commit, rootState }, id) {
      await axios.delete(`http://3.232.244.22/api/item/${id}`, {
        headers: {
          Authorization: `Bearer ${rootState.user.token}`
        }
      })
      commit('deleteTodo', id)
    }
  },
  getters: {
    todos({ todos }) {
      return todos
    }
  }
}
