<template>
  <div class="container-resident">
    <SuccessAlert ref="success-alert" message="Succesvol aangepast verhaal!" />

    <div class="resi-header d-print-none">
      <img class="rounded-circle" :src="'TODO NULL'">
      <h1 class="resi-header-displayname">{{ $route.params.slug }}</h1>
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
          <b-form-textarea id="textarea1" v-model="newStory" :no-resize=true placeholder="Vertel het verhaal" :rows="3" maxlength="250"
            :max-rows="6">
          </b-form-textarea>
          <p>
            <strong>{{ charactersRemaining }}</strong> resterende tekens</p>
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

            <b-form-input id="youtubeUrl" type="text" placeholder="https://www.youtube.com/watch?v=ffSnk4v3aeg" @input="addYoutube" v-model="youtubeUrl">
            </b-form-input>
          </b-form-group>
        </div>

        <b-form-group id="CategoryInputGroup" label-for="categoryInput">
          <b-form-select id="categoryInput" v-model="newAlbum" :options="this.albums.map(a => ({
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
        <a href="/stories/create" class="btn btn-primary d-flex justify-content-center align-items-center mb-1 d-print-none mx-auto">
          <i class="material-icons">add</i>Verhaal toevoegen
        </a>
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
      </div>
      <!-- ./col-md-8 -->
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>

      <gallery
        :images="gallery"
        :index="index"
        :options="{youTubePlayerVars: { showinfo: 0, rel: 0, autoplay: 1, modestbranding: 1 }, youTubeClickToPlay: false}"
        @close="index = null">
      </gallery>

	<!-- Modal to edit a story -->
	<b-modal ref="editModalRef" id="editStoryModal" hide-footer
		 title="Bewerk tekst">

	  <b-form-textarea id="formEdit"
	  		   v-model="form.description"
	  		   :rows="3"
	  		   :max-rows="6">
	  </b-form-textarea>
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

	  <a
    href="/stories/create"
	    v-if="this.albums.length > 0"
	    variant="primary" size="sm"
	    id="addStoryBtn"
	    class="btn btn-primary btn-sm d-flex justify-content-center align-items-center mb-1 d-print-none">
	    <i class="material-icons">add</i>Verhaal toevoegen
	  </a>

	  <div v-for="(album, imageIndex) in albums"
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

		      <b-btn variant="primary" @click="index = story['index']"
			     v-if="story['type'] == 'youtube'"
			     class="btn-play d-flex justify-content-center align-items-center">
			<i class="material-icons md-32 mx-auto">play_arrow</i>
		      </b-btn>

		      <b-btn variant="primary" @click="index = story['index']"
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
			     @click="showDeleteModal(index, story.id)">
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
	    <a href="javascript:window.print()" class="btn btn-sm btn-primary d-flex align-items-center" :disabled="checkedStories.length > 0"><i class="material-icons mr-2">print</i> Print</a>
	  </div>
	</div>
      </div>
    </section>
    </div>
    </div>
  <!-- container -->
</template>

<script>
import SuccessAlert from "@/components/SuccessAlert";
import axios from "axios";
//import { upload } from '@/assets/js/file-upload.service';

const MAX_INPUT_LENGTH = 250;

