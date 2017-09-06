<template>
  <div>
    <v-header></v-header>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import auth from '../service/auth'
import Header from './Header'
export default {
  components: {
    'v-header': Header
  },
  data () {
    return {
      msg: ''
    }
  },
  created () {
    this.logoutUser()
  },
  methods: {
    logoutUser: function () {
      auth.logout()
      this.msg = 'You have successfully logged out'
    }
  }
}
</script>
