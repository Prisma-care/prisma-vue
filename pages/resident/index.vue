<template>
  <div class="container-resident">

    <div class="resi-header d-print-none">
      <img class="rounded-circle" :src="require(`@/assets/img/residents/avatar.png`)">
      <h1 class="resi-header-displayname">Mr. {{this.$store.state.auth.user.response.patients[0].last_name}}</h1>
      <h2>{{`${this.$store.state.auth.user.response.patients[0].first_name} ${this.$store.state.auth.user.response.patients[0].last_name}`}}</h2>
    </div>

    <div class="resi-nav">
      <nav id="navbar-albums" class="nav d-print-none justify-content-center">
        <a v-for="album in albums" v-bind:key="album.id" :href="'#' + album.title" class="nav-link">
          {{ album.title }}
        </a>
      </nav>
    </div>

    <div class="container">

      <!-- Modal to add a story -->
      <b-modal ref="addModalRef" class="story-add" id="addStoryModal" hide-footer title="Voeg verhaal toe">

	<div class="media">
          <img class="mr-3 rounded-circle" src="'TODO NULL'" alt="Avatar Afbeelding">
          <div class="media-body">
            <b-form-textarea id="textarea1" v-model="formAdd.description" :no-resize=true placeholder="Het verhaal moet kort zijn." :rows="3" maxlength="250"
			     :max-rows="6">
            </b-form-textarea>
          </div>
	</div>

	<b-form>

          <div class="story-add-media d-flex justify-content-start mb-4">
            <b-btn variant="light" size="sm" class="d-flex align-items-center mr-2" @click="showMediaPreview('photo')">
              <i class="material-icons mr-2">camera_alt</i> Foto
            </b-btn>

            <b-btn variant="light" size="sm" class="d-flex align-items-center" @click="showMediaPreview('video')">
              <i class="material-icons mr-2">movie</i> Video
            </b-btn>
          </div>

          <div class="story-add-photopreview" v-if="image && seen == false">
            <div class="card">
              <img :src="imagePreview" class="img-responsive" width="125" height="125">
              <div class="card-img-overlay text-right p-1">
		<a href="#" @click="hideMedia" class="close text-white">×</a>
              </div>
            </div>
          </div>

          <div v-if="previewType == 'photo' && seen" class="dropbox">
            <input type="file" :name="uploadFieldName" @change="onFileChange" accept="image/*" class="input-file">
            <p>
              <i class="material-icons">arrow_upward</i>
              <br> Sleep uw bestand hier of klik om te bladeren.
            </p>
          </div>

          <div class="mt-4" v-if="previewType == 'video'">
            {{ this.reset() }}

            <b-form-group id="" label="" label-for="">

              <label for="youtubeUrl">YouTube Link:</label>

              <b-form-input id="youtubeUrl" type="text"
			    placeholder="https://www.youtube.com/watch?v=ffSnk4v3aeg" @input="addYoutube" v-model="formAdd.youtubeUrl">
              </b-form-input>
            </b-form-group>
          </div>

          <b-form-group id="AddCategoryInputGroup" label-for="categoryInput">
            <b-form-select id="categoryInput" v-model="formAdd.category" :options="this.albums.map(a => ({
										value: a.id,
										text: a.title
										}))" required>
            </b-form-select>
          </b-form-group>
          <hr>
          <div class="row">
            <div class="col-12">
              <b-btn type="submit" variant="outline-primary" @click="addStory" block>Voeg Toe</b-btn>
            </div>
          </div>
	</b-form>
      </b-modal>

      <section v-if="errored || this.albums.length == 0" v-cloak class="text-center d-print-none row">
	<div class="col-md-8 mx-auto">
          <p class="lead lead-lg">Wie is {{ $route.params.slug }}?</p>
          <p>
            Help uw families {{ $route.params.slug }} te leren kennen door middel van verhalen over zijn leven.
          </p>
          <b-btn variant="primary" class="btn-circle d-flex justify-content-center
					  align-items-center mb-1 d-print-none mx-auto" @click="showAddModal">
            <i class="material-icons">add</i>Verhaal toevoegen
          </b-btn>
          <a href="https://prisma.care/levensverhaal-posters/">
            <b-img thumbnail src="https://prisma.care/wp-content/uploads/2018/05/prisma-poster-maken-pelgrims.jpg" alt="Poster maken"
		   />
          </a>
          <a href="https://prisma.care/levensverhaal-posters/">Hoe maak je een poster?</a>
          <hr class="mt-4">
          <h2 class="mb-3">Hulp van je familie</h2>
          <p>Wie heeft er nog foto's van
            <strong>{{ $route.params.slug }}
            </strong>, en kan de verhalen aanvullen?</p>
          <b-btn href="/invite" variant="outline-primary" class="btn-add">
            <i class="material-icons md-18 mr-2">email</i>Nodig familie uit
          </b-btn>
	</div> <!-- ./col-md-8 -->
      </section>

      <section v-else>
	<div v-if="loadingStories">Loading...</div>
	<div v-else>

	  <gallery
            :images="galleryImages"
            :index="galleryIndex"
            :options="{youTubePlayerVars: { showinfo: 0, rel: 0, autoplay: 1, modestbranding: 1 }, youTubeClickToPlay: false}"
            @close="galleryIndex = null">
	  </gallery>

	  <!-- Modal to edit a story -->
	  <b-modal ref="editModalRef" id="editStoryModal" hide-footer
		   title="Bewerk tekst">

	    <b-form-textarea id="formEdit"
	  		     v-model="formEdit.description"
	  		     :rows="3"
	  		     :max-rows="6">
	    </b-form-textarea>

	    <b-form-group id="editCategoryInputGroup" label-for="categoryInput">
              <b-form-select id="categoryInput" v-model="formEdit.category" :options="this.albums.map(a => ({
	  									value: a.id,
	  									text: a.title
	  									}))" required>
            </b-form-select>
          </b-form-group>
	  <hr>
	  <div class="row">
	    <div class="col-12">
	      <b-btn variant="outline-primary" @click="editStory()" block>Bewerk tekst</b-btn>
	    </div>
	  </div>
	</b-modal>

	<!-- Modal to delete a story -->
	<b-modal ref="deleteModalRef" id="deleteStoryModal" hide-footer
		 title="Bevestiging van de onderdrukking">
	  <p>Weet je zeker dat je dit verhaal wilt verwijderen?</p>
	  <div class="row">
	    <div class="col-12">
	      <b-btn variant="outline-danger" @click="deleteStory()" block>Verwijderen</b-btn>
	    </div>
	  </div>
	</b-modal>

	<div class="story-container">

	  <b-btn v-if="this.albums.length > 0"
	    variant="primary" size="sm"
	    id="addStoryBtn"
	    class="btn btn-primary btn-sm d-flex justify-content-center align-items-center mb-1 d-print-none">
	    <i class="material-icons">add</i>Verhaal toevoegen
	  </b-btn>

	  <div v-for="(album, albumIndex) in albums"
	       v-bind:key="album.id + 'stories'">
	    <div class="story-category" :id="album.title">
	      <div class="story-category-header">
		<h2>{{ album.title }}</h2>
	      </div>
	      <div class="row">
		<div v-for="story in album.stories"
		     class="story col-md-6 col-lg-4 d-print-none"
		     v-bind:key="story.id"
		     v-bind:class="{checked: checkedStories.includes(story.id),
				   'd-print-block':
				   checkedStories.includes(story.id)}">

		  <div v-if="story['type'] == 'image' || story['type'] == 'youtube'">

		    <b-card title="Card Title"
			    :img-src="story.type === 'youtube' ? getYouTubeThumb(story.source) : 'undefined'"
			    img-alt="Image"
			    img-top
			    :id="'story-' + story.id"
			    :key="story.id"
			    :ref="story.id"
			    no-body
			    class="d-flex align-self-center">

		      <b-badge v-if="story['Year']" variant="dark" class="story-year">
			{{ story['Year'] }}
		      </b-badge>

		      <b-btn variant="primary" @click="galleryIndex = story.index"
			     v-if="story['type'] == 'youtube'"
			     class="btn-play d-flex justify-content-center align-items-center">
			<i class="material-icons md-32 mx-auto">play_arrow</i>
		      </b-btn>

		      <b-btn variant="primary" @click="galleryIndex = story.index"
			     v-if="story['type'] == 'image'"
			     class="btn-zoom d-flex justify-content-center align-items-center">
			<i class="material-icons md-32 mx-auto">zoom_out_map</i>
		      </b-btn>

		      <div class="card-img-overlay">
			<div class="d-flex align-items-center">
			  <input type="checkbox" :id="story.id" :value="story.id" v-model="checkedStories" class="checkbox" number>
			  <label class="form-check-label" :for="story.id">Selecteer</label>
			</div>
		      </div>
		    </b-card>
		  </div>

		  <p v-if="story['type'] == 'image' ||
			   story['type'] == 'youtube'"
		     class="mt-3">{{ story['description'] }}</p>

		  <div class="card card_text"
		       v-if="!story['type']">
		    <div class="card-body">
		      {{ story['description'] }}
		    </div>
		  </div>

		  <div class="row">

		    <div class="col-12">
		      <b-btn v-if="story['description'] && !story['source']"
			     variant="outline-light" size="sm"
			     class="btn-edit d-flex justify-content-center align-items-center mb-2"
			     @click="showEditModal">
			<i class="material-icons md-18 mr-2">add_photo_alternate</i> Voeg beeld toe <em>TODO</em>
		      </b-btn>
		    </div>

		    <div class="col-6">
		      <b-btn v-if="story['description']"
			     variant="outline-light" size="sm"
			     class="btn-edit d-flex justify-content-center align-items-center"
			     @click="showEditModal(index, story)">
			<i class="material-icons md-18 mr-2">edit</i> Pas tekst aan
		      </b-btn>

		      <b-btn v-if="!story['description']"
			     variant="outline-light" size="sm"
			     class="btn-add d-flex justify-content-center align-items-center"
			     @click="showEditModal">
			<i class="material-icons md-18 mr-2">edit</i> Voeg tekst toe
		      </b-btn>
		    </div>

		    <div class="col-6">
		      <b-btn variant="outline-danger" size="sm"
			     class="d-flex justify-content-center
				    align-items-center"
			     @click="showDeleteModal(index, story)">
			<i class="material-icons md-18 mr-2">clear</i> Deleten
		      </b-btn>
		    </div>
		  </div>
		</div> <!-- ./v-for="(album, index) in albums" -->
	      </div> <!-- ./row -->
	    </div> <!-- ./story-category -->
	  </div> <!-- ./story-container -->

	  <div class="container d-flex text-muted">
	    <div class="mr-auto d-flex align-items-center">
	      <input type="checkbox" id="selectAllCheckbox" v-model="selectAll" class="mr-1">
	      <span v-if="checkedStories.length == 0">
		Selecteer de verhalen die je wilt printen
	      </span>

	      <span>
		<b-badge v-if="checkedStories.length > 0" pill variant="primary">
		  {{ checkedStories.length }}
		</b-badge>

		geselecteerd
	      </span>
	    </div>
	    <a href="javascript:window.print()" class="btn btn-sm
						       btn-primary d-flex align-items-center"
	       :disabled="checkedStories.length > 0"><i class="material-icons mr-2">print</i> Print</a>
	  </div>
	</div>
      </div>
    </section>
    </div>  <!-- ./container -->
  </div>  <!-- ./container-resident -->
