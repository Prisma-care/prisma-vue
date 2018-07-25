<template>
  <div class="container mt-4">

    <div class="row">
      <div class="col-md-9 col-lg-8">

        <h1>Voeg een verhaal toe</h1>
        <p class="lead">Welk gespreksonderwerp wil je met het personeel delen?</p>

        <b-form class="needs-validation" novalidate="">

          <div class="form-row">
            <div class="col-6">
              <div class="form-group">
                <select class="form-control" v-model="newAlbum">
                  <option value="">Kies het onderwerp</option>
                  <option>Familie en vrienden</option>
                  <option>Gewoonten en tradities</option>
                  <option>Muziek</option>
                  <option>Vrije tijd</option>
                  <option>School en werk</option>
                  <option>Spel en hobbies</option>
                  <option>Sport</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <a href="#" class="mt-2 small d-flex align-items-center">
                <i class="material-icons md-18">chat</i> Vragen over {chosensubject}</a>
            </div>
          </div>


          <div class="form-row">
            <div class="col-4 col-lg-2">
              <b-form-group label="Jaartal" label-for="year">
                <b-form-input type="text" class="form-control" placeholder="jjjj"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-6">
              <small>Optioneel</small>
            </div>
          </div>


          <b-form-group label="Beschrijving" label-for="description">
            <b-form-textarea v-model="newStory" id="description" class="form-control" type="text" ref="storytext" placeholder="Vertel het verhaal beknopt"
              rows="3" autofocus></b-form-textarea>
          </b-form-group>


          <!-- <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center active" id="photoupload-tab" data-toggle="tab" href="#photoupload" role="tab" aria-controls="photoupload" aria-selected="true"><i class="material-icons mr-2">camera_alt</i> Foto opladen</a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center" id="youtubeadd-tab" data-toggle="tab" href="#youtubeadd" role="tab" aria-controls="youtubeadd" aria-selected="false"><i class="material-icons mr-2">movie</i> Video van Youtube kiezen</a>
          </li>
        </ul> -->

          <b-tabs>

            <!-- Photo tab -->
            <b-tab>
              <template slot="title">
                <i class="material-icons mr-2">camera_alt</i> Foto opladen
              </template>
              <div class="story-add-photopreview" v-if="image && seen == false">
                <div class="card">
                  <img :src="imagePreview" class="img-responsive" width="125" height="125">
                  <div class="card-img-overlay text-right p-1">
                    <a href="#" @click="hideMedia" class="close text-white">×</a>
                  </div>
                </div>
              </div>

              <div >
                <input type="file" :name="uploadFieldName" @change="onFileChange" accept="image/*" class="input-file">
                <p>
                  <i class="material-icons">arrow_upward</i>
                  <br> Sleep uw bestand hier of klik om te bladeren.
                </p>
              </div>
            </b-tab>

            <!-- Youtube tab -->
            <b-tab title="Video van Youtube kiezen">
              Test

            </b-tab>

          </b-tabs>


          <button class="btn btn-primary">Opslaan</button>
        </b-form>
      </div>

      <div class="col-md-3 col-lg-4">
        <img src="../../assets/img/illustration/familycollects.png" alt="" class="img-fluid mb-3 mt-3 px-4">
        <h5>Welke verhalen toevoegen?</h5>
        <p class="lead lead-sm">Inspireer het personeel. Zoek een leuke foto of video om je verhaal te illustreren. Dat kan een eigen foto zijn over
          het leven van Lea, maar even goed een afbeelding van internet of een video van Youtube.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "notAuthenticated",
  data() {
    return {
      newStory: "",
      image: null,
      seen: true,
      previewType: false,
      newAlbum: "",
      imagePreview: "",
      uploadFieldName: "photos"
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;
      this.createImage(files[0]);
      this.seen = false;
      this.image = e.target.files[0];
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = e => {
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    hideMedia() {
      this.reset();
      this.previewType = false;
    },
    reset() {
      this.uploadError = null;
      this.uploadedFiles = [];
      this.seen = true;
    }
  }
};
</script>
