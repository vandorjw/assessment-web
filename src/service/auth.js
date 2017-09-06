import axios from 'axios'

const API_URL = 'http://localhost:8000/'
const LOGIN_URL = API_URL + 'api-token-auth/'

export default {

  user: {
    authenticated: false
  },

  login (creds, redirect) {
    // the advantage of arrow function
    // with the arrow function, I maintain the same 'this' of my parent.
    // Another way of saying, usually when I define a new `function`
    // I also get a new 'this'

    // fetch.post();

    axios.post(LOGIN_URL, creds).then(function (response) {
      console.log(response)
      // I should not write directly into the session storage.
      // I should create a storage service, that way when I
      // decide to change my backend store, I have an easier time
      // and won't need to edit thousands of files.
      sessionStorage.setItem('dj_token', response.data.token)
    }).catch(function (error) {
      console.log(error)
    })
  },

  logout () {
    sessionStorage.removeItem('dj_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var token = sessionStorage.getItem('dj_token')
    if (token) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeaderValue () {
    return 'Token ' + sessionStorage.getItem('dj_token')
  }
}