</template>

<script>
import storyService from "@/services/story";
import videoUtils from "@/utils/video";
import arrayBufferToDataUrl from "@/utils/image";
import axios from "axios";

import VueGallery from "vue-gallery";

export default {
  middleware: "notAuthenticated",
  data() {
    return {
      albums: [],
      checkedStories: [],
      formAdd: {
        category: null,
        description: null,
        youtubeUrl: null
      },
      formEdit: {
        category: null,
        description: null
      },
      errored: false,
      focusIndex: null,
      focusStory: null,
      galleryImages: [],
      galleryIndex: null,
      image: null,
      imagePreview: null,
      index: null,
      loadingStories: false,
      previewType: false,
      seen: true,
      stories: [],
      text: "",
      uploadFieldName: "photos",
      videoAdded: false
    };
  },
  components: {
    gallery: VueGallery
  },
  mounted() {
    this.getStories();
    console.log(axios.defaults.headers);
    this.reset();
  },
  computed: {
    selectAll: {
      get: function() {
        return this.stories
          ? this.checkedStories.length == this.albums.length
          : false;
      },
      set: function(value) {
        var checkedStories = [];
        if (value) {
          this.stories.forEach(story => {
            checkedStories.push(story.id);
          });
        }
        this.checkedStories = checkedStories;
      }
    }
  },
  methods: {
    addStory() {
      var body = {
        albumId: this.formAdd.category,
        description: this.formAdd.description,
        creatorId: this.$store.state.user
      };

      var patientId = this.$store.state.patient.id;

      storyService
        .addStory(patientId, body)
        .then(response => {
          let storyId = response.data.response.id;

          if (this.image != null) {
            storyService
              .addImageToStory(
                patientId,
                storyId,
                new FormData().append("asset", this.image)
              )
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.log(error);
                this.errored = true;
              });
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.image = null));
    },
    addYoutube() {
      this.videoAdded = true;
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = e => {
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    getYouTubeThumb(url) {
      videoUtils.getYouTubeThumb(url);
    },
    deleteStory() {
      var patientId = this.$store.state.patient.id;
      storyService
        .deleteStory(patientId, this.focusStory)
        .then(response => {
          this.albums.splice(this.focusIndex, 1);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
      this.hideDeleteModal();
    },
    editStory() {
      var body = {
        // category: this.formEdit.category,
        description: this.formEdit.description,
        creatorId: this.$store.state.user
      };

      var patientId = this.$store.state.patient.id;

      storyService
        .editStory(patientId, this.focusStory, body)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
      this.hideEditModal();
    },
    getStories() {
      const patientId = this.$store.state.auth.user.response.patients[0]
        .patient_id;

      storyService
        .getStories(patientId)
        .then(response => {
          this.albums = response.data.response;

          this.albums.forEach(album => {
            album.stories.sort(
              (story1, story2) =>
                Date.parse(story1.createdAt.date) >
                Date.parse(story2.createdAt.date)
            );
          });

          this.albums.forEach((album, outerIndex) => {
            album.stories = album.stories.map((v, i) => {
              v.index = outerIndex + i;
              return v;
            });
          });

          this.albums.forEach(album => {
            album.stories.forEach(story => {
              if (story) {
                const slide = {
                  title: story.description
                };

                if (story.type === "youtube") {
                  const youtubeId = videoUtils.getYouTubeID(story.source);
                  slide.href = story.source;
                  if (youtubeId) {
                    slide.poster = videoUtils.getYouTubeThumb(story.source);
                    slide.youtube = youtubeId;
                  }
                  slide.type = "text/html";
                } else if (story.type === "image") {
                  slide.href = story.source;
                  slide.type = "image/jpeg";

                  let getImg = new Promise((resolve, reject) => {
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET", story.source, true);
                    oReq.setRequestHeader(
                      "Authorization",
                      "Bearer " + this.$store.state.auth.user.response.token
                    );
                    oReq.responseType = "arraybuffer";
                    oReq.onload = function(oEvent) {
                      var arrayBuffer = oReq.response;
                      resolve(oReq);
                    };
                    oReq.send(null);
                  });

                  getImg.then(response => {
                    const type = response.getResponseHeader("content-type");
                    document.querySelector(
                      `#story-${story.id} > img`
                    ).src = arrayBufferToDataUrl(response.response, type);
                  });
                }

                this.galleryImages.push(slide);
              }
            });
          });
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loadingStories = false));
    },
    hideAddModal() {
      this.$refs.addModalRef.hide();
    },
    hideEditModal() {
      this.$refs.editModalRef.hide();
    },
    hideDeleteModal() {
      this.$refs.deleteModalRef.hide();
    },
    hideMedia() {
      this.reset();
      this.previewType = false;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;

      this.createImage(files[0]);
      this.seen = false;
      this.image = e.target.files[0];
    },
    onSubmit(evt) {
      this.addStory();
      this.hideAddModal();
    },
    reset() {
      this.seen = true;
    },
    showAddModal() {
      this.$refs.addModalRef.show();
    },
    showDeleteModal(index, story) {
      this.focusStory = story.id;
      this.focusIndex = index;
      this.$refs.deleteModalRef.show();
    },
    showEditModal(index, story) {
      this.focusStory = story.id;
      this.formEdit.description = story.description;
      this.$refs.editModalRef.show();
      this.focusIndex = index;
    },
    showMediaPreview(mediaType) {
      this.previewType = mediaType;
    }
  }
};
</script>
