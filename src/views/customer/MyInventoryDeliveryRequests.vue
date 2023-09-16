<template>
  <div>
    <MyInventoryDeliveryRequestsTable
      widget-classes="mb-5 mb-xl-8"
    ></MyInventoryDeliveryRequestsTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyInventoryDeliveryRequestsTable from "@/components/customer/tables/MyInventoryDeliveryRequestsTable.vue";

export default defineComponent({
  name: "delivery_records",
  components: { MyInventoryDeliveryRequestsTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
