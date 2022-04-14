<template>
  <!-- Ouvre un lecteur vidéo avec la BA du film selectionné -->
  <iframe width="420" height="315" :src="urlBA"> </iframe><br/>
  <p>Qu'avez vous pensez de cette bande-annonce ?</p>
  <Button icon="pi pi-heart" class="p-button-rounded p-button-help" @click="vote = true ; sendDataToParent(vote)" />
  <Button icon="pi pi-times" class="p-button-rounded p-button-danger" @click="vote = false ; sendDataToParent(vote)" />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Button from "primevue/button";

export default defineComponent({

  data: () => {
    return {
      vote : false
    };
  },

  props: {
    urlBA: String,
  },
  components: {
    Button
  },
  emits: ['update-data'],
  methods: {
    sendDataToParent(data) {
      this.$emit('update-data', data);
    }
  }

});
</script>