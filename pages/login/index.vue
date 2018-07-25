<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <h1 class="col-lg-12">Login</h1>
        <b-form class="col-lg-12">
          <b-form-group label="Email" label-for="email">
            <b-form-input type="email" v-model="email"></b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-form-input type="password" v-model="password"></b-form-input>
          </b-form-group>
          <b-btn variant="primary" @click="submit">Aanmelden</b-btn>
        </b-form>
      </div>
    </div>
  </div>
</template>

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
  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("auth/login", user)
        .then(result => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
