<template>
  <div>
    <MyInventory widget-classes="mb-5 mb-xl-8"></MyInventory>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyInventory from "@/components/customer/tables/MyInventoryTable.vue";

export default defineComponent({
  name: "customer_inventory",
  components: { MyInventory },
  props: {},
  setup() {
    return {};
  },
});
</script>
