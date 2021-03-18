<template>
  <div class="posts-show">
    <h2>{{ post.title }}</h2>
    <img v-bind:src="post.image_url" v-bind:alt="post.id" />

    <p>{{ post.body }}</p>
    <router-link to="/posts" tag="button">Go Back to Pets</router-link>
    |
    <router-link :to="`/posts/${post.id}/edit`" tag="button">Edit</router-link>
    |
    <button v-on:click="destroyPost(currentPost)">Delete Post</button>

    <div v-for="comment in post.comments" v-bind:key="comment.id">
      Comment: {{ comment.body }} <br /><br />
      Commenter: {{ comment.username }}
    </div>

    <router-link :to="`/pets/${post.pet.id}`" tag="button"
      >View Pet</router-link
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      post: []
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(response => {
      console.log("posts show", response);
      this.post = response.data;
    });
  },
  methods: {
    destroyPost: function() {
      if (confirm("Are you sure you want to delete this post?")) {
        axios.delete(`/api/posts/${this.post.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/posts");
        });
      }
    }
  }
};
</script>
