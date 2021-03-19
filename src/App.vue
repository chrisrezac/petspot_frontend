<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!loggedIn()" to="/signup">Sign Up |</router-link>
      <router-link v-if="!loggedIn()" to="/login"> Login | </router-link>
      <router-link to="/logout">Logout | </router-link>
      <router-link to="/pets">All Pets | </router-link>
      <router-link to="/posts">All Posts </router-link>
      <router-link v-if="loggedIn()" :to="`/users/${getUserId()}`"
        >| My Profile</router-link
      >
    </div>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  methods: {
    loggedIn: function() {
      return localStorage.jwt ? true : false;
    },
    getUserId: function() {
      return localStorage.getItem("userId");
    }
  }
};
</script>
