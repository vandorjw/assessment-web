import axios from 'axios'
import store from '../store/store'
import router from '../router'

const API_URL = process.env.API_HOST
const LOGIN_URL = API_URL + '/rest-auth/login/'
const LOGOUT_URL = API_URL + '/rest-auth/logout/'
const REGISTRATION_URL = API_URL + '/rest-auth/registration/'

export default {
  registration (creds) {
    axios.post(REGISTRATION_URL, creds)
    .then((response) => {
      store.commit('authenticate', response.data.key)
      router.push({name: 'Home'})
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
      }
    })
  },

  login (creds) {
    axios.post(LOGIN_URL, creds)
    .then((response) => {
      store.commit('authenticate', response.data.key)
      router.push({name: 'Home'})
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
      router.push({name: 'Home'})
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
      }
    })
  }
}
