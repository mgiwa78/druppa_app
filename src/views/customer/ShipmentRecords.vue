<template>
  <div>
    <ShipmentTable widget-classes="mb-5 mb-xl-8"></ShipmentTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShipmentTable from "@/components/customer/tables/ShipmentTable.vue";

export default defineComponent({
  name: "shipment_records",
  components: { ShipmentTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
