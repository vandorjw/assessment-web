<template>
  <div>
    <div v-if="survey">
      <pre>name: {{ survey.name }}</pre>
      <pre>description: {{ survey.description }}</pre>
      <pre>is_active: {{ survey.is_active }}</pre>
      <pre>is_private: {{ survey.is_private }}</pre>
      <pre>is_admin: {{ survey.is_admin }}</pre>
      <pre>in_users: {{ survey.in_users }}</pre>
      <pre>start_date_time: {{ survey.start_date_time }}</pre>
      <pre>end_date_time: {{ survey.end_date_time }}</pre>

      <ol>
        <li v-for="question in survey.questions">
          <router-link :to="{ name: 'QuestionDetail', params: { id: question._uid }}">{{ question.translations.en.question }}</router-link>
        </li>
      </ol>

      <div v-if="survey.is_admin===true">
        <router-link :to="{ name: 'SurveyUpdate', params: { id: survey._uid }}">Edit Survey</router-link>
      </div>

      <form v-on:submit.prevent="startSurvey" method="post">
        <input type="submit" value="submit">
      </form>

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
      const url = process.env.API_HOST + '/api/survey/' + this.id

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
