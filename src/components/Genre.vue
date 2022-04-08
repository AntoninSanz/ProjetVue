<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import DataView from "primevue/dataview";
import Rating from "primevue/rating";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";

export default defineComponent({
  data: () => {
    return {
      genres: null,
      genre: null,
      films: null,
      error: false,
      layout: "grid",
    };
  },
  components: {
    Button,
    Dropdown,
    DataView,
    Rating,
    DataViewLayoutOptions,
  },
  mounted() {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
          this.$store.getters.getKey +
          "&language=fr-FR"
        //"https://api.themoviedb.org/3/movie/popular?api_key=03368cad0c0c6a178cdf790f63692758&language=fr-fr&page=1"
      )
      .then((response) => {
        this.genres = response.data;
        console.log(this.genres);
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    goToGenre(id) {
      console.log("je passe");
      axios
        .get(
          " https://api.themoviedb.org/3/discover/movie?api_key=" +
            this.$store.getters.getKey +
            "&with_genres=" +
            id +
            "&language=fr-FR"
        )
        .then((response) => {
          this.films = response.data;
          console.log(this.films.results);
        });
    },
  },
  watch: {
    genre: function (val) {
      this.goToGenre(val.id);
    },
  },
});
</script>

<template>
<div>
  <div v-if="genres">
    <Dropdown v-model="genre" :options="genres.genres" optionLabel="name" />
  </div>
  <div v-else>Les films ne sont pas chargés</div>
  <div v-if="films">
    <DataView :value="films.results" :layout="layout">
      <template #header>
        <div>
          <div style="text-align: left">
            <!-- <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/> -->
          </div>
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
                {{ slotProps.data.original_title }}
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
                {{ slotProps.data.original_title }}
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
          </div>
        </div>
      </template>
    </DataView>

    <!-- <div v-for="film in films.results" :key="film">
        
      <div >Titre: <b> {{ film.original_title }}</b></div>
          <div >  {{ film.overview }}</div>
          <img :src="this.$store.getters.getImgUrl + film.poster_path">
          <div >Note moyenne: <b> {{ film.vote_average }}</b></div>   
          <br>
      </div> -->
  </div>
  </div>
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
