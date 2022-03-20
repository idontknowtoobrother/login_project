import { AUTH_LOGIN, AUTH_LOGOUT } from '../mutation-types'
export default {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    [AUTH_LOGIN] (state, payload) {
        state.user = payload
        // state.isLogin = true
    },
    [AUTH_LOGOUT] (state) {
      state.user = null
    }
  },
  actions: {
    login({ commit }, payload) {
        console.log(payload)
        // if correct
        const user = {
            name: 'hex',
            email: payload.email
        }
      commit(AUTH_LOGIN, user)
    },
    logout({ commit }) {
      commit(AUTH_LOGOUT)
    }
  },
  getters: {
      isLogin(state, getters) {
        return state.user != null
      }
  }
}
