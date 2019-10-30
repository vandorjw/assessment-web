<template>
  <div>
    <ul>
      <li
        v-for="survey in surveys"
        :key="survey._uid"
      >
        <router-link
          :survey="survey"
          :to="{ name: 'SurveyDetail', params: { id: survey._uid }}"
        >
          {{ survey.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

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
      const url = process.env.API_HOST + '/api/survey/'

      let requestHeaders = {
        'Accept-Language': this.$store.state.language
      }

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
