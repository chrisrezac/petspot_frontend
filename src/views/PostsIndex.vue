<template>
  <div class="posts-index">
    <h1>All Posts</h1>
    <div v-for="post in posts" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>
      <router-link :to="`/posts/${post.id}`"
        ><img v-bind:src="post.image_url"
      /></router-link>
      <p>{{ post.body }}</p>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
