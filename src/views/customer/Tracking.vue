<template>
  <div>
    <div class="row">
      <div class="col-6">
        <TrackingForm widget-classes="mb-5 mb-xl-8"></TrackingForm>
      </div>
      <div class="col-6">
        <TrackingStats widget-classes="mb-5 mb-xl-8"></TrackingStats>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TrackingStats from "@/components/customer/widgets/TrackingStats.vue";
import TrackingForm from "@/components/customer/forms/TrackingForm.vue";

export default defineComponent({
  name: "shipment_records",
  components: { TrackingStats, TrackingForm },
  props: {},
  setup() {
    return {};
  },
});
</script>
