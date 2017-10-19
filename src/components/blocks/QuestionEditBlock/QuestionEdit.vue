<template>
  <div>
    <b-form v-on:submit.prevent="onSubmit">

      <b-form-group id="questionInputGroup" label="Question:" label-for="question">
        <b-form-input id="questionInput" type="text" name="question" v-model="question.translations.en.question" required>
        </b-form-input>
      </b-form-group>

      <b-form-group id="is_requiredInputGroup" label="is_required:" label-for="is_required">
        <b-form-checkbox id="is_requiredInput" name="is_required" v-model="question.is_required">
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="secondary">Reset</b-button>
    </b-form>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  props: ['survey_id'],
  data () {
    return {
      error: [],
      question: {
        survey: this.survey_id,
        translations: {
          en: {
            question: ''
          }
        },
        is_required: true,
        of_type: 'txt'
      }
    }
  },
  methods: {
    onSubmit () {
      const url = process.env.API_HOST + '/api/question/create/'

      let requestHeaders = {
        'Accept-Language': this.$store.state.language
      }

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      } else {
        console.log('Auth Token not set!')
      }

      axios.post(url, this.question, {
        headers: requestHeaders
      })
      .then((response) => {
        console.log(response.data)
        console.log(response.status)
        // this.$router.push({name: 'SurveyList'})
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
