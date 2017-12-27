<template>
  <div>
    <div v-if="this.$store.state.authenticated==true">
       <v-surveyform v-on:formSubmission="formSubmitAction" :survey_id=this.id></v-surveyform>
       <hr />
       <b-btn v-b-modal="'addQuestionModal'">Add Question</b-btn>
       <b-modal id="addQuestionModal">
         <v-question :survey_id=this.id></v-question>
       </b-modal>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Login'}">please log in</router-link>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import SurveyForm from '../../blocks/SurveyFormBlock/SurveyForm'
import QuestionEdit from '../../blocks/QuestionEditBlock/QuestionEdit'

export default {
  components: {
    'v-question': QuestionEdit,
    'v-surveyform': SurveyForm
  },
  props: ['id'],
  data () {
    return {
      error: [],
      survey: {
        id: this.id,
        translations: {
          en: {
            name: '',
            description: ''
          }
        },
        is_active: true,
        is_private: false,
        start_date_time: '2017-07-31T05:09:38.460803Z'
      }
    }
  },
  methods: {
    formSubmitAction (formData) {
      const url = process.env.API_HOST + '/api/survey/update/' + this.survey.id + '/'

      let requestHeaders = {
        'Accept-Language': this.$store.state.language
      }

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      } else {
        console.log('Auth Token not set!')
      }

      axios.put(url, formData, {
        headers: requestHeaders
      })
      .then((response) => {
        console.log(response.data)
        console.log(response.status)
        this.$router.push({name: 'SurveyList'})
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
