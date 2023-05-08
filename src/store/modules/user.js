import axios from "axios";

export const user = {
    namespaced: true,
    state: {
        token: null,
        user: null,
    },
    mutations: {
        setToken(state, token) {
            console.log(state.token);
            state.token = token 
          },
          setUser(state, user) {
            state.user = user;
          },
          refreshToken (state, token) {
            state.token = token
          }
    },
    actions: {
        async register({ commit }, { email, password, confirmPassword }) {
            const response = await axios.post('http://3.232.244.22/api/register', {
              email,
              password,
              password_confirmation: confirmPassword
            })
            commit('setToken', response.data.token);
          },
          async login({ commit, state }, { email, password }) {
            const response = await axios.post('http://3.232.244.22/api/login', {
              email,
              password
            })
            console.log(state.token);
            commit('setToken', response.data.user.token);
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
          async refreshAccessToken({ commit, state }) {
            const response = await axios.post(`http://3.232.244.22/api/refresh-token/${state.token}`, {
              refresh_token: state.refreshToken
            })
            commit('setToken', response.data.access_token)
            commit('setRefreshToken', response.data.refresh_token)
          }
    },
    getters: {}
}