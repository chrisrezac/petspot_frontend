<template>
  <div class="posts-index">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">
          <!-- Heading -->
          <h1 class="display-1 font-weight-bold">
            All Posts
          </h1>

          <!-- Text -->
          <p class="lead text-secondary mb-4">
            See all of their favorite moments!
          </p>

          <div v-for="post in posts" v-bind:key="post.id"
          >
            <div class="container">
              <div
                class="row justify-content-center"
                id="portfolio"
                data-isotope='{"layoutMode": "masonry"}'
              >
                <div class="col-12 col-md-4">
                  <!-- Sizes Card -->
                  <div class="card-header">
                    <!-- Heading -->
                    <h3 class="mb-1 font-weight-bold">{{ post.title }}</h3>
                    <!-- Card Border -->
                    <div
                      class="card card-border card-border-lg border-primary"
                    ></div>
                  </div>
                  <!-- Clickable Images of Pets -->
                  <router-link :to="`/posts/${post.id}`"
                    ><img v-bind:src="post.image_url" class="img-fluid"
                  /></router-link>
                </div>
              </div>
            </div>
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
