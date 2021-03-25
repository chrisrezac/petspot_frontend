<template>
  <!-- Display User Show Page -->
  <div class="users-show">
    <!-- HEADER
    ================================================== -->
    <header class="bg-dark pt-9 pb-11 d-none d-md-block">
      <div class="container-md">
        <div class="row align-items-center">
          <div class="col">
            <!-- Heading -->
            <h1 class="font-weight-bold text-white mb-2">
              {{ user.username + "'s " + "Account" }}
            </h1>
          </div>
          <div class="col-auto">
            <!-- Button -->
            <div class="avatar avatar-xl">
              <img
                class="avatar-img rounded-circle"
                :src="user.image_url"
                alt="..."
              />
            </div>
          </div>
        </div>
        <!-- / .row -->
      </div>
      <!-- / .container -->
    </header>

    <!-- MAIN
    ================================================== -->
    <main class="pb-8 pb-md-11 mt-md-n6">
      <div class="container-md">
        <div class="row">
          <div class="col-12 col-md-3">
            <!-- Card -->
            <div
              class="card card-bleed border-bottom border-bottom-md-0 shadow-light-lg"
            >
              <!-- Collapse -->
              <div class="collapse d-md-block" id="sidenavCollapse"></div>
            </div>
          </div>
          <div class="col-12 col-md-9">
            <!-- Card -->
            <div class="card card-bleed shadow-light-lg">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Heading -->
                    <h4 class="mb-0">{{ user.username + "'s " }} Pets</h4>
                  </div>
                  <div class="col-auto">
                    <!-- Button -->
                    <router-link
                      v-if="isCurrentUser()"
                      to="/pets/new"
                      tag="button"
                      class="btn btn-primary-soft"
                      >Create New Pet</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="card-body">
                <!-- List group -->
                <div
                  v-for="pet in user.pets"
                  v-bind:key="pet.id"
                  class="list-group list-group-flush"
                >
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <!-- Avatar -->
                        <div class="avatar avatar-xl">
                          <router-link :to="`/pets/${pet.id}`">
                            <img
                              class="avatar-img rounded-circle"
                              :src="pet.image_url"
                              alt="..."
                            />
                          </router-link>
                        </div>
                      </div>
                      <div class="col-6 ml-n5">
                        <!-- Heading -->
                        <p class="mb-0">
                          {{ pet.name }}
                        </p>
                      </div>
                      <div v-if="isCurrentUser()" class="col-auto ml-auto">
                        <router-link :to="`/pets/${pet.id}/edit`"
                          >Edit</router-link
                        >
                      </div>
                      <button
                        class="btn btn-danger-soft"
                        v-if="isCurrentUser()"
                        v-on:click="destroyPet()"
                      >
                        Delete Pet
                      </button>
                    </div>
                  </div>
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- / .row -->
      </div>
      <!-- / .container -->
    </main>
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
          this.$router.push(`"/users/${this.user.id}"`);
        });
      }
    },
    destroyPet: function() {
      if (confirm("Are you sure you want to delete this pet?")) {
        axios.delete(`/api/pets/16`).then(response => {
          console.log(response.data);
          this.$router.push(`/pets`);
        });
      }
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
