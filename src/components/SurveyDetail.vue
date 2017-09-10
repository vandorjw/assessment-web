<template>
  <div v-if="survey">
    <pre>is_active: {{ survey.is_active }}</pre>
    <pre>is_private: {{ survey.is_private }}</pre>
    <pre>start_date_time: {{ survey.start_date_time }}</pre>
    <pre>end_date_time: {{ survey.end_date_time }}</pre>
    <pre>admin: {{ survey.admin }}</pre>
    <pre>users: {{ survey.users }}</pre>
    <ul>
      <li v-for="lang in survey.translations">
        <pre>name: {{ lang.name }}</pre>
        <pre>description: {{ lang.description }}</pre>
      </li>
    </ul>
    <div v-if="survey">
      <form v-on:submit.prevent="startSurvey" method="post">
        <input type="submit" value="submit">
      </form>
    </div>
    <ol>
      <li v-for="question in survey.questions">
        <router-link :to="{ name: 'QuestionDetail', params: { id: question._uid }}">{{ question.translations.en.question }}</router-link>
      </li>
    </ol>
  </div>
  <div v-else>
    <p>Either survey does not exist or you are not authorized to see it</p>
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

    },
    getSurveyDetail () {
      const url = 'http://localhost:8000/api/survey/' + this.id

      let requestHeaders = {}

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
