<template>
  <div>
    <MakeOrderForm></MakeOrderForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MakeOrderForm from "@/components/customer/forms/MakeOrderForm.vue";

export default defineComponent({
  name: "make_shipment_order",
  components: { MakeOrderForm },
  props: {},
  setup() {
    return {};
  },
});
</script>
