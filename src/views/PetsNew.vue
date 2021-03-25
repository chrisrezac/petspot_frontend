<template>
  <div class="pets-new">
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
        <label>Birthday (year-month-day):</label>
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
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      pet: "",
      animalType: "",
      breed: "",
      birthday: "",
      bio: "",
      imageUrl: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
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
          this.$router.push(`/users/1`);
        })
        .catch(error => {
          console.log("pets create error", error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
