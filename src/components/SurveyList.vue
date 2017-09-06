<template>
  <div>
    <ul>
      <li v-for="survey in surveys">
      <router-link :to="{ name: 'SurveyDetail', params: { id: survey._uid }}">{{ survey.translations.en.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import auth from '../service/auth'

export default {
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
      const url = 'http://localhost:8000/api/survey/'
      const token = auth.getAuthHeaderValue()
      if (auth.isAuthenticated()) {
        axios.get(url, {
          headers: {'Authorization': token}
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
      } else {
        axios.get(url)
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
}
</script>
