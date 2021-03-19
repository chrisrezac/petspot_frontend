<template>
  <div class="users-show">
    <h1>{{ user.username }}</h1>
    <img v-bind:src="user.image_url" width="500" height="500" />
    <br />
    <router-link to="/pets" tag="button">Go Back to Pets </router-link>

    <router-link
      v-if="isCurrentUser()"
      :to="`/users/${user.id}/edit`"
      tag="button"
      >Edit</router-link
    >

    <button v-if="isCurrentUser()" v-on:click="destroyUser(currentUser)">
      Delete User
    </button>
    <br />
    <br />
    <h1>{{ `${user.username}` + "'s" + " " + "Pets" }}</h1>
    <div v-for="pet in user.pets" v-bind:key="pet.id">
      <h2>{{ pet.name }}</h2>
      <router-link :to="`/pets/${pet.id}`"
        ><img v-bind:src="pet.image_url" width="500" height="500"
      /></router-link>
    </div>

    <div v-if="isCurrentUser()" class="pets-new">
      <h1>New Pet</h1>
      <form v-on:submit.prevent="createPet()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label>Type:</label>
          <input type="text" class="form-control" v-model="animalType" />
        </div>
        <div class="form-group">
          <label>Breed:</label>
          <input type="text" class="form-control" v-model="breed" />
        </div>
        <div class="form-group">
          <label>Birthday:</label>
          <input type="text" class="form-control" v-model="birthday" />
        </div>
        <div class="form-group">
          <label>Bio:</label>
          <input type="text" class="form-control" v-model="bio" />
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input type="text" class="form-control" v-model="imageUrl" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      animalType: "",
      breed: "",
      birthday: "",
      bio: "",
      imageUrl: "",
      user: [],
      pets: [],
      errors: []
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
    createPet: function() {
      var params = {
        name: this.name,
        animal_type: this.animalType,
        breed: this.breed,
        birthday: this.birthday,
        bio: this.bio,
        image_url: this.imageUrl
      };
      axios
        .post("/api/pets", params)
        .then(response => {
          console.log("pets create", response);
          this.user.pets.push(response.data);
          console.log(this.user.pets);
        })
        .catch(error => {
          console.log("pets create error", error.response);
          this.errors = error.response.data.errors;
        });
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
