<template>
  <div id="registration-page">
    <b-container fluid>
    <div v-if="this.$store.state.authenticated==true">
      <p>You are already authenticated</p>
    </div>
    <div v-else>
      <b-form v-on:submit.prevent="registerUser" method="post">
        <b-row>
          <b-col sm="3">
            <label for="email">Email</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              type="email"
              name="email"
              placeholder="Enter your email"
              v-model="credentials.email"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label for="username">Username</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              type="text"
              name="username"
              placeholder="Enter your username"
              v-model="credentials.username"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label for="password">Password</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              type="password"
              name="password"
              placeholder="Enter a password"
              v-model="credentials.password1"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label for="password">Confirm Password</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              type="password"
              name="password"
              placeholder="Confirm the password"
              v-model="credentials.password2"
            ></b-form-input>
          </b-col>
        </b-row>
        <input type="submit" value="Register">
      </b-form>
    </div>
    </b-container>
  </div>
</template>

<style>

</style>

<script>
import auth from '../../../service/auth'
export default {
  data () {
    return {
      credentials: {
        username: '',
        email: '',
        password1: '',
        password2: ''
      },
      error: ''
    }
  },
  methods: {
    registerUser: function () {
      var credentials = {
        username: this.credentials.username,
        email: this.credentials.email,
        password1: this.credentials.password1,
        password2: this.credentials.password2
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.registration(credentials, 'redirect-url')
    }
  }
}
</script>
