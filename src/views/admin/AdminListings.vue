<template>
  <div class="card">
    <div class="card-body pt-0">
      <AdminTable />
    </div>
  </div>
  <AddAdminModal></AddAdminModal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AddAdminModal from "../../components/admin/forms/AddAdminModal.vue";

import AdminTable from "@/components/admin/tables/AdminTable.vue";

export default defineComponent({
  name: "customers-listing",
  components: {
    AdminTable,
    AddAdminModal,
  },
  setup() {},
});
</script>
