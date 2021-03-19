<template>
  <div class="pets-index">
    <div>Search: <input type="text" v-model="filter" /></div>
    <h1>All Pets</h1>
    <div v-for="pet in filterBy(pets, filter)" v-bind:key="pet.id">
      <h2>{{ pet.name }}</h2>
      <router-link :to="`/pets/${pet.id}`"
        ><img v-bind:src="pet.image_url" width="500" height="500"
      /></router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      pets: [],
      filter: ""
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
