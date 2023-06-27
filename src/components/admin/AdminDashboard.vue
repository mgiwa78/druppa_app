<template>
  <!--begin::Navbar-->
  <div>
    <div class="row g-5 g-xl-8 mb-10 mb-xl-1">
      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="dark"
          icon-color="white"
          :title="`${adminStats.customer}`"
          description="Customers"
        ></StatisticsWidget5>
      </div>
      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="primary"
          icon-color="white"
          :title="`${adminStats.admin}`"
          description="Admins"
        ></StatisticsWidget5>
      </div>
      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="danger"
          icon-color="white"
          :title="`${adminStats.driver}`"
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
import { defineComponent, onMounted, ref } from "vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import MixedWidget14 from "@/components/widgets/mixed/Widget14.vue";
import Swal from "sweetalert2";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useStaticsStore } from "@/stores/statics";

export default defineComponent({
  name: "admin-dashboard",
  components: { StatisticsWidget5, MixedWidget14 },
  setup() {
    type Metric = {
      icon: string;
      title: string;
      number: string;
    };

    type Metrics = {
      title: string;
      colour: string;
      metrics: Array<Metric>;
    };

    const AuthStore = useAuthStore();
    const StaticsStore = useStaticsStore();

    const { user, token, refreshProfile } = AuthStore;
    const { adminStats, UpdateAdminStats } = StaticsStore;

    const customersCount = ref<Number>(0);
    const driversCount = ref<Number>(0);
    const summary = ref<Array<Metrics>>([
      {
        title: "Drivers Summary",
        colour: "#cbd4f4",
        metrics: [
          {
            icon: "abstract-42",
            title: "Active Drivers",
            number: adminStats.activeDrivers,
          },
          {
            icon: "abstract-45",
            title: "In-Active Drivers",
            number: adminStats.inActiveDrivers,
          },
        ],
      },
      {
        title: "Orders Summary",
        colour: "#cbf0f4",
        metrics: [
          {
            icon: "abstract-42",
            title: "Pending Orders",
            number: adminStats.pendingCustomerOrders,
          },
          {
            icon: "abstract-45",
            title: "Orders In-Transit",
            number: adminStats.transitCustomerOrders,
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
            number: "0",
          },
          {
            icon: "abstract-45",
            title: "Customer orders",
            number: adminStats.customerOrders,
          },
        ],
      },
    ]);
    const adminCount = ref<Number>(0);

    onMounted(async () => {
      if (adminStats.isSet) {
        return;
      } else {
        UpdateAdminStats();
        summary.value[0].metrics[0].number = adminStats.activeDrivers;
        console.log(adminStats.driver);
        console.log(summary.value[0].metrics[0].number);
      }
    });

    return { summary, customersCount, adminCount, driversCount, adminStats };
  },
});
</script>
