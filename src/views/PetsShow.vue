<template>
  <div class="pets-show">
    <h2>{{ pet.name }}</h2>
    <img v-bind:src="pet.image_url" v-bind:alt="pet.name" />
    <p>Name: {{ pet.name }}</p>
    <p>Type: {{ pet.animal_type }}</p>
    <p>Breed: {{ pet.breed }}</p>
    <p>Birthday: {{ pet.birthday }}</p>
    <p>Bio: {{ pet.bio }}</p>
    <router-link to="/pets" tag="button">Go Back</router-link>
    |
    <router-link :to="`/pets/${pet.id}/edit`" tag="button">Edit</router-link>
    |
    <button v-on:click="destroyPet(currentPet)">Delete Pet</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      pet: []
    };
  },
  created: function() {
    axios.get("/api/pets/" + this.$route.params.id).then(response => {
      console.log("pets show", response);
      this.pet = response.data;
    });
  },
  methods: {
    destroyPet: function() {
      if (confirm("Are you sure you want to delete this pet?")) {
        axios.delete(`/api/pets/${this.pet.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/pets");
        });
      }
    }
  }
};
</script>
