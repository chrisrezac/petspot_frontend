<template>
  <!-- Display User Show Page -->
  <div class="users-show">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-4 d-flex">
        <!-- Card -->
        <div class="card mb-6 mb-xl-0 shadow-light-lg">
          <a class="card-body" href="#!">
            <!-- Username -->
            <h1>{{ user.username }}</h1>
          </a>
          <!-- Image -->
          <a class="card-img-top" href="#!">
            <img v-bind:src="user.image_url" alt="..." class="img-fluid" />
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
            <div class="container">
              <div class="row align-items-center">
                <div class="col">
                  <!-- Edit Button -->
                  <router-link
                    v-if="isCurrentUser()"
                    :to="`/users/${user.id}/edit`"
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
                    >Go Back to Pets
                  </router-link>
                </div>
                <div class="col">
                  <!-- Delete Button -->
                  <button
                    class="btn btn-primary-soft"
                    v-if="isCurrentUser()"
                    v-on:click="destroyUser(currentUser)"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Display User's Pets -->

    <h1>{{ `${user.username}` + "'s" + " " + "Pets" }}</h1>

    <div v-for="pet in user.pets" v-bind:key="pet.id">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-4 d-flex">
          <!-- Card -->
          <div class="card mb-6 mb-xl-0 shadow-light-lg">
            <a class="card-body" href="#!">
              <!-- Pet Name -->
              <h2>{{ pet.name }}</h2>
              <div class="card card-border card-border-lg border-primary">
                <div class="card-body"></div>
              </div>
            </a>
            <!-- Image -->
            <a class="card-img-top" href="#!">
              <router-link :to="`/pets/${pet.id}`"
                ><img v-bind:src="pet.image_url" alt="..." class="img-fluid"
              /></router-link>
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
              <div class="container">
                <div class="row align-items-center">
                  <div class="col">
                    <div class="col">
                      <!-- View Pet -->
                      <router-link
                        :to="`/pets/${pet.id}`"
                        tag="button"
                        class="btn btn-primary-soft"
                        >View Pet
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isCurrentUser()" class="pets-new">
      <h1>New Pet</h1>
      <form v-on:submit.prevent="createPet()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label>Type:</label>
          <input type="text" class="form-control" v-model="animalType" />
        </div>
        <div class="form-group">
          <label>Breed:</label>
          <input type="text" class="form-control" v-model="breed" />
        </div>
        <div class="form-group">
          <label>Birthday:</label>
          <input type="text" class="form-control" v-model="birthday" />
        </div>
        <div class="form-group">
          <label>Bio:</label>
          <input type="text" class="form-control" v-model="bio" />
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input type="text" class="form-control" v-model="imageUrl" />
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
      name: "",
      animalType: "",
      breed: "",
      birthday: "",
      bio: "",
      imageUrl: "",
      user: [],
      pets: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      console.log("users show", response);
      this.user = response.data;
    });
  },
  methods: {
    destroyUser: function() {
      if (confirm("Are you sure you want to delete this user?")) {
        axios.delete(`/api/users/${this.user.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/users");
        });
      }
    },
    createPet: function() {
      var params = {
        name: this.name,
        animal_type: this.animalType,
        breed: this.breed,
        birthday: this.birthday,
        bio: this.bio,
        image_url: this.imageUrl
      };
      axios
        .post("/api/pets", params)
        .then(response => {
          console.log("pets create", response);
          this.user.pets.push(response.data);
          console.log(this.user.pets);
        })
        .catch(error => {
          console.log("pets create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    isCurrentUser: function() {
      if (this.$parent.getUserId() == this.user.id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
