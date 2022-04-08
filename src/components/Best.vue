<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
import Button from "primevue/button";
import BandeA from "./BandeA.vue";
import DataView from "primevue/dataview";
import Dialog from "primevue/dialog";
import Rating from "primevue/rating";
import Sidebar from "primevue/sidebar";
import Avis from "./Avis.vue";
export default defineComponent({
  data: () => {
    return {
      films: null,
      error: false,
      videos: null,
      url: "https://www.youtube.com/embed/",
      displayba: false,
      displayavis: false,
      displaynoter: false,
      displayerrorba: false,
      title: null,
      val1: null,
      visibleBot: false,
    };
  },

  components: {
    Button,
    DataView,
    BandeA,
    Dialog,
    Avis,
    Rating,
    Sidebar,
  },

  mounted() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
          this.$store.getters.getKey +
          "&language=fr-FR&page=1"
        //"https://api.themoviedb.org/3/movie/popular?api_key=03368cad0c0c6a178cdf790f63692758&language=fr-fr&page=1"
      )
      .then((response) => {
        this.films = response.data;
      })
      .catch((error) => {
        this.error="gg"
      });
  },

  methods: {
    getVideos(film) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            film.id +
            "/videos?api_key=" +
            this.$store.getters.getKey +
            "&language=fr-FR"
        )
        .then((response) => {
          this.videos = response.data.results[0].key;
          //window.open(this.url + this.videos);
          this.displayba = true;
          this.title = film.original_title;
          this.displayavis = false;
          this.displaynoter = false;
        })
        .catch((error) => {
        this.error="La bande-annonce n'est pas disponible pour ce film"
        this.displayerrorba=true;
      });
    },

    getAvis(film) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            film.id +
            "/reviews?api_key=" +
            this.$store.getters.getKey 
        )
        .then((response) => {
          this.avis = response.data;
          //window.open(this.url + this.videos);
          this.displayavis = true;
          this.title = film.original_title;
          this.displayba = false;
          this.displaynoter = false;
        });
    },
    popUpRate(film) {
      this.displaynoter = true;
      this.title = film.original_title;
      this.id = film.id;
      this.displayba = false;
      this.displayavis = false;
    },

    rateMovie(value, id) {
      axios
        .post(
          "https://api.themoviedb.org/3/movie/" +
            id +
            "/rating?api_key=03368cad0c0c6a178cdf790f63692758&guest_session_id=4014985c44bf818399e96219353c99e0",
          {
            value: value,
          }
        )
        .then((response) => {
          this.displaynoter = false;
          this.visibleBot = true;
        });
    },
  },

  computed: {
    urlBA() {
      return `${this.$store.getters.getUrlYtBase}${this.videos}`;
    },
   
  }
});
</script>

<template>
  <div v-if="films">
    <Dialog :header="title" v-model:visible="displayba">
      <BandeA :urlBA="urlBA" />
    </Dialog>
    <Dialog :header="title" v-model:visible="displayerrorba">
      {{error}}
    </Dialog>
    <Dialog :header="title" v-model:visible="displayavis">
      <Avis :avis="avis" />
    </Dialog>
    <Dialog :header="'Notez ' + title" v-model:visible="displaynoter">
      <Rating v-model="val1" :stars="10" :cancel="false" />
      <template #footer>
        <Button
          label="No "
          icon="pi pi-times"
          class="p-button-text"
          v-on:click="displaynoter = false"
        />
        <Button
          label="Valider"
          icon="pi pi-check"
          v-on:click="rateMovie(val1, id)"
        />
      </template>
    </Dialog>
    <Sidebar v-model:visible="visibleBot" position="bottom">
      Votre note a été enregistré avec succès
    </Sidebar>

    <div v-for="film in films.results" :key="film">
      <div>
        Titre: <b> {{ film.original_title }} </b>
      </div>
      <div>{{ film.overview }}</div>
      <img :src="this.$store.getters.getImgUrlBase + film.poster_path" />
      <div>
        Note moyenne: <b> {{ film.vote_average }} </b>
      </div>

      <span class="p-buttonset">
        <Button label="Bande-annonce" v-on:click="getVideos(film)" />
        <Button label="Voir les avis" v-on:click="getAvis(film)" />
        <Button label="Noter" v-on:click="popUpRate(film)" />
      </span>
    </div>
  </div>

  <div v-else>Les films ne sont pas chargés</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
