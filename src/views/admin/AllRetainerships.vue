<template>
  <div>
    <AllRetainerShipsTable widget-classes="mb-5 mb-xl-8"></AllRetainerShipsTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AllRetainerShipsTable from "@/components/admin/tables/AllRetainerShipsTable.vue";

export default defineComponent({
  name: "all_retainer_ships_view",
  components: { AllRetainerShipsTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
