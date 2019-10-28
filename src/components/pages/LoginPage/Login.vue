<template>
  <div id="login-page">
    <div v-if="this.$store.state.authenticated==true">
      <p>You are already authenticated</p>
    </div>
    <div v-else>
      <form
        method="post"
        @submit.prevent="loginUser"
      >
        <label for="username">Username</label>
        <input
          v-model="credentials.username"
          type="text"
          name="username"
          placeholder="Enter your username"
        >
        <label for="password">Password</label>
        <input
          v-model="credentials.password"
          type="password"
          name="password"
          placeholder="Enter your password"
        >
        <input
          type="submit"
          value="login"
        >
      </form>
    </div>
  </div>
</template>

<script>
import auth from '../../../service/auth'
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    loginUser: function () {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.login(credentials)
    }
  }
}
</script>
