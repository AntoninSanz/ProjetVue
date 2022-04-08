<template>
    <div>
        <Message severity="error" :closable="false">Page inconnu !!!!</Message>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Message from "primevue/message";

export default defineComponent
({
    components:
    {
        Message
    }
});
</script>