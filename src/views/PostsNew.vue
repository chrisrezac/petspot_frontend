<template>
  <div class="posts-new">
    <h1>New Post</h1>
    <form v-on:submit.prevent="createPost()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="title" />
      </div>
      <div class="form-group">
        <label>Body:</label>
        <input type="text" class="form-control" v-model="body" />
      </div>
      <div class="form-group">
        <label>ImageUrl:</label>
        <input type="text" class="form-control" v-model="image_url" />
      </div>
      <input type="submit" class="btn btn-primary" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      body: "",
      image_url: "",
      pet_id: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    createPost: function() {
      var params = {
        title: this.title,
        body: this.body,
        image_url: this.imageUrl,
        pet_id: this.pet_id
      };
      axios
        .post("/api/posts", params)
        .then(response => {
          console.log("posts create", response);
          this.pet.posts.push(response.data);
          console.log(this.pet.posts);
        })
        .catch(error => {
          console.log("posts create error", error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
