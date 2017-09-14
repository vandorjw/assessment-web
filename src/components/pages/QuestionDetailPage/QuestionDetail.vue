<template>
  <div v-if="question">
    <form v-on:submit.prevent="submitAnswer" method="post">
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
      const url = process.env.API_HOST + '/api/question/' + this.id + '/'
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
    },
    submitAnswer () {
      console.log('submitAnswer stub: ' + this.answer)
    }
  }
}
</script>
