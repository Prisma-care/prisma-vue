<template>
  <li class="card mb-3 pb-3 pt-3">
    <div class="container">
      <div class="row">
        <div class="col">
          <h5><a href="" class="card-title">{{ name }}</a></h5>
          <span class="text-muted">{{ city }}</span>
        </div>
        <div class="col text-right">
	  <b-btn variant="outline-secondary" size="sm" @click="showEditModal"
	    class="btn-edit">
	    <i class="material-icons md-18">edit</i> Bewerken
	  </b-btn>
        </div>
	<b-modal ref="editModalRef" class="story-add" id="editCareHomeModal"
		 hide-footer :title="'Bewerken ' + name">
	  <b-form @submit="onSubmit">
	    <b-form-group id="nameInputGroup"
			  label="Naam verpleeghuis:"
			  label-for="nameInput">
              <b-form-input id="nameInput"
      			    type="text"
      			    required
      			    :placeholder="name"
      			    v-model="form.name">
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
		<b-btn variant="outline-primary" block>Bewerken</b-btn>
	      </div>
	    </div>
	  </b-form>
	</b-modal>
      </div>
    </div>
  </li>
</template>

<script>
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
        city: this.city,
        name: ''
      }
    }
  },
  props: ['name', 'city', 'id'],
  methods: {
    hideEditModal () {
      this.$refs.editModalRef.hide()
    },
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    showEditModal () {
      this.$refs.editModalRef.show()
    }
  }
}
</script>
