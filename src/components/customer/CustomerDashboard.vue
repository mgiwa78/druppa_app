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
        <CustomerDeliveryStats className="h-md-100" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import MixedWidget14 from "@/components/widgets/mixed/Widget14.vue";
import CustomerNotifications from "./widgets/CustomerNotifications.vue";
import CustomerDeliveryStats from "@/components/customer/tables/CustomerDeliveryStats.vue";

export default defineComponent({
  name: "customer-dashboard",
  components: { CustomerNotifications, CustomerDeliveryStats },
  setup() {
    type Metric = {
      icon: string;
      title: string;
      number: number;
    };

    type Metrics = {
      title: string;
      colour: string;
      metrics: Array<Metric>;
    };

    const summary = [
      {
        title: "Drivers Summary",
        colour: "#cbd4f4",
        metrics: [
          {
            icon: "abstract-42",
            title: "Active Drivers",
            number: 15,
          },
          {
            icon: "abstract-45",
            title: "In-Active Drivers",
            number: 32,
          },
        ],
      },
      {
        title: "Orders Summary",
        colour: "#cbf0f4",
        metrics: [
          {
            icon: "abstract-42",
            title: "Active Orders",
            number: 15,
          },
          {
            icon: "abstract-45",
            title: "In-Active Orders",
            number: 32,
          },
        ],
      },
      {
        title: "Notifications",
        colour: "#f7d9e3",
        metrics: [
          {
            icon: "abstract-42",
            title: "Driver Approvals",
            number: 15,
          },
          {
            icon: "abstract-45",
            title: "Customer orders",
            number: 32,
          },
        ],
      },
    ] as Array<Metrics>;
    return { summary };
  },
});
</script>
