<template>
  <div class="signup">
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
              type="text"
              class="form-control form-control-flush"
              id="cardName"
              v-model="username"
            />
            <label for="cardName">Username</label>
          </div>
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
          <div class="form-label-group">
            <input
              type="password"
              class="form-control form-control-flush"
              id="cardPassword"
              v-model="passwordConfirmation"
            />
            <label for="cardPasswordConfirmation">Password Confirmation</label>
          </div>
          <div class="mt-6">
            <button class="btn btn-primary" type="submit">
              Create Account
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
