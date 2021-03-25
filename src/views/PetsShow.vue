<template>
  <!-- Display Pet Show Page -->
  <div class="pets-show">
    <div class="container">
      <div class="row justify-content-between">
        <div
          class="col-12 col-md-4 position-md-sticky d-flex align-items-center vh-md-100"
          style="top: 0;"
        >
          <!-- Sidebar -->
          <aside class="py-8 py-md-10">
            <!-- Brand -->
            <br />
            <br />
            <br />

            <br />
            <br />
            <br />

            <br />
            <h1>{{ pet.name }}</h1>
            <br />
            <br />
            <div>
              <img v-bind:src="pet.image_url" alt="..." class="img-fluid" />
            </div>

            <!-- Text -->
            <p class="font-size-lg mb-2 text-bold">
              {{ pet.breed }}
            </p>
            <p class="font-size-lg mb-2 text-bold">
              {{ relativeDate(pet.birthday) }}
            </p>
            <p class="font-size-lg mb-2 text-bold">
              {{ pet.bio }}
            </p>

            <!-- List group -->
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <!-- Heading -->
                <router-link
                  v-if="isMyPet()"
                  :to="`/pets/${pet.id}/edit`"
                  class="btn btn-primary-soft"
                  >Edit</router-link
                >
              </li>
              <li class="list-group-item">
                <!-- Heading -->
                <!-- Delete Button -->
                <button
                  class="btn btn-danger-soft"
                  v-if="isMyPet()"
                  v-on:click="destroyPet()"
                >
                  Delete Pet
                </button>
              </li>
            </ul>
          </aside>
        </div>

        <div class="col-12 col-md-7">
          <!-- Images -->
          <section
            v-for="post in pet.posts"
            v-bind:key="post.id"
            class="pb-8 pt-md-12 pb-md-10"
          >
            <h1>{{ post.name }}</h1>
            <router-link
              class="d-block"
              data-fancybox
              data-width="840"
              data-heigt="1000"
              :to="`/posts/${post.id}`"
            >
              <img v-bind:src="post.image_url" alt="..." class="img-fluid" />
            </router-link>
          </section>
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
          this.$router.push(`/users/1`);
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
