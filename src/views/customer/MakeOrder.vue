<template>
  <div>
    <MakeOrderWizard></MakeOrderWizard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MakeOrderWizard from "@/components/customer/wizards/MakeOrderWizard.vue";

export default defineComponent({
  name: "make_shipment_order",
  components: { MakeOrderWizard },
  props: {},
  setup() {
    return {};
  },
});
</script>
