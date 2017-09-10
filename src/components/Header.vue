<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><router-link :to="{ name: 'Hello'}">Home</router-link></li>
          <li v-if="this.$store.state.authenticated==false"><router-link :to="{ name: 'Login'}">Login</router-link></li>
          <li v-else><router-link :to="{ name: 'Logout'}">Logout</router-link></li>
          <li><router-link :to="{ name: 'SurveyList'}">Surveys</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
