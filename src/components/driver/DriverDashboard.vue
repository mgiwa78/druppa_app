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
    <div class="row mb-5 g-2 g-xl-12">
      <div class="col-xl-12">
        <CurrentDelivery
          className="h-xl-100"
          :image="getAssetPath('media/stock/600x600/img-65.jpg')"
        />
      </div>
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

import { defineComponent, onMounted } from "vue";
import RecentOrdersTable from "@/components/driver/tables/RecentOrdersTable.vue";
import DriverProfileStats from "@/components/driver/widgets/DriverProfileStats.vue";
import CurrentDelivery from "@/components/driver/widgets/CurrentDelivery.vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import { useStaticsStore } from "@/stores/statics";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import { useAuthStore } from "@/stores/auth";
import ErrorHandler from "@/core/helpers/errorHandler";
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

    const { user, token } = AuthStore;

    const fetchCustomerOrders = async (page) => {
      const Orders = await axios
        .get(
          API_URL +
            "customerorders/all/customer/" +
            `${itemsPerPage.value}?page=${page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => response.data)
        .catch((error) => {
          dataToDisplay.value = null;
          ErrorHandler(error);
        });

      return Orders.data;
    };
    onMounted(async () => {
      if (driverStats.isSet) {
        return;
      } else {
        UpdateDriverStats();
      }
    });
    return { driverStats, getAssetPath };
  },
});
</script>
