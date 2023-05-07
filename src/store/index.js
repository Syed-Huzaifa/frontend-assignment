import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
    authenticated: false,
  },
  mutations: {
    LOGIN(state) {
        state.authenticated = true
    },
    LOGOUT(state) {
      state.authenticated = false
    }
  },
  actions: {
    loginUser({ commit }) {
      commit("LOGIN")
      console.log(this.state.authenticated)
    },
    logoutUser({ commit }) {
      commit("LOGOUT")
      console.log(this.state.authenticated)
    }
  }
});

export default store;