<template>
  <div class="email-invite">
    <div class="email-form">
      <div class="container">
        <div v-if="step === 1">
          <div class="row">
            <div class="col-lg-12 mt-4">
              <h1>Nodig familie uit om mee verhalen te verzamelen</h1>
              <p>Stuur hen een uitnodiging via email voor Prisma</p>
            </div>
          </div>
          <div class="row">
            <b-form action="" class="col-lg-12">
              <div class="row">
                <b-form-group label="Voornaam" label-for="firstname" class="col-lg-6 name">
                  <b-form-input type="text" v-model="form.firstname">
                  </b-form-input>
                </b-form-group>
                <b-form-group label="Familienaam" label-for="lastname" class="col-lg-6 name">
                  <b-form-input type="text" v-model="form.lastname"></b-form-input>
                </b-form-group>
              </div>
              <b-form-group label="Email" label-for="email">
                <b-form-input type="email" v-model="form.email">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Onderwerp" label-for="subject">
                <b-form-input type="text" v-model="form.subject">
                </b-form-input>
              </b-form-group>
              <b-btn @click="next" :disabled="isValid">Volgende stap</b-btn>
            </b-form>
          </div>
        </div>
        <div v-if="step ===2">
          <div class="row">
            <div class="col-lg-12 mt-4">
              <h1>Schrijf een gepersonaliseerd bericht</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 mt-4">
              <h5>Waarvoor heb je hulp nodig?</h5>
            </div>
            <div class="col-lg-3">
              <button class="option" @click="changeExample($event)" value="general">Alles</button>
              <button class="option" @click="changeExample($event)" value="digital">Foto's digitaliseren</button>
              <button class="option" @click="changeExample($event)" value="search">Beelden opzoeken</button>
              <button class="option" @click="changeExample($event)" value="interview">Familie interviewen</button>
            </div>
            <div class="col-lg-9">
              <p>{{example[current_example]}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 mt-3">
                  <h5>Stuur een persoonlijk bericht</h5>
                  <b-form-textarea
                  v-model="message"
                  placeholder="Schrijf hier je persoonlijke boodschap"
                  class="mb-3"
                  >
                  </b-form-textarea>
                <b-btn variant="primary" class="btn-left" @click="prev">Vorige stap</b-btn>
                <b-btn variant="primary"  class="btn-right" :disabled="isValidMessage">Verzenden</b-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="email-expl" v-if="step === 1">
      <p></p>
    </div>
    <div class="email-expl" v-if="step === 2">
      <div class="email-template-header">
        <p>Zo zal je email er uit zien</p>
      </div>
      <div class="email-info">
        <p><span>Aan: </span>{{form.email}}</p>
      </div>
      <div class="email-info">
        <p><span>Onderwerp: </span>{{form.subject}}</p>
      </div>
      <div class="email-body">
        <p>{{message}}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      example: {
        general: `Ik wil van oma al haar mooie herinneringen en verhalen vastleggen, zodat we haar leven mooi kunnen documenteren.
      Om dit te doen is er een applicatie genaamd Prisma.
      Heb je deze week ergens een halfuurtje om een verhaal met een foto toe te voegen?
      Deze foto's kunnen van haar zelf zijn, maar je kan ook gerust een foto van het internet gebruiken.
      Hieronder vind je een link naar een formulier waar je het verhaal kan toevoegen en de andere om het verhaal te bekijken op haar profiel.
      Groetjes Cedric`,
        digital: `Ik wil van oma al haar mooie herinneringen en verhalen vastleggen, zodat we haar leven mooi kunnen documenteren.
      Om dit te doen is er een applicatie genaamd Prisma.
      Heb je deze week ergens een halfuurtje om een verhaal met een foto toe te voegen?
      Deze foto's kunnen van haar zelf zijn, maar je kan ook gerust een foto van het internet gebruiken.
      Hieronder vind je een link naar een formulier waar je het verhaal kan toevoegen en de andere om het verhaal te bekijken op haar profiel.
      Groetjes Cedric`,
        interview: `Ik wil van oma al haar mooie herinneringen en verhalen vastleggen, zodat we haar leven mooi kunnen documenteren.
      Om dit te doen is er een applicatie genaamd Prisma.
      Heb je deze week ergens een halfuurtje om een verhaal met een foto toe te voegen?
      Deze foto's kunnen van haar zelf zijn, maar je kan ook gerust een foto van het internet gebruiken.
      Hieronder vind je een link naar een formulier waar je het verhaal kan toevoegen en de andere om het verhaal te bekijken op haar profiel.
      Groetjes Cedric`,
        search: `Ik wil van oma al haar mooie herinneringen en verhalen vastleggen, zodat we haar leven mooi kunnen documenteren.
      Om dit te doen is er een applicatie genaamd Prisma.
      Heb je deze week ergens een halfuurtje om een verhaal met een foto toe te voegen?
      Deze foto's kunnen van haar zelf zijn, maar je kan ook gerust een foto van het internet gebruiken.
      Hieronder vind je een link naar een formulier waar je het verhaal kan toevoegen en de andere om het verhaal te bekijken op haar profiel.
      Groetjes Cedric`
      },
      current_example: "general",
      form: {
        firstname: "",
        lastname: "",
        email: "",
        subject: ""
      },
      message: ""
    };
  },
  computed: {
    isValid() {
      return (this.form.firstname !== "",
      this.form.lastname !== "",
      this.form.email !== "",
      this.form.subject !== "")
        ? false
        : "disabled";
    },
    isValidMessage() {
      return this.message !== "" && this.message.length >= 5
        ? false
        : "disabled";
    }
  },
  methods: {
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    changeExample(e) {
      this.current_example = e.target.value;
      e.target.value.addClass;
    }
  }
};
</script>
