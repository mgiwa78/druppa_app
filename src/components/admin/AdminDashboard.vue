<template>
  <!--begin::Navbar-->
  <div>
    <div class="row g-5 g-xl-8">
      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="dark"
          icon-color="white"
          title="20"
          description="Customers"
        ></StatisticsWidget5>
      </div>
      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="primary"
          icon-color="white"
          title="5"
          description="Admins"
        ></StatisticsWidget5>
      </div>
      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="danger"
          icon-color="white"
          title="30"
          description="Drivers"
        ></StatisticsWidget5>
      </div>
    </div>
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div
        class="col-xl-4"
        v-for="summaryData in summary"
        :key="summaryData.title"
      >
        <MixedWidget14
          :data="summaryData"
          widget-classes="card-xxl-stretch mb-5 mb-xl-8"
          widget-color="#CBD4F4"
        ></MixedWidget14>
      </div>

      <!--end::Col-->

      <!--begin::Col-->

      <!--end::Col-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import MixedWidget14 from "@/components/widgets/mixed/Widget14.vue";

export default defineComponent({
  name: "admin-dashboard",
  components: { StatisticsWidget5, MixedWidget14 },
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
