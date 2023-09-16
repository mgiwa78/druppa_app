<template>
  <div class="card">
    <div class="card-body pt-0">
      <VendorsTable />
    </div>
  </div>
  <AddCustomerModal></AddCustomerModal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AddCustomerModal from "../../components/admin/forms/AddCustomerModal.vue";

import VendorsTable from "@/components/admin/tables/VendorsTable.vue";

export default defineComponent({
  name: "customers-listing",
  components: {
    VendorsTable,
    AddCustomerModal,
  },
  setup() {},
});
</script>
