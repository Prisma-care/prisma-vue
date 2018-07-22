<template>
  <div class="container-alert">
    <transition name="slide-fade">
      <b-alert :show="dismissCountDown"
	       variant="success"
	       @dismiss-count-down="countDownChanged"
	       class="d-flex align-items-center mr-2">
	<i class="material-icons mr-2">done</i> Geschiedenis met <strong>succes</strong> verwijderd!
      </b-alert>
    </transition>
  </div>
</template>

<script>
export default {

  props: ['message'],
  data () {
    return  {
      dismissSecs: 2,
      dismissCountDown: 0
    };
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      // Doesn't work, because dismissCountDown and
      // dismissSecs are undefined.
      this.dismissCountDown = this.dismissSecs;
    }
  },
};
</script>
