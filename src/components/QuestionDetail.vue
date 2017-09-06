<template>
  <div v-if="question">
    <form id="form" v-on:submit.prevent="submitAnswer" method="post">
      <label for="answer">{{ question.translations.en.question }}</label>
      <input
        type="text"
        name="answer"
        v-model="answer"
      >
      <input type="submit" value="submit">
    </form>
  </div>
  <div v-else>
    <p>Either Question does not exist or you are not authorized to see it</p>
  </div>
</template>

<script>
import axios from 'axios'
import auth from '../service/auth'

export default {
  props: ['id'],
  data () {
    return {
      question: null,
      answer: null,
      error: []
    }
  },
  created () {
    this.getQuestionDetail()
  },
  methods: {
    getQuestionDetail () {
      const url = 'http://localhost:8000/api/question/' + this.id + '/'
      const token = auth.getAuthHeaderValue()
      if (auth.isAuthenticated()) {
        axios.get(url, {
          headers: {'Authorization': token}
        })
        .then((response) => {
          this.question = response.data
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
          this.question = response.data
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
    },
    submitAnswer () {
      console.log('submitAnswer stub: ' + this.answer)
    }
  }
}
</script>
