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
    <ol>
      <li v-for="question in survey.questions">
        <pre>{{ question }}</pre>
      </li>
    </ol>
  </div>
  <div v-else>
    <p>Either survey does not exist or you are not authorized to see it</p>
  </div>
</template>

<script>
import axios from 'axios'
import auth from '../service/auth'

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
    getSurveyDetail () {
      const url = 'http://localhost:8000/api/survey/' + this.id
      const token = auth.getAuthHeaderValue()

      axios.get(url, {
        headers: {'Authorization': token}
      })
      .then((response) => {
        this.survey = response.data
      })
      .catch((error) => {
        this.error = error
      })
    }
  }
}
</script>
