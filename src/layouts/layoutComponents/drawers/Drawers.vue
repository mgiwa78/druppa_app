<template>
  <KTMessengerDrawer />
  <KTActivityDrawer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTMessengerDrawer from "@/layouts/layoutComponents/extras/MessengerDrawer.vue";
import KTActivityDrawer from "@/layouts/layoutComponents/drawers/ActivityDrawer.vue";

export default defineComponent({
  name: "global-drawers",
  components: {
    KTMessengerDrawer,
    KTActivityDrawer,
  },
});
</script>
