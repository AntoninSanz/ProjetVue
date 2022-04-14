<template>
    <InputText id="APIKey" v-model="apiKey" type="text"></InputText>
    <InputText id="Base Url Youtube" v-model="urlYtb" type="text"></InputText>
    <InputText id="Base Url Image" v-model="urlImg" type="text"></InputText>
    <Button label="Enregistrer"></Button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default defineComponent({
    data: () => { 
        return{
        apiKey: null,
        urlYtb: null,
        urlImg: null
        }
    },
    components:
    {
        InputText,
        Button
    }
});
</script>