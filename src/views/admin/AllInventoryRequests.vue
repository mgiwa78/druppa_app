<template>
  <div>
    <InventoryRequestsTable
      widget-classes="mb-5 mb-xl-8"
    ></InventoryRequestsTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InventoryRequestsTable from "@/components/admin/tables/InventoryRequestsTable.vue";

export default defineComponent({
  name: "delivery_records",
  components: { InventoryRequestsTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
