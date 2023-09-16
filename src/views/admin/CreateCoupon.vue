<template>
  <div>
    <CreateCouponForm widget-classes="mb-5 mb-xl-8"></CreateCouponForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateCouponForm from "@/components/admin/forms/CreateCouponForm.vue";

export default defineComponent({
  name: "delivery_records",
  components: { CreateCouponForm },
  props: {},
  setup() {
    return {};
  },
});
</script>
