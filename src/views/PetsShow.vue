<template>
  <div class="pets-show">
    <h1>{{ pet.name }}</h1>
    <img
      v-bind:src="pet.image_url"
      v-bind:alt="pet.name"
      width="500"
      height="500"
    />
    <p>Type: {{ pet.animal_type }}</p>
    <p>Breed: {{ pet.breed }}</p>
    <p>Birthday: {{ pet.birthday }}</p>
    <p>Bio: {{ pet.bio }}</p>

    <router-link to="/pets" tag="button">Go Back to Pets</router-link>

    <router-link v-if="isMyPet()" :to="`/pets/${pet.id}/edit`" tag="button"
      >Edit</router-link
    >

    <button v-if="isMyPet()" v-on:click="destroyPet(currentPet)">
      Delete Pet
    </button>

    <div v-for="post in pet.posts" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>

      <router-link :to="`/posts/${post.id}`" tag="button"
        ><img v-bind:src="post.image_url" width="500" height="500"
      /></router-link>
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
    <p>Owner of Pet: {{ pet.user.username }}</p>

    <router-link :to="`/users/${pet.user.id}`" tag="button"
      ><img v-bind:src="pet.user.image_url" width="40" height="40" />
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

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
