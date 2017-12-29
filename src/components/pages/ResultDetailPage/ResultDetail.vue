<template>
  <div>
    <div v-if="result">
      <pre>name: {{ result.survey.name }}</pre>
      <pre>description: {{ result.survey.description }}</pre>
      <pre>is_active: {{ result.survey.is_active }}</pre>
      <pre>is_private: {{ result.survey.is_private }}</pre>
      <pre>is_admin: {{ result.survey.is_admin }}</pre>
      <pre>in_users: {{ result.survey.in_users }}</pre>
      <pre>start_date_time: {{ result.survey.start_date_time }}</pre>
      <pre>end_date_time: {{ result.survey.end_date_time }}</pre>

    </div>
    <div v-else>
      <p>Either survey does not exist or you are not authorized to see it</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data () {
    return {
      survey: null,
      error: []
    }
  },
  created () {
    this.getSurveyDetail()
  },
  methods: {
    startSurvey () {
      const url = process.env.API_HOST + '/api/result/create/'

      let requestHeaders = {
        'Accept-Language': this.$store.state.language
      }

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      }

      axios.post(url, {'survey': this.id}, {
        headers: requestHeaders
      })
      .then((response) => {
        this.$router.push({name: 'Hello'})
      })
      .catch((error) => {
        if (error.response) {
          this.error = error.response.data
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
    },
    getSurveyDetail () {
      const url = process.env.API_HOST + '/api/survey/' + this.id + '/'

      let requestHeaders = {
        'Accept-Language': this.$store.state.language
      }

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      }

      axios.get(url, {
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
