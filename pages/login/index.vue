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
          <b-btn variant="primary" @click="onLogin">Aanmelden</b-btn>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import axios from "axios";

export default {
  middleware: "notAuthenticated",
  data() {
    return {
      email: "",
      password: "",
      apiUrl: "https://api.prisma.care/v1"
    };
  },
  methods: {
    onLogin() {
      const user = {
        email: this.email,
        password: this.password
      };
      axios
        .post(this.apiUrl + "/user/signin", user)
        .then(user => {
          console.log(user);
          const { token } = user.data.response;
          this.$store.commit("update", token);
          Cookie.set("jwtToken", token);
          this.$router.push(`/residents/lea`);
        })
        .catch(err => {});
    }
  }
};
</script>
