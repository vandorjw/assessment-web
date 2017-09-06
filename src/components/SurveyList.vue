<template>
  <ul>
    <li></li>
  </ul>
</template>

<script>
import auth from '../service/auth'
import axios from 'axios'

export default {
  data () {
    return {
      surveys: [],
      error: []
    }
  },
  created () {
    axios.get('http://localhost:8000/api/survey/')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    getSurveyList: function () {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.login(credentials, 'redirect-url')
    }
  }
}
</script>
