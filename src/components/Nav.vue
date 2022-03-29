<script setup>
// /Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <routerLink to="/">Accueil </routerLink>
    <routerLink to="/popular">Films populaires</routerLink>
    <routerLink to="/best">Films les mieux notés</routerLink>
  </nav>

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
