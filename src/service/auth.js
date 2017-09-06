import axios from 'axios'

const API_URL = 'http://localhost:8000/'
const LOGIN_URL = API_URL + 'api-token-auth/'

export default {

  user: {
    authenticated: false
  },

  login (creds, redirect) {
    axios.post(LOGIN_URL, creds)
    .then((response) => {
      sessionStorage.setItem('dj_token', response.data.token)
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
    sessionStorage.removeItem('dj_token')
    this.user.authenticated = false
  },

  isAuthenticated () {
    var token = sessionStorage.getItem('dj_token')
    if (token) {
      this.user.authenticated = true
      return true
    } else {
      this.user.authenticated = false
      return false
    }
  },

  getAuthHeaderValue () {
    return 'Token ' + sessionStorage.getItem('dj_token')
  }
}
