<template>
  <div class="col-6 col-md-4 col-lg-3">
    <nuxt-link :to="'/residents/' + slug">
      <b-card :img-src="require(`@/assets/img/residents/${picture}`)"
	      img-alt="'Afbeelding van ' + name"
	      img-top
	      class="mb-4 box-shadow">
	<p class="card-text text-center">{{ name }}</p>
      </b-card>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["id", "picture", "name", "slug"]
};
</script>
