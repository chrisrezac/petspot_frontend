<template>
  <div class="login">
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
          this.$router.push("/");
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
