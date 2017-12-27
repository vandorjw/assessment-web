<template>
  <div>
    <div v-if="this.$store.state.authenticated==true">
      <v-surveyform v-on:formSubmission="formSubmitAction"></v-surveyform>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Login'}">please log in</router-link>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

import SurveyForm from '../../../components/blocks/SurveyFormBlock/SurveyForm'

export default {
  components: {
    'v-surveyform': SurveyForm
  },
  data () {
    return {
      error: []
    }
  },
  methods: {
    formSubmitAction: function (formData) {
      const url = process.env.API_HOST + '/api/survey/create/'

      let requestHeaders = {
        'Accept-Language': this.$store.state.language
      }

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      } else {
        console.log('Auth Token not set!')
      }

      axios.post(url, formData, {
        headers: requestHeaders
      })
      .then((response) => {
        console.log(response.data)
        console.log(response.status)
        this.$router.push({name: 'SurveyList'})
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
