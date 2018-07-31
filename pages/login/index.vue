<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <h1 class="col-lg-12 mb-3">Meld je aan bij Prisma</h1>
        <b-form class="col-lg-12" @submit.prevent="submit" novalidate>

          <b-form-group>
            <b-form-input name="email" type="text" v-model="form.email" v-validate="'required|email'"
			  :state="errors.has('email') ? 'invalid' : null"
			  data-vv-validate-on="none" placeholder="Jouw email adres">
	      </b-form-input>
              <label for="email">Email</label>
	      <span class="invalid-feedback" v-show="errors.has('email')">{{ errors.first('email') }}</span>
          </b-form-group>

          <b-form-group>
            <b-form-input name="password" type="password" v-model="form.password" v-validate="'required'"
			  :state="errors.has('password') ? 'invalid' : null"
			  data-vv-validate-on="none" placeholder="Kies een wachtwoord">
	    </b-form-input>
	    <label for="password">Wachtwoord</label>
	    <span class="invalid-feedback" v-show="errors.has('password')">{{ errors.first('password') }}</span>
          </b-form-group>
          <b-btn variant="primary" type="submit">Aanmelden</b-btn>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submit() {
      await this.$validator.validateAll();
      if (this.errors.any()) {
        return;
      }
      const user = {
        email: this.form.email,
        password: this.form.password,
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
