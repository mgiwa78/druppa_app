<template>
  <div>
    <MyOrdersTable></MyOrdersTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyOrdersTable from "@/components/vendor/tables/MyOrdersTable.vue";

export default defineComponent({
  name: "all_vendor_orders_view",
  components: { MyOrdersTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
