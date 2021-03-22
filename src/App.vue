<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand" href="/index.html">
          <img src="/assets/img/brand.svg" class="navbar-brand-img" alt="..." />
        </a>

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
          <!-- Navigation -->
          <ul class="navbar-nav ml-auto">
            <!-- Home Page -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarLandings"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link to="/">Home</router-link>
              </a>
            </li>
            <!-- Signup Page -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarPages"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link v-if="!loggedIn()" to="/signup"
                  >Sign Up</router-link
                >
              </a>
              <!-- Login Page -->
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarPages"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link v-if="!loggedIn()" to="/Login">Login</router-link>
              </a>
            </li>

            <!-- Logout Page -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarPages"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link v-if="loggedIn()" to="/logout"
                  >Logout
                </router-link>
              </a>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarPages"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link to="/pets">All Pets</router-link>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarPages"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <router-link to="/posts">All Posts</router-link>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarPages"
                data-toggle="dropdown"
                href="#"
                aria-haspopup="true"
                aria-expanded="false"
              >
              </a>
            </li>
          </ul>

          <!-- Button -->
          <a class="navbar-btn btn btn-sm btn-primary lift ml-auto">
            <router-link
              v-if="loggedIn()"
              :to="`/users/${getUserId()}`"
            ></router-link
            >My Profile
          </a>
        </div>
      </div>
    </nav>
    <div id="nav">
      <router-link to="/">Home | </router-link>
      <router-link v-if="!loggedIn()" to="/signup">Sign Up | </router-link>
      <router-link v-if="!loggedIn()" to="/login">Login | </router-link>
      <router-link v-if="loggedIn()" to="/logout">Logout | </router-link>
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
