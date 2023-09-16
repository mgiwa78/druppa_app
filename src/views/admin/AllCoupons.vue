<template>
  <div>
    <AllCouponsTable widget-classes="mb-5 mb-xl-8"></AllCouponsTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AllCouponsTable from "@/components/admin/tables/AllCouponsTable.vue";

export default defineComponent({
  name: "all_coupons_view",
  components: { AllCouponsTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
