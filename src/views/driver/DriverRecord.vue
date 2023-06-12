<template>
  <div class="col-12">
    <DriverRecords widget-classes="mb-5 mb-xl-8"></DriverRecords>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DriverRecords from "@/components/driver/tables/DriverRecords.vue";

export default defineComponent({
  name: "driver_records",
  components: { DriverRecords },
  props: {},
  setup() {
    return {};
  },
});
</script>
