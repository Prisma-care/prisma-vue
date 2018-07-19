<template>
  <div class="container">
    <ul class="list-unstyled">
      <CareHome
	v-for="carehome in carehomes" key="carehome.id"
	:id="carehome.id"
	:city="carehome.city"
	:name="carehome.name" />
    </ul>

    <div class="text-center">
      <b-btn variant="outline-primary" size="sm" id="addCareHomeBtn"
	     class="btn-circle d-flex justify-content-center align-items-center mb-1 d-print-none mx-auto"
	     @click="showAddModal">
	<i class="material-icons">add</i> Verhaal toevoegen
      </b-btn>
    </div>

    <!-- Modal to add a care home -->
    <b-modal ref="addModalRef" class="story-add" id="addCareHomeModal"
	     hide-footer title="Woonzorgcentrum toevoegen">
      <b-form>
      	<b-form-group id="nameInputGroup"
                      label="Naam verpleeghuis:"
                      label-for="nameInput">
          <b-form-input id="nameInput"
      			type="text"
      			v-model="form.name"
      			required
      			placeholder="Sint Monika">
          </b-form-input>
      	</b-form-group>
      	<b-form-group id="cityInputGroup"
                      label-for="cityInput">
          <b-form-select id="cityInput"
      			 :options="cities"
      			 required
      			 v-model="form.city">
          </b-form-select>
      	</b-form-group>
	<hr>
	<div class="row">
	  <div class="col-12">
	    <b-btn variant="outline-primary" block>Voeg Toe</b-btn>
	  </div>
	</div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import CareHome from '@/components/CareHome'

export default {
  data () {
    return {
      cities: [
        { value: null, text: 'Anderlecht' },
        { value: null, text: 'Brussels' },
        { value: null, text: 'Laken' },
	{ value: null, text: 'Vorst' }
      ],
      form: {
        name: '',
        city: null
      }
    }
  },
  components: {
    CareHome
  },
  methods: {
    hideAddModal () {
      this.$refs.addModalRef.hide()
    },
    showAddModal () {
      this.$refs.addModalRef.show()
    }
  },
  asyncData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
	resolve({
	  carehomes: [
	    {
	      id: "1",
	      city: "Vorst",
	      name: "BelleVue",
	    },
	    {
	      id: "2",
	      city: "Anderlecht",
	      name: "Clos Bizet",
	    },
	    {
	      id: "3",
	      city: "Laken",
	      name: "Magnolia",
	    },
	    {
	      id: "4",
	      city: "Brussels",
	      name: "Sint Monika",
	    }
	  ]
	})
      }, 0)
    });
  }
};
</script>
