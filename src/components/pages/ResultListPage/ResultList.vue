<template>
  <div>
    <ul>
      <li v-for="result in results" :key="result._uid">
        <router-link :to="{ name: 'ResultDetail', params: { id: result._uid }}">
          {{ result._uid }}
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
      results: [],
      error: []
    }
  },
  created () {
    this.getSurveyList()
  },
  methods: {
    getSurveyList () {
      const url = process.env.API_HOST + '/api/result/'

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
        this.results = response.data
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
