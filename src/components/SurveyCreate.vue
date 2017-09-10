<template>
  <div v-if="this.$store.state.authenticated==true">
    <form v-on:submit.prevent="createSurvey" method="post">
      <input type="text" name="name" placeholder="Survey Name">
      <input type="submit" value="submit">
    </form>
  </div>
  <div v-else>
    <router-link :to="{ name: 'Login'}">please log in</router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      survey: null,
      error: []
    }
  },

  methods: {
    createSurvey () {
      const url = 'http://localhost:8000/api/survey/create/'

      let requestHeaders = {}

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      }

      axios.post(url, {
        headers: requestHeaders
      })
      .then((response) => {
        this.survey = response.data
      })
      .catch((error) => {
        if (error.response) {
          this.error = error.response.data
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
    }
  }
}
</script>
