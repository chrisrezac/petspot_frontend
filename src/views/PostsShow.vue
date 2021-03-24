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
            <a class="card-meta" href="#!">
              <!-- Divider -->
              <hr class="card-meta-divider" />

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
              <h6 class="text-uppercase text-muted mr-2 mb-0">
                {{ post.pet.name }}
              </h6>

              <!-- Edit/Delete Buttons -->
              <div class="btn-group" role="group" aria-label="Basic example">
                <button>
                  <router-link
                    v-if="isMyPet()"
                    :to="`/posts/${post.id}/edit`"
                    class="btn btn-link"
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
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Display Comments on Post-->

    <div v-for="comment in post.comments" v-bind:key="comment.id">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-4 d-flex">
          <!-- Comments Card -->
          <div class="card mb-6 mb-xl-0 shadow-light-sml">
            <!-- Commenter Avatar Icon -->

            <a class="card-body" href="#!">
              <div class="card-body"></div>

              {{ comment.user.username }}: {{ comment.body }}
              <div class="row justify-content-start"></div>
            </a>

            <!-- Shape -->
            <div class="position-relative">
              <div class="shape shape-fluid-x shape-bottom text-white"></div>
            </div>

            <!-- Meta -->
            <a class="card-meta" href="#!">
              <!-- Divider -->
              <hr class="card-meta-divider" />
              <div class="card card-border border-primary"></div>
              <!-- Buttons on Comment Cards -->
              <div class="container">
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Edit Button -->
                    <router-link
                      v-if="isCommenter(comment)"
                      :to="`/comments/${comment.id}/edit`"
                      class="btn btn-primary-soft"
                      >Edit</router-link
                    >
                  </div>

                  <div class="col">
                    <!-- Delete Button -->
                    <button
                      v-if="isCommenter(comment)"
                      v-on:click="destroyComment()"
                      class="btn btn-danger-soft"
                    >
                      Delete Comment
                    </button>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- create new comments -->
    <br />
    <br />
    <br />
    <br />
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
