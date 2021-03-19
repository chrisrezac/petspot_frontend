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
    |

    <div v-for="comment in post.comments" v-bind:key="comment.id">
      Comment: {{ comment.body }} <br /><br />
      Commenter: {{ comment.user.username }}
    </div>

    <div class="comments-new">
      <h1>New Comment</h1>
      <form v-on:submit.prevent="createComment()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Body:</label>
          <input type="body" class="form-control" v-model="body" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>
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
      body: "",
      post_id: "",
      user_id: "",
      errors: [],
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
    },
    createComment: function() {
      var params = {
        body: this.body,
        post_id: this.post.id,
        user_id: this.user_id
      };
      axios
        .post("/api/comments", params)
        .then(response => {
          console.log("comments create", response);
          this.$router.push("/comments");
        })
        .catch(error => {
          console.log("comments create error", error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
