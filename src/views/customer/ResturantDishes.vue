<template>
  <div>
    <RestuarantDishesTable widget-classes="mb-5 mb-xl-8"></RestuarantDishesTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RestuarantDishesTable from "@/components/customer/tables/RestuarantDishesTable.vue";

export default defineComponent({
  name: "customer-restaurant-dishes",
  components: { RestuarantDishesTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
