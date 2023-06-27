<template>
  <!--begin::Navbar-->
  <div>
    <div class="row g-5 g-xl-8">
      <div class="col-xl-4">
        <CustomerNotifications
          widget-classes="card-xl-stretch mb-5 mb-xl-8"
        ></CustomerNotifications>
      </div>
      <div class="col-xl-8">
        <CustomerDeliveryStats />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomerNotifications from "./widgets/CustomerNotifications.vue";
import CustomerDeliveryStats from "@/components/customer/tables/CustomerDeliveryStats.vue";

export default defineComponent({
  name: "customer-dashboard",
  components: { CustomerNotifications, CustomerDeliveryStats },
  setup() {
    return {};
  },
});
</script>
