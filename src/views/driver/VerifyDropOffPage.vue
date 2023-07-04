<template>
  <div class="col-12">
    <VerifyDropOffPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VerifyDropOffPage from "@/components/driver/VerifyDropOffPage.vue";

export default defineComponent({
  name: "verify_dropOff",
  components: { VerifyDropOffPage },
  props: {},
  setup() {
    return {};
  },
});
</script>
