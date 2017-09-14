<template>
  <div>
    <v-header></v-header>
    <div v-if="this.$store.state.authenticated==true">
      <form v-on:submit.prevent="createSurvey" method="post">
        <label for="name">Survey Name</label>
        <input type="text" name="name" v-model="survey.translations.en.name">
        <label for="description">Survey Description</label>
        <input type="text" name="description" v-model="survey.translations.en.description">
        <label for="is_active">publish</label>
        <input type="checkbox" name="is_active" checked v-model="survey.is_active">
        <label for="start_date_time">date of publication</label>
        <input type="datetime-local" name="start_date_time" v-model="survey.start_date_time">
        <input type="submit" value="submit">
      </form>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Login'}">please log in</router-link>
    </div>
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
      error: [],
      survey: {
        translations: {
          en: {
            name: 'Hello World2',
            description: 'How do I say; "Hello world", in English?'
          }
        },
        is_active: true,
        start_date_time: '2017-07-31T05:09:38.460803Z'
      }
    }
  },
  methods: {
    createSurvey () {
      const url = process.env.API_HOST + '/api/survey/create/'

      let requestHeaders = {
        'Accept-Language': this.$store.state.language
      }

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      } else {
        console.log('Auth Token not set!')
      }

      axios.post(url, this.survey, {
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
