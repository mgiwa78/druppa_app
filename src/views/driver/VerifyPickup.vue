<template>
  <div class="col-12">
    <VerifyPickupPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VerifyPickupPage from "@/components/driver/VerifyPickupPage.vue";

export default defineComponent({
  name: "verify_delivery",
  components: { VerifyPickupPage },
  props: {},
  setup() {
    return {};
  },
});
</script>
