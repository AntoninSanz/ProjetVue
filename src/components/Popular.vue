<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
export default defineComponent({
  data: () => {
    return {
      films: null,
      error: false,
    };
  },
  mounted() {
    axios
.get(
        "https://api.themoviedb.org/3/movie/popular?api_key="+this.$store.getters.getKey+"&language=fr-FR&page=1"
        //"https://api.themoviedb.org/3/movie/popular?api_key=03368cad0c0c6a178cdf790f63692758&language=fr-fr&page=1"
        )
      .then((response) => {
        this.films = response.data;
      })
      .catch(() => {
        this.error = true;
      });
  },
});
</script>

<template>
    <div v-if="films">
      <div v-for="film in films.results" :key="film">
       {{film.original_title}}
        <img :src=" 'https://image.tmdb.org/t/p/w200' + film.poster_path">


    
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
