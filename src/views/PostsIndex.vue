<template>
  <div class="posts-index">

 <!-- WELCOME
    ================================================== -->
    <section class="pt-8 pb-12">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8 text-center">
            <!-- Headin -->
            <h1 class="display-1 font-weight-bold">
              Pet Posts.
            </h1>

            <!-- Text -->
            <p class="lead text-secondary mb-4">
              Click on the buttons below to filter posts
            </p>

            <!-- Badges -->
            <nav class="nav justify-content-center">
              <a
                v-on:click="filter = 'Dog'"
                class="badge badge-pill badge-secondary-soft active mr-1 mb-1"
              >
                <span class="h6 text-uppercase">Dogs</span>
              </a>
              <a
                v-on:click="filter = 'Cat'"
                class="badge badge-pill badge-secondary-soft mr-1 mb-1 active"
              >
                <span class="h6 text-uppercase">Cats</span>
              </a>
              <a
                v-on:click="filter = 'Birds'"
                class="badge badge-pill badge-secondary-soft mr-1 mb-1 active"
              >
                <span class="h6 text-uppercase">Birds</span>
              </a>
              <a
                v-on:click="filter = ''"
                class="badge badge-pill badge-secondary-soft mr-1 mb-1 active"
              >
                <span class="h6 text-uppercase">All</span>
              </a>
            </nav>
          </div>
        </div>
        <!-- / .row -->
      </div>
      <!-- / .container -->
    </section>

       <!-- CONTENT
    ================================================== -->
    <section class="py-8 py-md-11 mt-n10 mt-md-n14">
      <div class="container">
        <div
          class="row"
          id="portfolio"
          data-isotope='{"layoutMode": "fitRows"}'
        >
          <div
            class="col-12 col-md-4 product"
            v-for="post in posts" v-bind:key="post.id"
          >
            <!-- Card -->
            <router-link class="card card-flush mb-7" :to="`/posts/${post.id}`">
              <!-- Image -->
              <div class="card-zoom">
                <img
                  class="card-img-top rounded shadow-light-lg"
                  v-bind:src="post.image_url"
                  alt="..."
                />
              </div>

              <!-- Footer -->
              <div class="card-footer">
                <!-- Preheading -->
                <h6 class="text-uppercase mb-1 text-muted"></h6>

                <!-- Heading -->
                <h4 class="mb-0">{{ post.title }}</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- SHAPE
    ================================================== -->
    <div class="position-relative">
      <div class="shape shape-bottom shape-fluid-x svg-shim text-gray-200">
        <svg
          viewBox="0 0 2880 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
            fill="currentColor"
          />
        </svg>
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
      posts: []
    };
  },
  created: function() {
    axios.get("/api/posts").then(response => {
      console.log("posts index", response);
      this.posts = response.data;
    });
  },
  methods: {}
};
</script>
