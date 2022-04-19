<template>
  <h5>API key :</h5>
  <InputText id="APIKey" v-model="apiKey" type="text"></InputText>
  <h5>Base Url Youtube :</h5>
  <InputText id="Base Url Youtube" v-model="urlYtb" type="text"></InputText>
  <h5>Base Url Image :</h5>
  <InputText id="Base Url Image" v-model="urlImg" type="text"></InputText>
  <br />
  <Button label="Enregistrer" @click="save">Enregistrer</Button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default defineComponent({
  data: () => {
    return {
      apiKey: null,
      urlYtb: null,
      urlImg: null,
    };
  },
  components: {
    InputText,
    Button,
  },
  mounted() {
    this.apiKey = this.$store.getters.getKey;
    this.urlYtb = this.$store.getters.getUrlYtBase;
    this.urlImg = this.$store.getters.getImgUrlBase;
  },
  methods: {
    save() {
      this.$store.commit("initKey", this.apiKey);
      this.$store.commit("initUrlYtBase", this.urlYtb);
      this.$store.commit("initImgUrlBase", this.urlImg);
    },
  },
});
</script>