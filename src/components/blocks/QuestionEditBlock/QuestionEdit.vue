<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="is_requiredInputGroup"
        label="is_required:"
        label-for="is_required"
      >
        <b-form-checkbox
          id="is_requiredInput"
          v-model="question.is_required"
          name="is_required"
        />
      </b-form-group>

      <b-form-group
        label="of_type:"
        label-for="of_type"
      >
        <b-form-select
          v-model="question.of_type"
          :options="questionType"
          name="of_type"
        />
      </b-form-group>

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
              label="Question:"
              label-for="en-question"
            >
              <b-form-input
                v-model="question.translations.en.question"
                type="text"
                name="en-question"
              />
            </b-form-group>
            <v-choiceform />
          </b-tab>

          <b-tab title="French">
            <b-form-group
              label="Question:"
              label-for="fr-question"
            >
              <b-form-input
                v-model="question.translations.fr.question"
                type="text"
                name="fr-question"
              />
            </b-form-group>
            <v-choiceform />
          </b-tab>

          <b-tab title="Dutch">
            <b-form-group
              label="Question:"
              label-for="nl-question"
            >
              <b-form-input
                v-model="question.translations.nl.question"
                type="text"
                name="nl-question"
              />
            </b-form-group>
            <v-choiceform />
          </b-tab>

          <b-tab title="German">
            <b-form-group
              label="Question:"
              label-for="de-question"
            >
              <b-form-input
                v-model="question.translations.de.question"
                type="text"
                name="de-question"
              />
            </b-form-group>
            <v-choiceform />
          </b-tab>
        </b-tabs>
      </b-card>

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
  </div>
</template>


<script>
import axios from 'axios'

import ChoiceForm from '../ChoiceFormBlock/ChoiceForm'

export default {
  components: {
    'v-choiceform': ChoiceForm
  },
  props: {
    surveyId: {
      type: String,
      default: null,
      required: true
    }
  },
  data () {
    return {
      error: [],
      question: {
        survey: this.survey_id,
        translations: {
          en: {
            question: null
          },
          nl: {
            question: null
          },
          fr: {
            question: null
          },
          de: {
            question: null
          }
        },
        is_required: true,
        of_type: null
      },
      questionType: [
        { value: null, text: 'Please select an option' },
        { value: 'tf', text: 'True/False' },
        { value: 'mc', text: 'Multiple Choice' },
        { value: 'txt', text: 'Text' }
      ],
      trueOrFalse: [
        { value: true, text: 'True' },
        { value: false, text: 'False' }
      ]
    }
  },
  methods: {
    onClickAdd () {
      console.log('Clicked')
    },
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

      for (let key in this.question.translations) {
        // skip loop if the property is from prototype
        if (!this.question.translations.hasOwnProperty(key)) {
          continue
        }

        let obj = this.question.translations[key]
        if (obj.question != null) {
          continue
        } else {
          delete this.question.translations[key]
        }
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
