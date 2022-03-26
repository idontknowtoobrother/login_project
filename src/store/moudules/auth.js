import { AUTH_LOGIN, AUTH_LOGOUT } from '../mutation-types'
import router from '../../router'
import api from '../../services/api'
import { login } from '../../services/auth'

export default {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    [AUTH_LOGIN] (state, payload) {
        state.user = JSON.parse(localStorage.getItem('user'))
    },
    [AUTH_LOGOUT] (state) {
      state.user = null
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const respone = await login(payload.email, payload.password)

        const user = respone.data.user
        const token = respone.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        router.push('/')
        commit(AUTH_LOGIN, user)
      } catch (e) {
        console.log('Error:', e)
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      commit(AUTH_LOGOUT)
    }
  },
  getters: {
      isLogin(state, getters) {
        return state.user != null
      }
  }
}
