<template>
  <div>
    <v-header></v-header>
    <div v-if="this.$store.state.authenticated === true">
      <router-link :to="{ name: 'SurveyCreate'}">create</router-link>
    </div>
    <ul>
      <li v-for="survey in surveys">
        <router-link :to="{ name: 'SurveyDetail', params: { id: survey._uid }}">{{ survey.translations.en.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header'

export default {
  components: {
    'v-header': Header
  },
  data () {
    return {
      surveys: [],
      error: []
    }
  },
  created () {
    this.getSurveyList()
  },
  methods: {
    getSurveyList () {
      const url = process.env.API_HOST + '/api/survey/'

      let requestHeaders = {}

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      } else {
        console.log('Not updating requestHeaders')
      }

      axios.get(url, {
        headers: requestHeaders
      })
      .then((response) => {
        this.surveys = response.data
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
