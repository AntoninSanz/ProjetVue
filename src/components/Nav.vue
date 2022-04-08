<script>
import Menubar from "primevue/menubar";
export default {
  data() {
    return {
      items: [
        {
          label: "Accueil",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
        {
          label: "Films populaires",
          icon: "pi pi-fw pi-star-fill",
          to: "/popular",
        },
        {
          label: "Les mieux notés",
          icon: "pi pi-fw pi-star",
          to: "/best",
        },
        {
          label: "Par genre",
          icon: "pi-sort-alt",
          to: "/Genre",
        },
      ],
    };
  },
  components: {
    Menubar: Menubar,
  },
};
</script>

<template>
  <div>
    <div class="content-section implementation">
      <div class="card">
        <Menubar :model="items">
          <template #start>
            <img alt="logo" src="../assets/cine.jpg" height="40" class="mr-2" />
          </template>
        </Menubar>
      </div>
    </div>
  </div>
</template>

<style></style>
