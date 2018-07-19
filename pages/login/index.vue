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
          <b-btn></b-btn>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  }
};
</script>
