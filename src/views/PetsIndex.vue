<template>
  <div class="pets-index">
    <h1>All Pets</h1>
    <div v-for="pet in pets" v-bind:key="pet.id">
      <router-link :to="`/pets/${pet.id}`"
        ><img v-bind:src="pet.image_url"
      /></router-link>
      <p>Name: {{ pet.name }}</p>
      <p>Type: {{ pet.animal_type }}</p>
      <p>Breed: {{ pet.breed }}</p>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      pets: []
    };
  },
  created: function() {
    axios.get("/api/pets").then(response => {
      console.log("pets index", response);
      this.pets = response.data;
    });
  },
  methods: {}
};
</script>
