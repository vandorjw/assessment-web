<template>
  <b-form @submit.prevent="formSubmitAction">
    <b-card no-body>
      <b-tabs
        card
        no-fade
      >
        <b-tab
          title="English"
          active
        >
          <b-form-group
            id="englishNameInputGroup"
            label="English Survey Name:"
            label-for="en-name"
            description="The name of the survey in english."
          >
            <b-form-input
              id="englishNameInput"
              v-model="survey.translations.en.name"
              type="text"
              name="en-name"
            />
          </b-form-group>
          <b-form-group
            id="englishDescriptionInputGroup"
            label="English Survey Description:"
            label-for="en-description"
          >
            <b-form-input
              id="englishDescriptionInput"
              v-model="survey.translations.en.description"
              type="text"
              name="en-description"
            />
          </b-form-group>
        </b-tab>
        <b-tab title="French">
          <b-form-group
            id="frenchNameInputGroup"
            label="French Survey Name:"
            label-for="fr-name"
            description="The name of the survey in french."
          >
            <b-form-input
              id="frenchNameInput"
              v-model="survey.translations.fr.name"
              type="text"
              name="fr-name"
            />
          </b-form-group>
          <b-form-group
            id="frenchDescriptionInputGroup"
            label="French Survey Description:"
            label-for="fr-description"
          >
            <b-form-input
              id="frenchDescriptionInput"
              v-model="survey.translations.fr.description"
              type="text"
              name="fr-description"
            />
          </b-form-group>
        </b-tab>
        <b-tab title="Dutch">
          <b-form-group
            id="dutchNameInputGroup"
            label="Dutch Survey Name:"
            label-for="nl-name"
            description="The name of the survey in dutch."
          >
            <b-form-input
              id="dutchNameInput"
              v-model="survey.translations.nl.name"
              type="text"
              name="nl-name"
            />
          </b-form-group>
          <b-form-group
            id="dutchDescriptionInputGroup"
            label="Dutch Survey Description:"
            label-for="nl-description"
          >
            <b-form-input
              id="dutchDescriptionInput"
              v-model="survey.translations.nl.description"
              type="text"
              name="nl-description"
            />
          </b-form-group>
        </b-tab>
        <b-tab title="German">
          <b-form-group
            id="germanNameInputGroup"
            label="German Survey Name:"
            label-for="de-name"
            description="The name of the survey in german."
          >
            <b-form-input
              id="germanNameInput"
              v-model="survey.translations.de.name"
              type="text"
              name="de-name"
            />
          </b-form-group>
          <b-form-group
            id="germanDescriptionInputGroup"
            label="German Survey Description:"
            label-for="de-description"
          >
            <b-form-input
              id="germanDescriptionInput"
              v-model="survey.translations.de.description"
              type="text"
              name="de-description"
            />
          </b-form-group>
        </b-tab>
      </b-tabs>
    </b-card>

    <b-form-group
      id="is_activeInputGroup"
      label="is_active:"
      label-for="is_active"
    >
      <b-form-checkbox
        id="is_activeInput"
        v-model="survey.is_active"
        name="is_active"
      />
    </b-form-group>

    <b-form-group
      id="is_privateInputGroup"
      label="is_private:"
      label-for="is_private"
    >
      <b-form-checkbox
        id="is_privateInput"
        v-model="survey.is_private"
        name="is_private"
      />
    </b-form-group>

    <b-form-group
      id="start_date_timeInputGroup"
      label="Survey Start Time:"
      label-for="start_date_time"
    >
      <b-form-input
        id="start_date_timeInput"
        v-model="survey.start_date_time"
        type="datetime-local"
        name="start_date_time"
      />
    </b-form-group>

    <b-button
      type="submit"
      variant="primary"
    >
      Submit
    </b-button>
    <b-button
      type="reset"
      variant="secondary"
    >
      Reset
    </b-button>
  </b-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SurveyForm',
  props: ['surveyId'],
  data: function () {
    return {
      error: [],
      survey: {
        translations: {
          en: {
            name: null,
            description: null
          },
          nl: {
            name: null,
            description: null
          },
          fr: {
            name: null,
            description: null
          },
          de: {
            name: null,
            description: null
          }
        },
        is_active: true,
        is_private: false,
        start_date_time: '2000-01-01T00:00:00.000000Z'
      }
    }
  },
  created: function () {
    if (this.survey_id) {
      this.getSurveyDetail()
    }
  },
  methods: {
    formSubmitAction: function () {
      for (let key in this.survey.translations) {
        // skip loop if the property is from prototype
        if (!this.survey.translations.hasOwnProperty(key)) {
          continue
        }

        let obj = this.survey.translations[key]
        if (obj.name != null || obj.description != null) {
          continue
        } else {
          delete this.survey.translations[key]
        }
      }
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
        for (let key in this.survey.translations) {
          if (!(response.data.translations.hasOwnProperty(key))) {
            response.data.translations[key] = {
              name: null,
              description: null
            }
          }
        }
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
