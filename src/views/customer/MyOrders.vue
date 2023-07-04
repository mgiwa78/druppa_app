<template>
  <div>
    <MyOrders widget-classes="mb-5 mb-xl-8"></MyOrders>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyOrders from "@/components/customer/tables/MyOrdersTable.vue";

export default defineComponent({
  name: "pending_orders",
  components: { MyOrders },
  props: {},
  setup() {
    return {};
  },
});
</script>
