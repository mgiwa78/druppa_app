<template>
  <div>
    <InvoiceTable widget-classes="mb-5 mb-xl-8"></InvoiceTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InvoiceTable from "@/components/customer/tables/InvoiceTemplate.vue";

export default defineComponent({
  name: "shipment_records",
  components: { InvoiceTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
