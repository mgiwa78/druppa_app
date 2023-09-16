<template>
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Pending Orders</span>

        <span class="text-muted mt-1 fw-semobold fs-7">{{ dataToDisplay?.length }} Orders</span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div v-if="dataToDisplay?.length === 0" class="d-flex align-items-center justify-content-center w-100 py-5">
        <h4>No Pending Orders</h4>
      </div>
      <div v-if="!dataToDisplay" class="d-flex align-items-center justify-content-center w-100 py-5">
        <div class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"></div>
      </div>
      <div v-if="dataToDisplay?.length && dataToDisplay" class="table-responsive">
        <!--begin::Table-->
        <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">Order Id</th>
              <th class="min-w-120px">Order Placed</th>
              <th class="min-w-140px">Pickup</th>
              <th class="min-w-120px">Dropoff</th>
              <th class="min-w-120px">Shipment Type</th>
              <th class="min-w-120px">Payment Type</th>
              <th class="min-w-120px">Status</th>

              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="order in dataToDisplay" :key="order.id">
              <tr>
                <td>
                  <span class="text-dark fw-bold text-hover-primary fs-6">{{
                    order.id
                  }}</span>
                </td>
                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{ formatDate(order.created_at) }}
                </td>
                <td>
                  <span class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ order.pickup_address }}</span>
                </td>

                <td>
                  <span class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ order.dropoff_address }}</span>
                </td>

                <td>
                  <span class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ order.package_type }}</span>
                </td>
                <td>
                  <span class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ order.payment_type }}</span>
                </td>

                <td>
                  <span :class="`badge-light-${statusFilter[order.status]}`" class="badge">{{ order.status }}</span>
                </td>

                <td class="text-end">
                  <button data-bs-toggle="modal" data-bs-target="#kt_start_delivery_modal"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    @click.prevent="updateVieworder(order)">
                    <KTIcon icon-name="switch" icon-class="fs-3" />
                  </button>

                  <!-- <button
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </button> -->
                </td>
              </tr>
            </template>
          </tbody>

          <!--end::Table body-->
        </table>
        <div class="px-10">
          <TableFooter @page-change="pageChange" :current-page="currentPage" v-model:itemsPerPage="itemsPerPage"
            :count="totalItems" :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled" />
        </div>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 13-->
  <!-- <StartDeliveryModal :OrdderData="CustomerVieworderData"></StartDeliveryModal> -->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import formatDate from "@/core/helpers/formatDate";
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import StartDeliveryModal from "@/components/driver/form/StartDeliveryModal.vue";

import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "recent-vendor-orders",

  components: {
    TableFooter,
    // StartDeliveryModal,
  },
  props: {
    widgetClasses: String,
  },
  emits: [
    "page-change",
    "on-sort",
    "on-items-select",
    "on-items-per-page-change",
  ],
  setup(props, { emit }) {
    const { API_URL, ASSETS_URL } = __CONSTANTS__;

    const DeliveriesPaginationData = ref<any>({});

    const editOrderData = ref<AllTypes.OrderType>(defaultTypes.OrderEmpty);
    const CustomerVieworderData = ref<AllTypes.OrderType>(
      defaultTypes.OrderEmpty
    );

    const dataToDisplay = ref<Array<AllTypes.OrderType> | null>(null);
    const itemsPerPage = ref<number>(4);
    const totalOrders = ref<Array<number>>([0]);
    const total = ref<number>(0);

    const AuthStore = useAuthStore();
    const { token } = AuthStore;

    const itemsPerPageDropdownEnabled = ref<boolean>(true);
    const currentPage = ref<number>(1);

    const statusFilter = {
      Pending: "warning",
      "In Progress": "primary",
      Delivered: "success",
    };

    watch(
      () => itemsPerPage.value,
      (val) => {
        currentPage.value = 1;
        emit("on-items-per-page-change", val);
      }
    );

    const totalItems = computed(() => {
      if (totalOrders.value) {
        if (totalOrders.value.length <= itemsPerPage.value) {
          return total.value;
        } else {
          return totalOrders.value.length;
        }
      }
      return 0;
    });

    const updateEditorder = async (order: AllTypes.OrderType) => {
      editOrderData.value = order;
    };
    const updateVieworder = async (order: AllTypes.OrderType) => {
      CustomerVieworderData.value = order;
    };

    watch(
      () => currentPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        dataToDisplay.value = data.data;
      }
    );
    watch(
      () => itemsPerPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        dataToDisplay.value = data.data;
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const fetchCustomerOrders = async (page) => {
      const Orders = await axios
        .get(
          API_URL +
          "getPendingOrders" +
          `/${itemsPerPage.value}` +
          `?page=${page}`,
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

    const fetchPageData = async (page: number) => {
      if (typeof page === "number") {
        return await fetchCustomerOrders(page);
      } else {
        return await fetchCustomerOrders(1);
      }
    };

    // const searchingFunc = (obj: any, value: string): boolean => {
    //   for (let key in obj) {
    //     if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
    //       if (obj[key].indexOf(value) != -1) {
    //         return true;
    //       }
    //     }
    //   }
    //   return false;
    // };

    onMounted(async () => {
      const deliveries = await fetchPageData(1);
      DeliveriesPaginationData.value = deliveries;
      console.log(deliveries);

      dataToDisplay.value = deliveries.data;
      total.value = deliveries.total;
      currentPage.value = deliveries.current_page;
    });

    return {
      getAssetPath,
      pageChange,
      currentPage,
      itemsPerPage,
      totalOrders,
      totalItems,
      dataToDisplay,
      itemsPerPageDropdownEnabled,
      ASSETS_URL,
      editOrderData,
      updateEditorder,
      CustomerVieworderData,
      updateVieworder,
      formatDate,
      statusFilter,
    };
  },
});
</script>
@/core/types/1Orders@/core/types/1Orders
