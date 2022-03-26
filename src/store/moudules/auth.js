import { AUTH_LOGIN, AUTH_LOGOUT } from '../mutation-types'
import router from '../../router'
import axios from 'axios'
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
    async login({ commit }, payload) {
      try {
        const respone = await axios.post('http://localhost:3000/auth/login', {
          username: payload.email,
          password: payload.password
        })

        const user = respone.data.user
        const token = respone.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('user', user)

        router.push('/')
        commit(AUTH_LOGIN, user)
      } catch (e) {
        console.log('Error:', e)
      }
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
