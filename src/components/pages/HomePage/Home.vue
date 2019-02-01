<template>
  <div class="hello">
    <p>
    This is still a work in progress, but feel free to sign up and click around.
    </p>
    <p>
    The vision for this site is to make it easy to create questions that other people can answer.
    </p>
    <p>
    The source code is available <a href="https://github.com/vandorjw/django-assessment">here for the backend</a> and <a href="https://github.com/vandorjw/assessment-web">here for frontend</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to another survey App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
