<template>
  <div>
    <ModifyCouponForm widget-classes="mb-5 mb-xl-8"></ModifyCouponForm>
  </div>
  <div class="my-10">
    <AllCouponUsersTable widget-classes="m-10 mb-xl-8"></AllCouponUsersTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModifyCouponForm from "@/components/admin/forms/ModifyCouponForm.vue";
import AllCouponUsersTable from "@/components/admin/tables/AllCouponUsersTable.vue";

export default defineComponent({
  name: "modify_coupon",
  components: { ModifyCouponForm, AllCouponUsersTable },
  props: {},
  setup() {
    return {};
  },
});
</script>
