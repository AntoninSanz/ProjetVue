<template>
  <!-- Ouvre un lecteur vidéo avec la BA du film selectionné -->
  <iframe width="420" height="315" :src="urlBA"> </iframe>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    urlBA: String,
  },
});
</script>
