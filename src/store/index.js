import { reactive } from 'vue';
import axios from 'axios';

const state = reactive({
  token: null,
  user: null,
  todos: []
});

const mutations = {
  setToken(token) {
    state.token = token;
  },
  setUser(user) {
    state.user = user;
  },
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
  refreshToken (state, token) {
    state.token = token
  }
};

const actions = {
  async register({ commit }, { email, password, confirmPassword }) {
    const response = await axios.post('http://3.232.244.22/api/register', {
      email,
      password,
      password_confirmation: confirmPassword
    });
    commit('setToken', response.data.token);
  },
  async login({ commit }, { email, password }) {
    const response = await axios.post('http://3.232.244.22/api/login', {
      email,
      password
    });
    commit('setToken', response.data.token);
    commit('setUser', response.data.user);
  },
  async logout({ commit, state }) {
    if (state.token) {
      await axios.post('http://3.232.244.22/api/logout', null, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
    }
    commit('setToken', null);
    commit('setUser', null);
    commit('setTodos', []);
  },
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
  async refreshAccessToken({ commit, state }) {
    const response = await axios.post(`http://3.232.244.22/api/refresh-token/${state.token}`, {
      refresh_token: state.refreshToken
    })
    commit('setToken', response.data.access_token)
    commit('setRefreshToken', response.data.refresh_token)
  }
};

export default {
  state,
  mutations,
  actions
};
