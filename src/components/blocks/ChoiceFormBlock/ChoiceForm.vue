<template>
  <div>
    <b-form-group
      v-for="(choice, index) in choices"
      :key="index"
      label="Choice:"
      label-for="en-choice"
    >
      <b-form-input
        v-model="choice.translations.en.value"
        type="text"
        name="en-choice"
      />
      <b-form-checkbox
        v-model="choice.is_correct"
        name="is-correct"
        value="true"
        unchecked-value="false"
      >
        Correct
      </b-form-checkbox>
      <b-button @click="rmChoice">
        Remove Choice
      </b-button>
    </b-form-group>
    <b-button @click="addChoice">
      Add Choice
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'ChoiceForm',
  data () {
    return {
      choices: []
    }
  },
  watch: {
    choices () {
      console.log('choice added!')
    }
  },
  mounted () {
    this.addChoice()
  },
  methods: {
    addChoice () {
      this.choices.push({
        question: null,
        is_correct: null,
        translations: {
          en: {
            value: null
          },
          nl: {
            value: null
          },
          fr: {
            value: null
          },
          de: {
            value: null
          }
        }
      })
    },
    rmChoice (choiceIndx) {
      this.choices.splice(choiceIndx, 1)
    }
  }
}
</script>