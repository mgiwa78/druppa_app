<template>
  <div>
    <CustomerDeliveryStats
      widget-classes="mb-5 mb-xl-8"
    ></CustomerDeliveryStats>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomerDeliveryStats from "@/components/customer/tables/CustomerDeliveryStats.vue";

export default defineComponent({
  name: "shipment_records",
  components: { CustomerDeliveryStats },
  props: {},
  setup() {
    return {};
  },
});
</script>
