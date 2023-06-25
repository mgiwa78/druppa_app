<template>
  <div class="col-12">
    <DriverDeliveryTable widget-classes="mb-5 mb-xl-8"></DriverDeliveryTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DriverDeliveryTable from "@/components/driver/tables/DriverDeliveryTable.vue";

export default defineComponent({
  name: "driver_records",
  components: { DriverDeliveryTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
