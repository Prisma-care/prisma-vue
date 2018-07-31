<template>
  <div class="container mt-4">

    <div class="row">
      <div class="col-md-9 col-lg-8">

        <h1>Voeg een verhaal toe</h1>
        <p class="lead">Welk gespreksonderwerp wil je met het personeel delen?</p>

        <b-form class="needs-validation" novalidate="">

          <div class="form-row">
            <div class="col-6">
              <b-form-group id="editCategoryInputGroup" label-for="categoryInput">
                <b-form-select id="categoryInput" v-model="form.category" :options="this.albums.map(a => ({
									  value: a.id,
									  text: a.title
									  }))" required>
                </b-form-select>
              </b-form-group>
            </div>
          </div>


          <!-- <div class="form-row">
            <div class="col-4 col-lg-2">
              <b-form-group label="Jaartal" label-for="year">
                <b-form-input type="text" class="form-control" placeholder="jjjj"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-6">
              <small>Optioneel</small>
            </div>
          </div> -->


          <b-form-group>
            <b-form-textarea v-model="form.description" id="description" class="form-control" type="text" ref="storytext" placeholder="Vertel het verhaal beknopt"
			     rows="3" autofocus></b-form-textarea>
	    <label for="description">Beschrijving</label>
          </b-form-group>

          <b-tabs>

            <!-- Photo tab -->
            <b-tab class>
              <template slot="title" >
              <i class="material-icons mr-2 add-icon">camera_alt</i> Foto opladen
              </template>
              <div class="story-add-photopreview" v-if="image && seen == false">
                <div class="card">
                  <img :src="imagePreview" class="img-responsive" width="125" height="125">
                  <div class="card-img-overlay text-right p-1">
                    <a href="#" @click="hideMedia" class="close text-white">×</a>
                  </div>
                </div>
              </div>
	      <div class="dropbox img-fluid form-group">
		  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
	      </div>
            </b-tab>

            <!-- YouTube tab -->
            <b-tab>
              <template slot="title" class="nav-link active">
                <i class="material-icons mr-2 add-icon">movie</i> Video van YouTube kiezen
              </template>
              <div class="form-group mt-2">
                <input v-model="form.youtubeUrl" class="form-control"
		       v-validate="{ required: true,
				   regex:
				   '^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$'}"
                       name="regex" type="text"
		       placeholder="https://www.youtube.com/watch?v=ffSnk4v3aeg">
                  <label for="youtube">YouTube link</label>
              </div>
              <div>
                <img :src="getYouTubeThumb(this.form.youtubeUrl)"  v-if="form.youtubeUrl != null && form.youtubeUrl != ''" width="125" height="125">
              </div>

            </b-tab>

          </b-tabs>

          <button class="btn btn-save btn-primary" @click="addStory">Opslaan</button>
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
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import storyService from '@/services/story';
import albumService from '@/services/album';
import axios from 'axios';
export default {
  middleware: "notAuthenticated",
  data() {
    return {
      albums: [],
      image: null,
      seen: true,
      previewType: false,
      imagePreview: "",
      uploadFieldName: "photos",
      form: {
        category: 0,
        description: null,
        youtubeUrl: null,
      },
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        dictDefaultMessage:
          "<i class='material-icons md-64 text-muted'>cloud_upload</i><br> Klik, of sleep een foto naar hier om op te laden.",
        addRemoveLinks: true,
        maxFilesize: 0.5,
        maxFiles: 1,
        headers: { 'My-Awesome-Header': 'header value' },
      },
    };
  },
  components: {
    vueDropzone: vue2Dropzone,
  },
  mounted() {
    this.getAlbums();
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;
      this.createImage(files[0]);
      this.seen = false;
      this.image = e.target.files[0];
      console.log(this.image);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = e => {
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    getAlbums() {
      const patientId = this.$store.state.auth.user.response.patients[0].patient_id;
      albumService.getAlbums(patientId).then(albums => {
        this.albums = albums.data.response;
        this.albums.splice(0, 0, {
          id: 0,
          title: 'Kies het onderwerp',
          patientId: 1,
          hasNew: false,
          stories: Array(0),
        });
      });
    },
    addStory(e) {
      e.preventDefault();

      const body = {
        albumId: this.form.category,
        description: this.form.description,
        creatorId: this.$store.state.auth.user.response.id
      };

      const patientId = this.$store.state.auth.user.response.patients[0]
        .patient_id;
      storyService
        .addStory(patientId, body)
        .then(response => {
          const storyId = response.data.response.id;
          let formData = new FormData();
          formData.append("asset", this.image);

          if (this.image !== null) {
            storyService
              .addImageToStory(patientId, storyId, formData)
              .then(response => {
                console.log(response);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (this.form.youtubeUrl !== null) {
            storyService
              .addYoutubeToStory(patientId, storyId, this.form.youtubeUrl)
              .then(response => {
                console.log(response);
              })
              .catch(err => {
                console.log(err);
              });
          }
          this.$router.push("/resident");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getYouTubeID(url) {
      var id = url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      );
      return id && id[1];
    },
    getYouTubeThumb(url) {
      const youtubeId = this.getYouTubeID(url);
      if (youtubeId) {
        return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
      } else {
        return null;
      }
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
