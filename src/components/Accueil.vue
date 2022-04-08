<script setup>
import { ref } from "vue";
import BandeA from "./BandeA.vue";
defineProps({});

const count = ref(0);
</script>

<template>
  <BandeA numero="3" />
  <h1>gg</h1>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
