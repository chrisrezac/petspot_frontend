<template>
  <div class="users-show">
    <h1>{{ user.username }}</h1>
    <img v-bind:src="user.image_url" />
    <br />
    <router-link to="/pets" tag="button">Go Back to Pets</router-link>
    |
    <router-link
      v-if="isCurrentUser()"
      :to="`/users/${user.id}/edit`"
      tag="button"
      >Edit</router-link
    >
    |
    <button v-if="isCurrentUser()" v-on:click="destroyUser(currentUser)">
      Delete User
    </button>
    <br />
    <br />
    <h2>{{ `${user.username}` + "'s" + " " + "Pets" }}</h2>
    <div v-for="pet in user.pets" v-bind:key="pet.id">
      <h3>{{ pet.name }}</h3>
      <router-link :to="`/pets/${pet.id}`"
        ><img v-bind:src="pet.image_url"
      /></router-link>
    </div>
    <router-link v-if="isCurrentUser()" :to="`/pets/new`" tag="button"
      >Create New Pet</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: [],
      pets: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      console.log("users show", response);
      this.user = response.data;
    });
  },
  methods: {
    destroyUser: function() {
      if (confirm("Are you sure you want to delete this user?")) {
        axios.delete(`/api/users/${this.user.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/users");
        });
      }
    },
    isCurrentUser: function() {
      if (this.$parent.getUserId() == this.user.id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
