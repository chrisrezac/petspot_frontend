<template>
  <div class="comments-edit">
    <form v-on:submit.prevent="updateComment()">
      <h1>Edit Comment</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Body:</label>
        <input type="text" class="form-control" v-model="comment.body" />
      </div>
      <input type="submit" class="btn btn-primary" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      comment: {},
      body: "",
      errors: []
    };
  },
  created: function() {
    axios.get(`/api/comments/${this.$route.params.id}`).then(response => {
      this.comment = response.data;
      console.log(this.comment);
    });
  },
  methods: {
    updateComment: function() {
      var params = {
        body: this.comment.body
      };
      axios
        .patch(`/api/comments/${this.comment.id}`, params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/posts/${response.data.post_id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
