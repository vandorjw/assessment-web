<template>
  <div>
    <b-form v-on:submit.prevent="onSubmit">

      <b-card no-body>
        <b-tabs card no-fade>
          <b-tab title="English" active>
            <b-form-group label="Question:" label-for="en-question">
              <b-form-input type="text" name="en-question" v-model="question.translations.en.question">
              </b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="French">
            <b-form-group label="Question:" label-for="fr-question">
              <b-form-input type="text" name="fr-question" v-model="question.translations.fr.question">
              </b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="Dutch">
            <b-form-group label="Question:" label-for="nl-question">
              <b-form-input type="text" name="nl-question" v-model="question.translations.nl.question">
              </b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="German">
            <b-form-group label="Question:" label-for="de-question">
              <b-form-input type="text" name="de-question" v-model="question.translations.de.question">
              </b-form-input>
            </b-form-group>
          </b-tab>
        </b-tabs>
      </b-card>

      <b-form-group id="is_requiredInputGroup" label="is_required:" label-for="is_required">
        <b-form-checkbox id="is_requiredInput" name="is_required" v-model="question.is_required">
        </b-form-checkbox>
      </b-form-group>

      <b-form-group label="of_type:" label-for="of_type">
        <b-form-select v-model="question.of_type" :options="options" name="of_type">
        </b-form-select>
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
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'tf', text: 'True/False' },
        { value: 'mc', text: 'Multiple Choice' },
        { value: 'txt', text: 'Text' }
      ]
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

      // this.$emit('formSubmission', this.question)

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
