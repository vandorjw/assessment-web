import axios from 'axios'
import store from '../store/store'

const API_URL = 'http://localhost:8000/'
const LOGIN_URL = API_URL + 'api-token-auth/'

export default {

  login (creds, redirect) {
    axios.post(LOGIN_URL, creds)
    .then((response) => {
      store.commit('authenticate', response.data.token)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  },

  logout () {
    store.commit('deauthenticate')
  },

  getAuthHeaderValue () {
    return 'Token ' + sessionStorage.getItem('dj_token')
  }
}
