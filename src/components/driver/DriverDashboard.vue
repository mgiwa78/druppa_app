<template>
  <!--begin::Navbar-->
  <div class="mx-5">
    <div class="row g-5 g-xl-8">
      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="basket"
          color="danger"
          icon-color="white"
          :title="`${driverStats.total_deliveries}`"
          description="Approved and Verified"
        ></StatisticsWidget5>
      </div>

      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="primary"
          icon-color="white"
          :title="`${driverStats.total_distance + ' ' + 'km'}`"
          description="In Km Between delivery locations"
        ></StatisticsWidget5>
      </div>

      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-5 mb-xl-8"
          icon-name="chart-simple-3"
          color="success"
          icon-color="white"
          :title="`${driverStats.performance * 100}`"
          description="By distance, pickup and dropoff time"
        ></StatisticsWidget5>
      </div>
    </div>
    <div
      v-for="item in PendingDeliveries"
      :key="item.id"
      class="col-xl-12 mb-5"
    >
      <CurrentDelivery
        :PendingDelivery="item"
        className="h-xl-100"
        :image="getAssetPath('media/misc/pattern-2.png')"
      />
    </div>
    <div class="row g-2 g-xl-8">
      <div class="col-xl-8">
        <RecentOrdersTable widget-classes="mb-5 mb-xl-8 pb-8" />
      </div>
      <div class="col-xl-4">
        <DriverProfileStats />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";

import { defineComponent, onMounted, ref } from "vue";
import RecentOrdersTable from "@/components/driver/tables/RecentOrdersTable.vue";
import DriverProfileStats from "@/components/driver/widgets/DriverProfileStats.vue";
import CurrentDelivery from "@/components/driver/widgets/CurrentDelivery.vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";

import { useStaticsStore } from "@/stores/statics";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import { useAuthStore } from "@/stores/auth";
import ErrorHandler from "@/core/helpers/errorHandler";
import type { AllTypes } from "../../core/types";
import { defaultTypes } from "../../core/types/defaultData.js";

export default defineComponent({
  name: "driver-dashboard",
  components: {
    RecentOrdersTable,
    StatisticsWidget5,
    DriverProfileStats,
    CurrentDelivery,
  },
  setup() {
    const StaticsStore = useStaticsStore();
    const { UpdateDriverStats, driverStats } = StaticsStore;
    const { API_URL } = __CONSTANTS__;
    const AuthStore = useAuthStore();

    const PendingDeliveries = ref<Array<AllTypes.DeliveryType> | null>(null);
    const { user, token } = AuthStore;

    const fetchPendingOrders = async () => {
      const Deliveries = await axios
        .get(API_URL + "deliveries/driver/getDriverOngoingDeliveries", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          PendingDeliveries.value = null;
          ErrorHandler(error);
        });
      console.log(Deliveries.data);
      PendingDeliveries.value = Deliveries.data;
    };

    onMounted(async () => {
      fetchPendingOrders();
      if (driverStats.isSet) {
        return;
      } else {
        UpdateDriverStats();
      }
    });
    return { driverStats, getAssetPath, PendingDeliveries };
  },
});
</script>
