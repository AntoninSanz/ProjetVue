<script setup>
// /Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Accueil from './components/Accueil.vue'
import Nav from './components/Nav.vue'
import { RouterLink, RouterView } from 'vue-router'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'    
import 'primeicons/primeicons.css'                     
</script>

<template>
  <div>
    <Nav></Nav>
    <RouterView/> 
  </div> 
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
</style>
