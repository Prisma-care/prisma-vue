<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <h1 class="col-lg-12">Login</h1>
        <b-form class="col-lg-12">
          <b-form-group label="Email" label-for="email">
            <b-form-input name="email" type="email" v-model="email" placeholder="Jouw email adres"></b-form-input>
          </b-form-group>
          <b-form-group label="Wachtwoord" label-for="password">
            <b-form-input type="password" v-model="password" placeholder="Kies een wachtwoord"></b-form-input>
          </b-form-group>
          <b-btn 
            variant="primary"
            @click="submit"
            :disabled="isValid">
            Aanmelden
          </b-btn>
        </b-form>
      </div>
    </div>
  </div>
</template>


<style>
  header.main { display: none; }
</style>

<script>
import Cookie from "js-cookie";
import axios from "axios";
import setAuthToken from "../../utils/setAuthentication";

export default {
  middleware: "authenticated",
  data() {
    return {
      email: "",
      password: "",
      apiUrl: "https://api.prisma.care/v1"
    };
  },
  computed: {
    isValid() {
      return (this.email !== "",
          this.password !== "") ?
        false :
        "disabled";
    }
  },
  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("auth/login", user)
        .then(result => {
          this.$router.push("/resident");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
