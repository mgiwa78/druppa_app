<template>
  <div>
    <InventoryTable widget-classes="mb-5 mb-xl-8"></InventoryTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InventoryTable from "@/components/admin/tables/InventoryTable.vue";

export default defineComponent({
  name: "inventory_records",
  components: { InventoryTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
