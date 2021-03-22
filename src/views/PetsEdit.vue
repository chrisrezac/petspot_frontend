<template>
  <div class="pets-edit">
    <form v-on:submit.prevent="updatePet()">
      <h1> {{ "Edit " + `${pet.name}` }}</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="pet.name" />
      </div>
      <div class="form-group">
        <label>Type:</label>
        <input type="text" class="form-control" v-model="pet.animal_type" />
      </div>
      <div class="form-group">
        <label>Breed:</label>
        <input type="text" class="form-control" v-model="pet.breed" />
      </div>
      <div class="form-group">
        <label>Birthdate:</label>
        <input type="text" class="form-control" v-model="pet.birthday" />
      </div>
      <div class="form-group">
        <label>Bio:</label>
        <input type="text" class="form-control" v-model="pet.bio" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="imageUrl" />
      </div>
      <input type="submit" class="btn btn-primary" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      pet: {},
      errors: []
    };
  },
  created: function() {
    axios.get(`/api/pets/${this.$route.params.id}`).then(response => {
      this.pet = response.data;
      console.log(this.pet);
    });
  },
  methods: {
    updatePet: function() {
      var params = {
        name: this.pet.name,
        animal_type: this.pet.animal_type,
        breed: this.pet.breed,
        birthday: this.pet.birthday,
        bio: this.pet.bio,
        image_url: this.pet.imageUrl
      };
      axios
        .patch(`/api/pets/${this.pet.id}`, params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/pets/${this.pet.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
