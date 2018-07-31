<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <h1 class="col-lg-12 mb-3">Meld je aan bij Prisma</h1>
        <b-form class="col-lg-12">
          <b-form-group>
            <b-form-input id="email" name="email" type="email" v-model="email" placeholder="Jouw email adres"></b-form-input>
            <label for="email">Email</label>
          </b-form-group>
          <b-form-group>
            <b-form-input id="password" type="password" v-model="password" placeholder="Kies een wachtwoord"></b-form-input>
            <label for="password">Wachtwoord</label>
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

<script>
import Cookie from 'js-cookie';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthentication';
export default {
  middleware: 'authenticated',
  data() {
    return {
      email: '',
      password: '',
      apiUrl: 'https://api.prisma.care/v1',
    };
  },
  computed: {
    isValid() {
      return (this.email !== '', this.password !== '') ? false : 'disabled';
    },
  },
  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch('auth/login', user)
        .then(result => {
          this.$router.push('/resident');
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>
