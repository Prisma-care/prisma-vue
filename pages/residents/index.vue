<template>
  <div class="container">
    <div class="row">
      <Resident
	v-for="resident in residents" key="resident.id"
	:id="resident.id"
        :picture="resident.picture"
	:name="resident.name"
	:slug="resident.slug"/>
    </div>

    <div class="text-center">
      <b-btn variant="outline-primary" size="sm" id="addResidentBtn"
	     @click="showAddModal"
	     class="d-flex justify-content-center align-items-center mb-1 mx-auto">
	<i class="material-icons">add</i> Bewoner toevoegen
      </b-btn>
    </div>

    <!-- Modal to add a care home -->
    <b-modal ref="addModalRef" class="story-add" id="addResidentModal"
	     hide-footer title="Woonzorgcentrum toevoegen">

      <b-form @submit="onSubmit">

      	<b-form-group id="nameInputGroup"
                      label="Naam ingezetene:"
                      label-for="nameInput">
          <b-form-input id="nameInput"
      			type="text"
      			required
      			placeholder="John Doe"
			v-model="form.name">
	  </b-form-input>
      	</b-form-group>

	<b-form-group id="emailInputGroup1"
                      label="E-Mailadres:"
                      label-for="emailInput"
                      description="We zullen uw e-mail nooit met iemand anders delen.">
          <b-form-input id="emailInput1"
			type="email"
			required
			placeholder="john.doe@gmail.com"
			v-model="form.email">
          </b-form-input>
	</b-form-group>

	<hr>

	<div class="row">
	  <div class="col-12">
	    <b-btn variant="outline-primary" block>Voeg toe</b-btn>
	  </div>
	</div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Resident from '@/components/Resident'

export default {
  data () {
    return {
      cities: [
        'Anderlecht', 'Brussels', 'Laken', 'Vorst'
      ],
      form: {
        name: '',
        email: null
      }
    }
  },
  components: {
    Resident
  },
  methods: {
    hideAddModal () {
      this.$refs.addModalRef.hide()
    },
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    showAddModal () {
      this.$refs.addModalRef.show()
    }
  },
  asyncData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
	resolve({
	  residents: [
	    {
	      id: "1",
	      picture: "lea.jpg",
	      name: "Lea",
	      slug: "lea",
	    },
	    {
	      id: "2",
	      picture: "masure.jpg",
	      name: "Mr. Masure",
	      slug: "masure",
	    },
	    {
	      id: "3",
	      picture :"briard.jpg",
	      name: "Mme. Briard",
	      slug: "briard",
	    },
	    {
	      id: "4",
	      picture: "luc.jpg",
	      name: "Luc",
	      slug: "luc",
	    },
	    {
	      id: "5",
	      picture: "feron.jpg",
	      name: "Mr. Feron",
	      slug: "feron",
	    },
	    {
	      id: "6",
	      picture: "felix.jpg",
	      name: "Felix",
	      slug: "felix",
	    },
	    {
	      id: "7",
	      picture: "vooght.jpg",
	      name: "Mme. De Vooght",
	      slug: "vooght",
	    },
	    {
	      id: "8",
	      picture: "pelgrims.jpg",
	      name: "Mme. Pelgrims",
	      slug: "pelgrims",
	    }
	  ]
	})
      }, 0)
    });
  }
};
</script>
