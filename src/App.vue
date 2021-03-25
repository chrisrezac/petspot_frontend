<template>
  <div id="app">
    <!-- NAVBAR
    ================================================== -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <!-- Brand -->
        <router-link class="navbar-brand" to="/pets">
          <img
            src="/assets/img/photos/logo.gif"
            class="navbar-brand-img"
            alt="..."
          />
        </router-link>

        <!-- Toggler -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <!-- Toggler -->
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fe fe-x"></i>
          </button>

          <!-- Navigation -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/pets" class="nav-link">
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/posts" class="nav-link">
                Posts
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pets" class="nav-link">
                Pets
              </router-link>
            </li>
            <li v-if="loggedIn()" class="nav-item">
              <router-link to="/logout" class="nav-link">
                Logout
              </router-link>
            </li>

            <li v-if="!loggedIn()" class="nav-item">
              <router-link to="/login" class="nav-link">
                Login
              </router-link>
            </li>
          </ul>

          <!-- Button -->
          <router-link
            v-if="loggedIn()"
            class="navbar-btn btn btn-sm btn-primary lift ml-auto"
            :to="`/users/${getUserId()}`"
          >
            My Profile
          </router-link>
          <router-link
            v-else
            class="navbar-btn btn btn-sm btn-primary lift ml-auto"
            to="/signup"
          >
            Signup
          </router-link>
        </div>
      </div>
    </nav>

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
