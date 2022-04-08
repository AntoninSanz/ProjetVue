<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
import Rating from "primevue/rating";
import DataView from "primevue/dataview";
export default defineComponent({
  data: () => {
    return {
      film: null,
      error: false,
    };
  },
  components:
  {
      Rating
  },
  props: {
    id: String,
  },
  mounted() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          this.id +
          "?api_key=" +
          this.$store.getters.getKey +
          "&language=fr-FR&page=1"
        //"https://api.themoviedb.org/3/movie/popular?api_key=03368cad0c0c6a178cdf790f63692758&language=fr-fr&page=1"
      )
      .then((response) => {
        this.film = response.data;
      })
      .catch(() => {
        this.error = true;
      });
  },
});
</script>

<template>
  <div v-if="film">
    <div>
      Titre: <strong> {{ film.original_title }}</strong>
    </div>
    <div>{{ film.overview }}</div>
    <img :src="this.$store.getters.getImgUrlBase + film.poster_path" />
    <Rating
      :modelValue="film.vote_average"
      :readonly="true"
      :cancel="false"
      :stars="10"
    ></Rating>
    <span
      >sortie : {{ film.release_date }}</span
    >
    <span>budget : {{film.budget}}</span>
    <div>genres : <span v-for="genre in film.genres" :key="genre">
                    {{genre.name}} - 
        </span> 
        </div>
    <div>sociétés de production : <span v-for="production in film.production_companies" :key="production">{{production.name}} - </span> </div>
    <div>pays d'origine : <span v-for="country in film.production_countries" :key="country">{{country.name}} - </span> </div>
    <span> statut : {{film.status}}</span>
  </div>
  <div v-else>Le film n'a pas chargé.</div>
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
