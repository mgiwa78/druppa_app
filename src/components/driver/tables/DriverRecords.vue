<template>
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Delivery Record</span>

        <span class="text-muted mt-1 fw-semobold fs-7">Over 500 orders</span>
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <KTIcon icon-name="category" icon-class="fs-2" />
        </button>
        <Dropdown2></Dropdown2>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">Order Id</th>
              <th class="min-w-140px">Order Placed</th>
              <th class="min-w-120px">Pickup</th>
              <th class="min-w-120px">Dropoff</th>
              <th class="min-w-120px">Distance</th>
              <th class="min-w-120px">Status</th>
              <th class="min-w-100px">Time Spent</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in list" :key="index">
              <tr>
                <td>
                  <span
                    href="#"
                    class="text-dark fw-bold text-hover-primary fs-6"
                    >{{ item.orderid }}</span
                  >
                </td>

                <td>
                  <span
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.company.name }}</span
                  >
                  <span class="text-muted fw-semobold text-muted d-block fs-7"
                    >Code: {{ item.country.code }}</span
                  >
                </td>

                <td>
                  <span
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.date.value }}</span
                  >
                  <span class="text-muted fw-semobold text-muted d-block fs-7"
                    >Code: {{ item.date.remarks }}</span
                  >
                </td>

                <td>
                  <span
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.company.name }}</span
                  >
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ item.company.fields }}</span
                  >
                </td>

                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{ item.total }}
                </td>

                <td>
                  <span
                    :class="`badge-light-${item.status.color}`"
                    class="badge"
                    >{{ item.status.label }}</span
                  >
                </td>

                <td>
                  {{ item.timeSpent }}
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <StartDeliveryModal></StartDeliveryModal>

  <!--end::Tables Widget 13-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import StartDeliveryModal from "@/components/driver/form/StartDeliveryModal.vue";

export default defineComponent({
  name: "kt-widget-12",
  components: {
    Dropdown2,
    StartDeliveryModal,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const checkedRows = ref<Array<number>>([]);
    const list = [
      {
        orderid: "56037-XDER",
        country: {
          name: "Brasil",
          code: "PH",
        },
        date: {
          value: "05/28/2020",
          remarks: "Paid",
        },
        progress: {
          value: "30",
          color: "success",
        },
        company: {
          name: "Intertico",
          fields: "Web, UI/UX Design",
        },
        status: {
          label: "completed",
          color: "success",
        },
        total: "35Km",
        timeSpent: "50 Minutes",
      },
      {
        orderid: "05822-FXSP",
        country: {
          name: "Belarus",
          code: "BY",
        },
        date: {
          value: "04/18/2021",
          remarks: "Paid",
        },
        progress: {
          value: "30",
          color: "success",
        },
        company: {
          name: "Agoda",
          fields: "Houses & Hotels",
        },
        status: {
          label: "Canceld",
          color: "danger",
        },
        total: "48Km",
        timeSpent: "1hr 5Minutes",
      },
      {
        orderid: "4472-QREX",
        country: {
          name: "Phillipines",
          code: "BH",
        },
        date: {
          value: "07/23/2019",
          remarks: "Paid",
        },
        progress: {
          value: "50",
          color: "success",
        },
        company: {
          name: "RoadGee",
          fields: "Transportation",
        },
        status: {
          label: "completed",
          color: "success",
        },
        total: "83Km",
        timeSpent: "30 Minutes",
      },
      {
        orderid: "00347-BCLQ",
        country: {
          name: "Argentina",
          code: "BR",
        },
        date: {
          value: "12/21/2021",
          remarks: "Paid",
        },
        progress: {
          value: "30",
          color: "success",
        },
        company: {
          name: "The Hill",
          fields: "Insurance",
        },
        status: {
          label: "completed",
          color: "success",
        },
        total: "48Km",
        timeSpent: "50 Minutes",
      },
      {
        orderid: "59486-XDER",
        country: {
          name: "Agoda",
          code: "BT",
        },
        date: {
          value: "05/28/2020",
          remarks: "Paid",
        },
        progress: {
          value: "60",
          color: "success",
        },
        company: {
          name: "Phillipines",
          fields: "Transportation",
        },
        status: {
          label: "completed",
          color: "success",
        },
        total: "84Km",
        timeSpent: "45 Minutes",
      },
    ];

    return {
      list,
      checkedRows,
      getAssetPath,
    };
  },
});
</script>
