<template>
  <div>
    <v-header></v-header>
    <p>{{ msg }}</p>
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
