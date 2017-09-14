import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    authenticated: false,
    token: null,
    language: 'en'
  },
  getters: {
    authenticated: state => state.authenticated,
    token: state => state.token,
    language: state => state.language
  },
  mutations: {
    authenticate (state, payload) {
      state.authenticated = true
      state.token = payload
    },
    deauthenticate (state) {
      state.authenticated = false
      state.token = null
    },
    setlanguage (state, payload) {
      state.language = payload
    }
  },
  actions: {
    authenticate (context) {
      context.commit('authenticate')
    },
    deauthenticate (context) {
      context.commit('deauthenticate')
    },
    setlanguage (context) {
      context.commit('setlanguage')
    }
  }
})
