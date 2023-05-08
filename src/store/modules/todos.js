import axios from "axios";
import { createNamespacedHelpers } from "vuex";


export const todos = {
    namespaced: true,
    state: () => ({
        todos: []
    }),
    mutations: {
        setTodos(todos, state) {
            state.todos = todos;
          },
          addTodo(todo, state) {
            state.todos.push(todo);
          },
          updateTodo (todo, state) {
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
          setSingleTodo (todo, state) {
            state.currentTodo = todo
          },
    },
    actions: {
        async fetchTodos({ commit, rootState }) {
            console.log(rootState)
            const response = await axios.get('http://3.232.244.22/api/items', {
              headers: {
                Authorization: `Bearer ${rootState.user.token}`
              }
            });
            console.log(response.data.items.data)
            commit('setTodos', response.data);
          },
          async fetchTodo({ commit, rootState }, id) {
            const response = await axios.get(`https://my-todo-api.com/todos/${id}`, {
              headers: {
                Authorization: `Bearer ${rootState.user.token}`
              }
            })
            commit('setSingleTodo', response.data)
          },
          async createTodo({ commit, rootState }, { title, description }) {
            const response = await axios.post('http://3.232.244.22/api/item', {
              title,
              description
            }, {
              headers: {
                Authorization: `Bearer ${rootState.user.token}`
              }
            });
            commit('addTodo', response.data);
          },
          async updateTodo({ commit, rootState }, { id, title, description }) {
            const response = await axios.put(`http://3.232.244.22/api/item/${id}`, {
              title,
              description
            }, {
              headers: {
                Authorization: `Bearer ${rootState.user.token}`
              }
            });
            commit('updateTodo', response.data);
          },
          async deleteTodo({ commit, rootState }, id) {
            await axios.delete(`http://3.232.244.22/api/item/${id}`, {
              headers: {
                Authorization: `Bearer ${rootState.user.token}`
              }
            });
            commit('deleteTodo', id);
          },
    },
    getters: {}
}

export const { mapActions: mapTodosActions, mapGetters: mapTpdosGetters } = createNamespacedHelpers('todos');