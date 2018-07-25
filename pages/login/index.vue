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
          this.$store.commit("setAuth", token);
          // set token for persistence over sessions
          Cookie.set("jwtToken", token);
          // set token for axios requests
          setAuthToken(`Bearer ${token}`);

          // set patient ID
          const patient = {};
          if (user.data.response.patients.length) {
            patient.id = user.data.response.patients[0].patient_id;
            patient.firstName = user.data.response.patients[0].first_name;
            patient.lastName = user.data.response.patients[0].last_name;
          }
          this.$store.commit("setPatient", patient);
          Cookie.set("patient", patient.id);
          this.$store.commit("setUser", user.data.response.id);
          Cookie.set("user", user.data.response.id);

          this.$router.push("/resident");
        })
        .catch(err => {});
    }
  }
};
</script>
