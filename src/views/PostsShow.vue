<template>
  <div class="posts-show">
    <h2>{{ post.title }}</h2>
    <h3>by</h3>
    <h2>{{ `${post.pet.name}` }}</h2>
    <router-link :to="`/pets/${post.pet.id}`" tag="button"
      ><img v-bind:src="post.pet.image_url" width="40" height="40"
    /></router-link>
    <img
      v-bind:src="post.image_url"
      v-bind:alt="post.id"
      width="500"
      height="500"
    />

    <p>{{ post.body }}</p>
    <!-- go back to PostsIndex -->
    <router-link to="/posts" tag="button">Go Back to All Posts</router-link>
    <!-- edit post -->
    <router-link v-if="isMyPet()" :to="`/posts/${post.id}/edit`" tag="button"
      >Edit</router-link
    >
    <!-- delete post -->
    <button v-if="isMyPet()" v-on:click="destroyPost(currentPost)">
      Delete Post
    </button>

    <!-- show comments -->
    <div v-for="comment in post.comments" v-bind:key="comment.id">
      <br />

      <router-link :to="`/users/${comment.user.id}`" tag="button"
        ><img v-bind:src="comment.user.image_url" width="40" height="40"
      /></router-link>
      {{ comment.user.username }}: {{ comment.body }}

      <!-- edit comments -->
      <router-link
        v-if="isCommenter(comment)"
        :to="`/comments/${comment.id}/edit`"
        tag="button"
        >Edit</router-link
      >

      <!-- delete comments -->
      <button v-if="isCommenter(comment)" v-on:click="destroyComment()">
        Delete Comment
      </button>
    </div>

    <!-- create new comments -->
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
          this.post.comments.push(response.data);
          console.log(this.post.comments);
        })
        .catch(error => {
          console.log("comments create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyComment: function() {
      if (confirm("Are you sure you want to delete this comment?")) {
        axios.delete(`/api/comments/${this.comment.id}`).then(response => {
          console.log(response.data);
          this.$router.push(`/posts/${response.data.post_id}`);
        });
      }
    },
    isMyPet: function() {
      if (this.$parent.getUserId() == this.post.pet.id) {
        return true;
      } else {
        return false;
      }
    },
    isCommenter: function(comment) {
      if (this.$parent.getUserId() == comment.user.id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
