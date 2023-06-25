<template>
  <div>
    <div class="row fv">
      <div class="col-4">
        <DriverWidget1 widget-classes="mb-5 mb-xl-8"></DriverWidget1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DriverWidget1 from "@/components/admin/widgets/DeliveryWidget1.vue";

export default defineComponent({
  name: "delivery_records",
  components: { DriverWidget1 },
  props: {},
  setup() {
    return {};
  },
});
</script>
