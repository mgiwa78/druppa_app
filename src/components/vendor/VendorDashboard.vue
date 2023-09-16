<template>
  <!--begin::Navbar-->
  <div class="mx-5">
    <div class="row g-5 g-xl-8">
      <div class="col-xl-4">
        <StatisticsWidget5 widget-classes="card-xl-stretch mb-xl-8" icon-name="basket" color="danger" icon-color="white"
          :title="'2'" description="Dishes"></StatisticsWidget5>
      </div>

      <div class="col-xl-4">
        <StatisticsWidget5 widget-classes="card-xl-stretch mb-xl-8" icon-name="cheque" color="primary" icon-color="white"
          :title="'3'" description="Orders"></StatisticsWidget5>
      </div>

      <div class="col-xl-4">
        <StatisticsWidget5 widget-classes="card-xl-stretch mb-5 mb-xl-8" icon-name="chart-simple-3" color="success"
          icon-color="white" :title="'2'" description="Sales this month">
        </StatisticsWidget5>
      </div>
    </div>
    <!-- <div v-for="item in PendingDeliveries"
         :key="item.id"
         class="col-xl-12 mb-5"></div> -->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";

import { defineComponent, onMounted, ref } from "vue";
// import RecentOrdersTable from "@/components/driver/tables/RecentOrdersTable.vue";
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
  name: "vendor-dashboard",
  components: {
    // RecentOrdersTable,
    StatisticsWidget5,
  },
  setup() {
    // const StaticsStore = useStaticsStore();
    // const { UpdateDriverStats, driverStats } = StaticsStore;
    const { API_URL } = __CONSTANTS__;
    const AuthStore = useAuthStore();
    const statics = ref()

    const { user, token } = AuthStore;

    // const fetchVendorStatic = async () => {
    //   const vendorStatics = await axios
    //     .get(API_URL + "vendorStatics", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     .then((response) => response.data)
    //     .catch((error) => {

    //       ErrorHandler(error);
    //     });
    //   console.log(vendorStatics.data);
    //   return vendorStatics.data
    // };

    // onMounted(async () => {
    // fetchVendorStatic();
    // statics.value = 1
    // if (driverStats.isSet) {
    //   return;
    // } else {
    //   UpdateDriverStats();
    // }
    // });

    return { getAssetPath, statics };
  },
});
</script>
