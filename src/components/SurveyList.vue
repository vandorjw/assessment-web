<template>
  <div>
    <ul>
      <li v-for="survey in surveys">
      {{ survey.translations.en.name }}
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

      axios.get(url, {
        headers: {'Authorization': token}
      })
      .then((response) => {
        this.surveys = response.data
      })
      .catch((error) => {
        this.error = error
      })
    }
  }
}
</script>
