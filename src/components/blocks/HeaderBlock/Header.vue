<template>
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-navbar-brand :to="{ name: 'Hello'}">Assessment</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item-dropdown text="Survey">
            <b-dropdown-item :to="{ name: 'SurveyList'}">List</b-dropdown-item>
            <b-dropdown-item v-if="this.$store.state.authenticated===true" :to="{ name: 'SurveyCreate'}">Create</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">English</b-dropdown-item>
            <b-dropdown-item href="#">Nederlands</b-dropdown-item>
            <b-dropdown-item href="#">Deutsch</b-dropdown-item>
            <b-dropdown-item href="#">Français</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-if="this.$store.state.authenticated===true" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'Logout'}">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-else right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item :to="{ name: 'Registration'}">Register</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'Login'}">Login</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'Header'
}
</script>
