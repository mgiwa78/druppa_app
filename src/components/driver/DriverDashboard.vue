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
          title="Deliveries Completed"
          description="Approved and Verified"
        ></StatisticsWidget5>
      </div>

      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-xl-8"
          icon-name="cheque"
          color="primary"
          icon-color="white"
          title="Distance Covered"
          description="In Km Between delivery locations"
        ></StatisticsWidget5>
      </div>

      <div class="col-xl-4">
        <StatisticsWidget5
          widget-classes="card-xl-stretch mb-5 mb-xl-8"
          icon-name="chart-simple-3"
          color="success"
          icon-color="white"
          title="Delevery Performace Rate"
          description="By distance, pickup and dropoff time"
        ></StatisticsWidget5>
      </div>
    </div>
    <div class="row g-2 g-xl-8">
      <div class="col-xl-8">
        <RecentOrdersTable widget-classes="mb-5 mb-xl-8" />
      </div>
      <div class="col-xl-4">
        <DriverProfileStats />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RecentOrdersTable from "@/components/driver/tables/RecentOrdersTable.vue";
import DriverProfileStats from "@/components/driver/widgets/DriverProfileStats.vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";

export default defineComponent({
  name: "driver-dashboard",
  components: { RecentOrdersTable, StatisticsWidget5, DriverProfileStats },
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

    return {};
  },
});
</script>
