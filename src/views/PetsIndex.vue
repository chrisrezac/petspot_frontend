<template>
  <div class="pets-index">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">
          <!-- Heading -->
          <h1 class="display-1 font-weight-bold">
            All Pets
          </h1>

          <!-- Text -->
          <p class="lead text-secondary mb-4">
            The one spot to stop and see all those who run, swim, slither, and
            hop!
          </p>
          <button
            v-on:click="sortAttribute = 'animal_type'"
            class="btn btn-primary-soft"
          >
            Sort by Animal Type
          </button>
        </div>
      </div>
    </div>
    <!-- Items -->
    <div
      v-for="pet in orderBy(filterBy(pets, filter), sortAttribute)"
      v-bind:key="pet.id"
    >
      <div class="container">
        <div
          class="row"
          id="portfolio"
          data-isotope='{"layoutMode": "masonry"}'
        >
          <div class="col-12 col-md-4">
            <!-- Image -->

            <!-- Footer -->
            <div class="card-header">
              <!-- Heading -->
              <h3 class="mb-1 font-weight-bold">{{ pet.name }}</h3>
              <div class="card card-border card-border-lg border-primary"></div>
            </div>
            <router-link :to="`/pets/${pet.id}`"
              ><img v-bind:src="pet.image_url" class="img-fluid"
            /></router-link>
          </div>
        </div>
      </div>
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
      filter: "",
      sortAttribute: "animalType"
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
