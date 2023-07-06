<template>
  <MakeOrderModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MakeOrderModal from "@/components/customer/forms/MakeOrderModal.vue";
export default defineComponent({
  name: "global-modals",
  components: {
    MakeOrderModal,
  },
});
</script>
