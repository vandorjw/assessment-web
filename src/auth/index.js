import axios from 'axios'

const API_URL = 'http://localhost:8000/'
const LOGIN_URL = API_URL + 'api-token-auth/'

export default {

  user: {
    authenticated: false
  },

  login (creds, redirect) {
    axios.post(LOGIN_URL, creds).then(function (response) {
      console.log(response)
      localStorage.setItem('dj_token', response.data.token)
    }).catch(function (error) {
      console.log(error)
    })
  },

  logout () {
    localStorage.removeItem('dj_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var token = localStorage.getItem('dj_token')
    if (token) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Token ' + localStorage.getItem('dj_token')
    }
  }
}
