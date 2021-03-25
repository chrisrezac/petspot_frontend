<template>
  <!-- Display Post Show Page -->
  <div class="posts-show">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-5 col-md-12 col-lg-5 d-flex">
          <!-- Card -->
          <div class="card mb-6 mb-lg-1 shadow-light-lg">
            <!-- Image -->
            <div class="card-img-top">
              <img class="card-img-top" v-bind:src="post.image_url" alt="..." />
            </div>

            <!-- Shape -->
            <div class="position-relative">
              <div class="shape shape-fluid-x shape-bottom svg-shim text-white">
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

            <!-- Body -->
            <a class="card-body" href="#!">
              <!-- Heading -->
              <h3>{{ post.title }}</h3>

              <!-- Text -->
              <p class="mb-0 text-muted">{{ post.body }}</p>
            </a>

            <!-- Meta -->

            <!-- Divider -->
            <hr class="card-meta-divider" />
            <h6 class="text-lowercase text-muted mr-2 mb-0">
              by
            </h6>
            <h6 class="text-uppercase text-muted mr-2 mb-0">
              {{ post.pet.name }}
            </h6>

            <!-- Avatar -->
            <div class="avatar avatar-sm mr-2">
              <router-link :to="`/pets/${post.pet.id}`"
                ><img
                  v-bind:src="post.pet.image_url"
                  alt="..."
                  class="avatar-img rounded-circle"
                />
              </router-link>
            </div>

            <!-- Author -->

            <!-- Edit/Delete Buttons -->
            <div class="btn-group" role="group" aria-label="Basic example">
              <button v-if="isMyPet()">
                <router-link :to="`/posts/${post.id}/edit`" class="btn btn-link"
                  >Edit</router-link
                >
              </button>
              <button
                v-if="isMyPet()"
                v-on:click="destroyPost(currentPost)"
                type="button"
                class="btn btn-danger"
              >
                Delete Post
              </button>
              <button
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                View Comments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Comments</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            v-for="comment in post.comments"
            v-bind:key="comment.id"
            class="modal-body"
          >
            <div class="avatar avatar-xl">
              <router-link :to="`/users/${comment.user.id}`">
                <img
                  class="avatar-img rounded-circle"
                  :src="comment.user.image_url"
                  data-dismiss="modal"
                  alt="..."
                />
              </router-link>
            </div>
            {{ comment.user.username }}: {{ comment.body }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
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