export default {
  middleware: "authentication",
  data() {
    return {
      albums: [],
      albumId: 2,
      checkedStories: [],
      editStory: "",
      errored: false,
      focusStory: null,
      form: {
        newAlbum: null,
        description: null
      },
      gallery: [],
      imagePreview: null,
      image: null,
      index: null,
      loading: false,
      newAlbum: "",
      newStory: "",
      previewType: false,
      seen: true,
      stories: [],
      storyToEdit: "",
      storyToDelete: "",
      storyIndex: null,
      text: "",
      storyId: "",
      text: "",
      uploadError: null,
      uploadFieldName: "photos",
      uploadedFile: null,
      url: "https://api.prisma.care/v1",
      youtubeUrl: ""
    };
  },
  components: {
    SuccessAlert
  },
  mounted() {
    this.loadStories();
    this.reset();
  },
  computed: {
    charactersRemaining: function() {
      return MAX_INPUT_LENGTH - this.newStory.length;
    },
    tweetIsOutOfRange: function() {
      return (
        this.charactersRemaining == MAX_INPUT_LENGTH ||
        this.charactersRemaining < 0
      );
    },
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
    },
    isValid() {
      return this.newStory != "" && this.newAlbum != "" ? false : "disabled";
    }
  },
  methods: {
    addYoutube() {
      this.videoAdded = true;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;
      this.createImage(files[0]);
      this.seen = false;
      this.image = e.target.files[0];
    },
    addStory() {
      var storyUrl = `${this.url}/patient/${this.$store.state.patient}/story`;
      var body = {
        albumId: this.newAlbum,
        description: this.newStory,
        creatorId: this.userId
      };

      // TODO AUTOMATICALLY

      axios
        .post(storyUrl, body)
        .then(response => {
          this.storyId = response.data.response.id;
          const storyUrl = `${this.url}/patient/${
            this.$store.state.patient
          }/story/${this.storyId}/asset`;

          let formData = new FormData();
          formData.append("asset", this.image);
          axios
            .post(storyUrl, formData)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
              this.errored = true;
            });
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },
    // addStoryFile() {
    //   console.log(this.storyId);
    // },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = e => {
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    deleteStory() {
      var storyUrl = `${this.url}/patient/${this.$store.state.patient}/story/${
        this.storyToDelete
      }`;

      axios
        .delete(storyUrl)
        .then(response => {
          this.albums.splice(this.storyIndex, 1);
          this.showAlert();
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
      this.hideDeleteModal();
    },
    editStory() {
      var storyUrl = `${this.url}/patient/${this.$store.state.patient}/story/${
        this.focusStory
      }`;

      var body = {
        description: this.form.description,
        creatorId: this.userId
      };

      axios
        .patch(storyUrl, body)
        .then(response => {
          SuccessAlert.methods.showAlert();
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
      this.hideEditModal();
    },
    getYouTubeThumb(url) {
      const id = this.getYouTubeID(url);
      if (id) {
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      } else {
        return null;
      }
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

    onSubmit(evt) {
      this.addStory();

      this.hideAddModal();
    },
    reset() {
      this.uploadError = null;
      this.uploadedFiles = [];
      this.seen = true;
    },
    showAddModal() {
      this.$refs.addModalRef.show();
    },
    showEditModal(indexStory, currentStory) {
      this.form.description = currentStory.description;
      this.focusStory = currentStory.id;
      this.storyIndex = indexStory;
      this.$refs.editModalRef.show();
    },
    showDeleteModal(indexStory, currentStory) {
      this.storyToDelete = currentStory;
      this.storyIndex = indexStory;
      this.$refs.deleteModalRef.show();
    },
    showMediaPreview(mediaType) {
      this.previewType = mediaType;
    },
    getYouTubeID(url) {
      const match = /v=(\w*)$/.exec(url);
      if (match) {
        return match[1];
      } else {
        return null;
      }
    },
    loadStories() {
      // var appId = "appzWizY3DXnCjpgh";
      // var appKey = "keyuzHdBFw9QQKZCC";
      // var slug = this.$route.params.slug;

      axios
        .get(`${this.url}/patient/${this.$store.state.patient}/album`)
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
                  const ytid = this.getYouTubeID(story.source);
                  slide.href = story.source;
                  if (ytid) {
                    slide.poster = this.getYouTubeThumb(story.source);
                    slide.youtube = ytid;
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
                      "Bearer " + this.$store.state.auth
                    );
                    oReq.responseType = "arraybuffer";
                    oReq.onload = function(oEvent) {
                      var arrayBuffer = oReq.response;
                      resolve(oReq);
                    };
                    oReq.send(null);
                  });

                  function arrayBufferToDataUrl(buffer, type) {
                    const base64 = btoa(
                      [].reduce.call(
                        new Uint8Array(buffer),
                        (p, c) => p + String.fromCharCode(c),
                        ""
                      )
                    );
                    return `data:${type};base64,${base64}`;
                  }
                  getImg.then(response => {
                    const type = response.getResponseHeader("content-type");
                    document.querySelector(
                      `#story-${story.id} > img`
                    ).src = arrayBufferToDataUrl(response.response, type);
                  });
                }

                this.gallery.push(slide);
              }
            });
          });
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
