<template>
<b-form v-on:submit.prevent="formSubmitAction">

  <b-card no-body>
    <b-tabs card no-fade>
      <b-tab title="English" active>
        <b-form-group id="englishNameInputGroup" label="English Survey Name:" label-for="en-name" description="The name of the survey in english.">
          <b-form-input id="englishNameInput" type="text" name="en-name" v-model="survey.translations.en.name" required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="englishDescriptionInputGroup" label="English Survey Description:" label-for="en-description">
          <b-form-input id="englishDescriptionInput" type="text" name="en-description" v-model="survey.translations.en.description" required>
          </b-form-input>
        </b-form-group>
      </b-tab>
      <b-tab title="French" >
        <b-form-group id="frenchNameInputGroup" label="French Survey Name:" label-for="fr-name" description="The name of the survey in french.">
          <b-form-input id="frenchNameInput" type="text" name="fr-name" v-model="survey.translations.fr.name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="frenchDescriptionInputGroup" label="French Survey Description:" label-for="fr-description">
          <b-form-input id="frenchDescriptionInput" type="text" name="fr-description" v-model="survey.translations.fr.description">
          </b-form-input>
        </b-form-group>
      </b-tab>
      <b-tab title="Dutch" >
        <b-form-group id="dutchNameInputGroup" label="Dutch Survey Name:" label-for="nl-name" description="The name of the survey in dutch.">
          <b-form-input id="dutchNameInput" type="text" name="nl-name" v-model="survey.translations.nl.name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="dutchDescriptionInputGroup" label="Dutch Survey Description:" label-for="nl-description">
          <b-form-input id="dutchDescriptionInput" type="text" name="nl-description" v-model="survey.translations.nl.description">
          </b-form-input>
        </b-form-group>
      </b-tab>
      <b-tab title="German" >
        <b-form-group id="germanNameInputGroup" label="German Survey Name:" label-for="de-name" description="The name of the survey in german.">
          <b-form-input id="germanNameInput" type="text" name="de-name" v-model="survey.translations.de.name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="germanDescriptionInputGroup" label="German Survey Description:" label-for="de-description">
          <b-form-input id="germanDescriptionInput" type="text" name="de-description" v-model="survey.translations.de.description">
          </b-form-input>
        </b-form-group>
      </b-tab>
    </b-tabs>
  </b-card>

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
</template>

<script>
import axios from 'axios'

export default {
  name: 'SurveyForm',
  props: ['survey_id'],
  data: function () {
    return {
      error: [],
      survey: {
        translations: {
          en: {
            name: '',
            description: ''
          },
          nl: {
            name: '',
            description: ''
          },
          fr: {
            name: '',
            description: ''
          },
          de: {
            name: '',
            description: ''
          }
        },
        is_active: true,
        is_private: false,
        start_date_time: '2000-01-01T00:00:00.000000Z'
      }
    }
  },
  created: function () {
    console.log('survey_id is: ' + this.survey_id)
    if (this.survey_id) {
      this.getSurveyDetail()
    }
  },
  methods: {
    formSubmitAction: function () {
      console.log('Emit formSubmission event!')
      console.log(this.survey)
      this.$emit('formSubmission', this.survey)
    },
    getSurveyDetail () {
      const url = process.env.API_HOST + '/api/survey/' + this.survey_id

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
