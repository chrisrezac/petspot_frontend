<template>
  <div class="login">
    <!-- CONTENT
    ================================================== -->
    <section>
      <div class="container d-flex flex-column">
        <div
          class="row align-items-center justify-content-center no-gutters min-vh-100"
        >
          <div class="col-12 col-md-6 col-lg-4 py-8 pb-md-11">
            <!-- Heading -->
            <h1 class="font-weight-bold">
              Login
            </h1>

            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>

            <!-- Form -->
            <form class="mb-6" v-on:submit.prevent="submit()">
              <!-- Email -->
              <div class="form-group">
                <label for="email">
                  Email Address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                />
              </div>

              <!-- Password -->
              <div class="form-group mb-5">
                <label for="password">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                />
              </div>

              <!-- Submit -->
              <button class="btn btn-block btn-primary" type="submit">
                Login
              </button>
            </form>

            <!-- Text -->
            <p class="mb-0 font-size-sm text-muted">
              Need to register? <router-link to="/signup">Sign up</router-link>.
            </p>
          </div>
          <div
            class="col-lg-7 offset-lg-1 align-self-stretch d-none d-lg-block"
          >
            <!-- Image -->
            <div
              class="h-100 w-cover bg-cover"
              style="background-image: url(assets/img/photos/login-cat.jpeg);"
            ></div>

            <!-- Shape -->
            <div class="shape shape-left shape-fluid-y svg-shim text-white">
              <svg
                viewBox="0 0 100 1544"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h100v386l-50 772v386H0V0z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
        <!-- / .row -->
      </div>
      <!-- / .container -->
    </section>
    <div class="card shadow-light-lg">
      <!-- Shape -->
      <div class="position-relative">
        <div class="shape shape-bottom shape-fluid-x svg-shim text-white"></div>
      </div>

      <!-- Body -->
      <div class="card-body">
        <!-- Form -->
        <form v-on:submit.prevent="submit()">
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
          <div class="form-label-group">
            <input
              type="email"
              class="form-control form-control-flush"
              id="cardEmail"
              v-model="email"
            />
            <label for="cardEmail">Email</label>
          </div>
          <div class="form-label-group">
            <input
              type="password"
              class="form-control form-control-flush"
              id="cardPassword"
              v-model="password"
            />
            <label for="cardPassword">Password</label>
          </div>

          <div class="mt-6">
            <button class="btn btn-primary" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("userId", response.data.user_id);
          this.$router.push("/pets");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
