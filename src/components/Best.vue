<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
import Button from 'primevue/button';

export default defineComponent({
  data: () => {
    return {
      films: null,
      error: false,
      videos: null,
      url: 'https://www.youtube.com/watch?v='

    };
  },
    
    components: {
      Button
  },

  mounted() {
    axios
.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key="+this.$store.getters.getKey+"&language=fr-FR&page=1"
        //"https://api.themoviedb.org/3/movie/popular?api_key=03368cad0c0c6a178cdf790f63692758&language=fr-fr&page=1"
        )
      .then((response) => {
        this.films = response.data;
      })
      .catch(() => {
        this.error = true;
        });
        },
  methods: {
    
    getVideos(id) {
      axios.get
      ("https://api.themoviedb.org/3/movie/"+id+"/videos?api_key="+this.$store.getters.getKey+"&language=fr-FR")
       .then((response) => {
          this.videos = response.data.results[0].key;
          window.open(this.url + this.videos);
      })
    },  
  }

});

</script>

<template>
    
    <div v-if="films">
      
      <div v-for="film in films.results" :key="film">
        
        <div >Titre: <b> {{film.original_title}}</b></div>
        <div >  {{film.overview}}</div>
        <img :src="this.$store.getters.getImgUrl + film.poster_path">
        <div >Note moyenne: <b> {{film.vote_average}}</b></div> 
        <Button label="Bande-annonce" class="p-button-raised p-button-rounded" v-on:click="getVideos(film.id)" />
        
        
        <!-- <button v-on:click="goToUrl(videos.results[0].key)">gg</button> -->
        <!-- <a :href="'https://www.youtube.com/watch?v='+ videos.results[0].key">gg</a> -->
       
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
