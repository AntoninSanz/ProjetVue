<template>
  <div v-for="avis in avis.results" :key="avis">
    <!-- affiche l'auteur et le contenu de chaque avis selon le film sélectionné  -->
    <div><b>{{ avis.author }}</b></div>
    {{ avis.created_at }}
    <br/>
    <br/>
    <div>{{ avis.content }}</div>
    <br/>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    avis: Object,
  },
});
</script>
