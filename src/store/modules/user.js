import axios from 'axios'

export const user = {
  namespaced: true,
  state: {
    token: null,
    user: null,
    authenticated: false,
    accessTokenRefresher: null
  },
  mutations: {
    initializeStore(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.authenticated = true;
        const tokenRefresher = setInterval(async () => {
          const token = localStorage.getItem('token');
          const response = await axios.post(`http://3.232.244.22/api/refresh-token/${token}`)
          localStorage.setItem('token', response.data.access_token)
        }, 3600 * 1000);
        state.accessTokenRefresher = tokenRefresher
      }
    },
    setToken(state, token) {
      if (!token) {
        localStorage.removeItem('token')
      } else {
        localStorage.setItem('token', token)
      }
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    refreshToken(state, token) {
      state.token = token
    },
    accessTokenRefresher(state, interval) {
      state.accessTokenRefresher = interval;
    }
  },
  actions: {
    async register({ commit }, { email, password, confirmPassword }) {
      const response = await axios.post('http://3.232.244.22/api/register', {
        email,
        password,
        password_confirmation: confirmPassword
      })
      commit('setToken', response.data.token)
    },
    async login({ commit, state }, { email, password }) {
      const response = await axios.post('http://3.232.244.22/api/login', {
        email,
        password
      })
      state.authenticated = true
      commit('setToken', response.data.user.token)
      commit('setUser', response.data.user)
      const tokenRefresher = setInterval(async () => {
        const response = await axios.post(`http://3.232.244.22/api/refresh-token/${localStorage.getItem('token')}`)
        commit('setToken', response.data.access_token)
      }, 3600 * 1000);
      commit('accessTokenRefresher', tokenRefresher)
    },
    async logout({ commit, state }) {
      if (state.token) {
        await axios.post('http://3.232.244.22/api/logout', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(() => {
          state.authenticated = false
        })
      }
      commit('setToken', null)
      commit('setUser', null)
      clearInterval(state.accessTokenRefresher)
    }
  },
  getters: {}
}