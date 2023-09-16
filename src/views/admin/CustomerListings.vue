<template>
  <div class="card">
    <div class="card-body pt-0">
      <CustomerTable />
    </div>
  </div>
  <AddCustomerModal></AddCustomerModal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AddCustomerModal from "../../components/admin/forms/AddCustomerModal.vue";

import CustomerTable from "@/components/admin/tables/CustomerTable.vue";

export default defineComponent({
  name: "customers-listing",
  components: {
    CustomerTable,
    AddCustomerModal,
  },
  setup() {},
});
</script>
