<template>
  <div>
    <div v-if="result">
      <pre>survey id: {{ result.survey }}</pre>
      <pre>result id: {{ result._uid }}</pre>
      <pre>is_active: {{ result.user }}</pre>
    </div>
    <div v-else>
      <p>Either the result does not exist or you are not authorized to see it</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data () {
    return {
      result: null,
      error: []
    }
  },
  created () {
    this.getResultDetail()
  },
  methods: {
    getResultDetail () {
      const url = process.env.API_HOST + '/api/result/' + this.id + '/'

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
        this.result = response.data
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
