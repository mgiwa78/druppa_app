<template>
  <div>
    <MyInventoryRequestsTable
      widget-classes="mb-5 mb-xl-8"
    ></MyInventoryRequestsTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyInventoryRequestsTable from "@/components/customer/tables/MyInventoryRequestsTable.vue";

export default defineComponent({
  name: "delivery_records",
  components: { MyInventoryRequestsTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
