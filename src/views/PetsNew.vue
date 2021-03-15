<template>
  <div class="pets-new">
    <h1>New Pet</h1>
    <form v-on:submit.prevent="createPet()">
      <!-- <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul> -->
      Name: <input type="text" v-model="newPetName" />
      Type: <input type="text" v-model="newPetType" />
      Breed: <input type="text" v-model="newPetBreed" />
      Birthday: <input type="text" v-model="newPetBirthday" />
      Bio: <input type="text" v-model="newPetBio" />

      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newPetName: "",
      newPetType: "",
      newPetBreed: "",
      newPetBirthday: "",
      newPetBio: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    createPet: function() {
      var params = {
        name: this.newPetName,
        animal_type: this.newPetType,
        breed: this.newPetBreed,
        birthday: this.newPetBirthday,
        bio: this.newPetBio
      };
      axios
        .post("/api/pets", params)
        .then(response => {
          console.log("pets create", response);
          this.$router.push("/pets");
        })
        .catch(error => {
          console.log("pets create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>