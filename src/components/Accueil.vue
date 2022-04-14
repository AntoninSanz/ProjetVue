<script setup>
import { ref } from "vue";
import BandeA from "./BandeA.vue";
defineProps({});

const count = ref(0);
</script>

<template>
  <h1>HallaCiné ou HalouilleCiné !</h1>
  <p> Bienvenue sur le site qui souhaite concurrencer Allociné ! </p>
   <img alt="lumiere" src="../assets/lumiere.jpeg" height="300"   />
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
