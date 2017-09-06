<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import auth from '../service/auth'
export default {
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
