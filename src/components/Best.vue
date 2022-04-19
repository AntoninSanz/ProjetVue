<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
import Button from "primevue/button";
import BandeA from "./BandeA.vue";
import DataView from "primevue/dataview";
import Dialog from "primevue/dialog";
import Rating from "primevue/rating";
import Sidebar from "primevue/sidebar";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
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
      displayerror: false,
      title: null,
      val1: null,
      visibleBot: false,
      layout: "list",
      baVote: null
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
    DataViewLayoutOptions
  },

  mounted() {
    this.$watch(() => this.$route,() => 
    {
          if(this.$route.path == "/best")
    {
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
      .catch(() => {
        this.error="Erreur de chargement"
        this.displayerror=true;
      });
    }
    else if(this.$route.path == "/popular")
    {
      axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=" +
          this.$store.getters.getKey +
          "&language=fr-FR&page=1"
        //"https://api.themoviedb.org/3/movie/popular?api_key=03368cad0c0c6a178cdf790f63692758&language=fr-fr&page=1"
      )
      .then((response) => {
        this.films = response.data;
      })
      .catch(() => {
        this.error="Erreur de chargement"
        this.displayerror=true; 
      });
    }
    },{immediate: true});
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
        this.displayerror=true;
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
    handleChildData(payload) {
      console.log(payload);
      this.baVote = payload
    }
  
    
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
      <BandeA :urlBA="urlBA" @updateData="handleChildData" />
    </Dialog>
    <Dialog :header="title" v-model:visible="displayerror">
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
<div v-if="baVote === true">
    vous aimez ce film
  </div>
  <div v-if="baVote === false">
    vous n'aimez pas ce film
  </div>
    <div>
      <DataView :value="films.results" :layout="layout">
      <template #header>
        <div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img
              :src="this.$store.getters.getImgUrlBase + slotProps.data.poster_path"
              alt="poster du film"
            />
            <div class="product-list-detail">
              <div class="product-name">
                 <router-link :to="'/film/' + slotProps.data.id"> <b> {{ slotProps.data.original_title }}</b></router-link>
              </div>
              <div class="product-description">
                {{ slotProps.data.overview }}
              </div>
              <Rating
                :modelValue="slotProps.data.vote_average"
                :readonly="true"
                :cancel="false"
                :stars="10"
              ></Rating>
              <!-- <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.category}}</span> -->
            </div>
            <div class="product-list-action">
              <span class="product-price"
                >sortie : {{ slotProps.data.release_date }}</span
              >
            </div>
          </div>
          <span class="p-buttonset">
        <Button label="Bande-annonce" v-on:click="getVideos(slotProps.data)" />
        <Button label="Voir les avis" v-on:click="getAvis(slotProps.data)" />
        <Button label="Noter" v-on:click="popUpRate(slotProps.data)" />
      </span>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <span class="product-category">{{
                  slotProps.data.original_title
                }}</span>
              </div>
              <img
                :src="
                  this.$store.getters.getImgUrlBase + slotProps.data.poster_path
                "
                alt="poster du film"
              />
            </div>
            <div class="product-grid-item-content">
              <div class="product-name">
                <router-link :to="'/film/' + slotProps.data.id"> <b> {{ slotProps.data.original_title }}</b></router-link>
              </div>
              <div class="product-description">
                {{ slotProps.data.overview }}
              </div>
              <Rating
                :modelValue="slotProps.data.vote_average"
                :readonly="true"
                :cancel="false"
                :stars="10"
              ></Rating>
              {{ slotProps.data.vote_average }}
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price"
                >sortie : {{ slotProps.data.release_date }}</span
              >
            </div>
            <span class="p-buttonset">
        <Button label="Bande-annonce" v-on:click="getVideos(slotProps.data)" />
        <Button label="Voir les avis" v-on:click="getAvis(slotProps.data)" />
        <Button label="Noter" v-on:click="popUpRate(slotProps.data)" />
      </span>
          </div>
        </div>
      </template>
    </DataView>
    </div>
  </div>

  <div v-else>Les films ne sont pas chargés</div>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
