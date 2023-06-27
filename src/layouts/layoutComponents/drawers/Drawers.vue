<template>
  <KTActivityDrawer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTActivityDrawer from "@/layouts/layoutComponents/drawers/ActivityDrawer.vue";

export default defineComponent({
  name: "global-drawers",
  components: {
    KTActivityDrawer,
  },
});
</script>
