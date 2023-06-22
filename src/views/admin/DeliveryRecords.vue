<template>
  <div>
    <DeliveryTable widget-classes="mb-5 mb-xl-8"></DeliveryTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DeliveryTable from "@/components/admin/tables/DeliveryTable.vue";

export default defineComponent({
  name: "delivery_records",
  components: { DeliveryTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
