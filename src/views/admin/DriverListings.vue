<template>
  <div class="card">
    <div class="card-body pt-0">
      <DriversTable />
    </div>
  </div>
  <AddDriverModal></AddDriverModal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AddDriverModal from "../../components/admin/forms/AddDriverModal.vue";

import DriversTable from "@/components/admin/tables/DriversTable.vue";

export default defineComponent({
  name: "customers-listing",
  components: {
    DriversTable,
    AddDriverModal,
  },
  setup() {},
});
</script>
