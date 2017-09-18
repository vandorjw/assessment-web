<template>
  <div>
    <v-header></v-header>
    <div v-if="this.$store.state.authenticated==true">
      <b-form v-on:submit.prevent="onSubmit">
        <b-form-group id="nameInputGroup" label="Survey Name:" label-for="name" description="The name of the survey.">
          <b-form-input id="nameInput" type="text" name="name" v-model="survey.translations.en.name" required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="descriptionInputGroup" label="Survey Description:" label-for="description">
          <b-form-input id="descriptionInput" type="text" name="description" v-model="survey.translations.en.description" required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="is_activeInputGroup" label="is_active:" label-for="is_active">
          <b-form-checkbox id="is_activeInput" name="is_active" v-model="survey.is_active">
          </b-form-checkbox>
        </b-form-group>

        <b-form-group id="is_privateInputGroup" label="is_private:" label-for="is_private">
          <b-form-checkbox id="is_privateInput" name="is_private" v-model="survey.is_private">
          </b-form-checkbox>
        </b-form-group>

        <b-form-group id="start_date_timeInputGroup" label="Survey Start Time:" label-for="start_date_time">
          <b-form-input id="start_date_timeInput" type="datetime-local" name="start_date_time" v-model="survey.start_date_time">
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="secondary">Reset</b-button>
      </b-form>
      <v-question :survey_id=this.id></v-question>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Login'}">please log in</router-link>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import Header from '../../blocks/HeaderBlock/Header'
import QuestionEdit from '../../blocks/QuestionEditBlock/QuestionEdit'

export default {
  components: {
    'v-header': Header,
    'v-question': QuestionEdit
  },
  props: ['id'],
  data () {
    return {
      error: [],
      survey: {
        _uid: this.id,
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
    onSubmit () {
      const url = process.env.API_HOST + '/api/survey/create/'

      let requestHeaders = {
        'Accept-Language': this.$store.state.language
      }

      if (this.$store.state.authenticated === true) {
        requestHeaders['Authorization'] = 'Token ' + this.$store.state.token
      } else {
        console.log('Auth Token not set!')
      }

      axios.post(url, this.survey, {
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
