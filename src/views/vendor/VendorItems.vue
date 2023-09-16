<template>
  <div>
    <VendorItemsTable></VendorItemsTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VendorItemsTable from "@/components/vendor/tables/VendorItemsTable.vue";

export default defineComponent({
  name: "create_vendor_item_view",
  components: { VendorItemsTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
