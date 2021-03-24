<template>
  <div class="signup">
    <!-- CONTENT
    ================================================== -->
    <section>
      <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center no-gutters min-vh-100">
          <div class="col-12 col-md-6 col-lg-4 py-8 pb-md-11">
            
            <!-- Heading -->
            <h1 class="font-weight-bold">
              Sign up
            </h1>

            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>

            <!-- Form -->
            <form class="mb-6" v-on:submit.prevent="submit()">

              <!-- Username -->
              <div class="form-group">
                <label for="username">
                  Username
                </label>
                <input type="text" class="form-control" id="username" v-model="username">
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="email">
                  Email Address
                </label>
                <input type="email" class="form-control" id="email" v-model="email">
              </div>

              <!-- Password -->
              <div class="form-group mb-5">
                <label for="password">
                  Password
                </label>
                <input type="password" class="form-control" id="password" v-model="password">
              </div>

              <!-- Password -->
              <div class="form-group mb-5">
                <label for="passwordConfirmation">
                  Password Confirm
                </label>
                <input type="password" class="form-control" id="passwordConfirmation" v-model="passwordConfirmation">
              </div>

              <!-- Submit -->
              <button class="btn btn-block btn-primary" type="submit">
                Sign up
              </button>

            </form>

            <!-- Text -->
            <p class="mb-0 font-size-sm text-muted">
              Already have an account? <router-link to="/login">Log in</router-link>.
            </p>

          </div>
          <div class="col-lg-7 offset-lg-1 align-self-stretch d-none d-lg-block">

            <!-- Image -->
            <div class="h-100 w-cover bg-cover" style="background-image: url(assets/img/photos/signup-dogs.jpeg);"></div>
            
            <!-- Shape -->
            <div class="shape shape-left shape-fluid-y svg-shim text-white">
              <svg viewBox="0 0 100 1544" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h100v386l-50 772v386H0V0z" fill="currentColor"/></svg>
            </div>

          </div>
        </div> <!-- / .row -->
      </div> <!-- / .container -->
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
