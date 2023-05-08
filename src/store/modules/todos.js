import axios from "axios";
import { createNamespacedHelpers } from "vuex";

export const todos = {
    namespaced: true,
    state: () => ({
        todos: []
    }),
    mutations: {
        setTodos(todos) {
            state.todos = todos;
          },
          addTodo(todo) {
            state.todos.push(todo);
          },
          updateTodo (todo) {
            const index = state.todos.findIndex(t => t.id === todo.id);
            if (index !== -1) {
              state.todos.splice(index, 1, todo);
            }
          },
          deleteTodo (id) {
            const index = state.todos.findIndex(t => t.id === id);
            if (index !== -1) {
              state.todos.splice(index, 1);
            }
          },
          setSingleTodo (state, todo) {
            state.currentTodo = todo
          },
    },
    actions: {
        async fetchTodos({ commit, state }) {
            const response = await axios.get('http://3.232.244.22/api/items', {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            });
            commit('setTodos', response.data);
          },
          async fetchTodo({ commit, state }, id) {
            const response = await axios.get(`https://my-todo-api.com/todos/${id}`, {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            })
            commit('setSingleTodo', response.data)
          },
          async createTodo({ commit, state }, { title, description }) {
            const response = await axios.post('http://3.232.244.22/api/item', {
              title,
              description
            }, {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            });
            commit('addTodo', response.data);
          },
          async updateTodo({ commit, state }, { id, title, description }) {
            const response = await axios.put(`http://3.232.244.22/api/item/${id}`, {
              title,
              description
            }, {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            });
            commit('updateTodo', response.data);
          },
          async deleteTodo({ commit, state }, id) {
            await axios.delete(`http://3.232.244.22/api/item/${id}`, {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            });
            commit('deleteTodo', id);
          },
    },
    getters: {}
}

export const { mapActions: mapTodosActions, mapGetters: mapTpdosGetters } = createNamespacedHelpers('todos');