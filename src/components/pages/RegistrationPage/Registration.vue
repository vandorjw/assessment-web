<template>
  <div id="login-page">
    <v-header></v-header>
    <div v-if="this.$store.state.authenticated==true">
      <p>You are already authenticated</p>
    </div>
    <div v-else>
      <form v-on:submit.prevent="registerUser" method="post">
        <label for="username">Email</label>
        <input
          type="email"
          name="username"
          placeholder="Enter your username"
          v-model="credentials.email"
        >
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          v-model="credentials.username"
        >
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter a password"
          v-model="credentials.password1"
        >
        <label for="password">Confirm Password</label>
        <input
          type="password"
          name="password"
          placeholder="Confirm the password"
          v-model="credentials.password2"
        >
        <input type="submit" value="Register">
      </form>
    </div>
  </div>
</template>

<script>
import Header from '../../blocks/HeaderBlock/Header'
import auth from '../../../service/auth'
export default {
  components: {
    'v-header': Header
  },
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
