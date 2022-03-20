import { AUTH_LOGIN, AUTH_LOGOUT } from '../mutation-types'
export default {
  namespaced: true,
  state: () => ({
    user: null,
    isLogin: false
  }),
  mutations: {
    [AUTH_LOGIN] (state) {
      state.isLogin = true
    },
    [AUTH_LOGOUT] (state) {
      state.isLogin = false
    }
  },
  actions: {
    login({ commit }, payload) {
      commit(AUTH_LOGIN)
    },
    logout({ commit }) {
      commit(AUTH_LOGOUT)
    }
  },
  getters: {}
}
