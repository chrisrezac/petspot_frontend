<template>
  <div class="posts-index">
    <div>Search: <input type="text" v-model="pet" /></div>
    <h1>All Posts</h1>
    <div v-for="post in filterBy(posts, pet)" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>
      <router-link :to="`/posts/${post.id}`"
        ><img v-bind:src="post.image_url"
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
      posts: [],
      pet: ""
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
