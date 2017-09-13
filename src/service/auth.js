import axios from 'axios'
import store from '../store/store'

const API_URL = process.env.API_HOST
const LOGIN_URL = API_URL + '/rest-auth/login/'
const LOGOUT_URL = API_URL + '/rest-auth/logout/'
const REGISTRATION_URL = API_URL + '/rest-auth/registration/'

export default {
  registration (creds, redirect) {
    axios.post(REGISTRATION_URL, creds)
    .then((response) => {
      store.commit('authenticate', response.data.key)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
      }
    })
  },

  login (creds, redirect) {
    axios.post(LOGIN_URL, creds)
    .then((response) => {
      store.commit('authenticate', response.data.key)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
      }
    })
  },

  logout () {
    axios.post(LOGOUT_URL)
    .then((response) => {
      store.commit('deauthenticate')
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
      }
    })
  },

  getAuthHeaderValue () {
    return 'Token ' + sessionStorage.getItem('dj_token')
  }
}
