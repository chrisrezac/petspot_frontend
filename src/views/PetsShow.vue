<template>
  <!-- Display Pet Show Page -->
  <div class="pets-show">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-4 d-flex">
        <!-- Card -->
        <div class="card mb-6 mb-xl-0 shadow-light-lg">
          <a class="card-body" href="#!">
            <!-- User Avatar Icon -->
            <div class="row justify-content-start">
              <div class="avatar-lg">
                <router-link :to="`/users/${pet.user.id}`"
                  ><img
                    v-bind:src="pet.user.image_url"
                    alt="..."
                    class="avatar-img rounded-circle"
                  />
                </router-link>
              </div>
            </div>
            <!-- Pet Name -->
            <h1 class="display-2 font-weight-bold">{{ pet.name }}</h1>
          </a>
          <!-- Image -->
          <a class="card-img-top" href="#!">
            <img v-bind:src="pet.image_url" alt="..." class="img-fluid" />
          </a>

          <!-- Shape -->
          <div class="position-relative">
            <div class="shape shape-fluid-x shape-bottom text-white"></div>
          </div>

          <!-- Meta -->
          <a class="card-meta" href="#!">
            <!-- Divider -->
            <hr class="card-meta-divider" />

            <!-- Buttons on Profile Card -->

            <h3>{{ pet.bio }}</h3>
            <div class="container">
              <div class="row align-items-center">
                <div class="col">
                  <!-- Edit Button -->
                  <router-link
                    v-if="isMyPet()"
                    :to="`/pets/${pet.id}/edit`"
                    tag="button"
                    class="btn btn-primary-soft"
                    >Edit</router-link
                  >
                </div>
                <div class="col">
                  <!-- Go Back to Pets Button -->
                  <router-link
                    to="/pets"
                    tag="button"
                    class="btn btn-primary-soft"
                    >See All Pets
                  </router-link>
                </div>

                <div class="col">
                  <!-- Delete Button -->
                  <button
                    class="btn btn-primary-soft"
                    v-if="isMyPet()"
                    v-on:click="destroyPet()"
                  >
                    Delete Pet
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Display Pet Posts -->
<br>
    <div v-for="post in pet.posts" v-bind:key="post.id">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-4 d-flex">
          <!-- Card -->
          <div class="card mb-6 mb-xl-0 shadow-light-lg">
            <a class="card-body" href="#!">
              <h3 class="display-1 font-weight-bold">{{ post.title }}</h3>

              <div class="row justify-content-start"></div>
            </a>
            <!-- Image -->
            <a class="card-img-top" href="#!">
              <router-link :to="`/posts/${post.id}`"
                ><img v-bind:src="post.image_url" alt="..." class="img-fluid"
              /></router-link>
            </a>
            <!-- View Post -->
            <router-link
              :to="`/posts/${post.id}`"
              tag="button"
              class="btn btn-primary-soft"
              >View Post
            </router-link>

            <!-- Shape -->
            <div class="position-relative">
              <div class="shape shape-fluid-x shape-bottom text-white"></div>
            </div>

            <!-- Meta -->
            <a class="card-meta" href="#!">
              <!-- Divider -->
              <hr class="card-meta-divider" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isMyPet()" class="posts-new">
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
          <input type="text" class="form-control" v-model="imageUrl" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      title: "",
      body: "",
      imageUrl: "",
      pet_id: "",
      pet: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/api/pets/" + this.$route.params.id).then(response => {
      console.log("pets show", response);
      this.pet = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow("gets rid of ago");
    },
    destroyPet: function() {
      if (confirm("Are you sure you want to delete this pet?")) {
        axios.delete(`/api/pets/${this.pet.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/pets");
        });
      }
    },
    createPost: function() {
      var params = {
        title: this.title,
        body: this.body,
        image_url: this.imageUrl,
        pet_id: this.pet.id
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
    },
    isMyPet: function() {
      if (this.$parent.getUserId() == this.pet.user.id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
