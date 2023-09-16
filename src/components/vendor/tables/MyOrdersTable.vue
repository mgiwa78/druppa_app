<template>
  <div class="card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Vendor Orders</span>

        <span class="text-muted mt-1 fw-semobold fs-7">{{ totalItems }} Orders</span>
      </h3>
    </div>

    <div class="card-body py-3">
      <div v-if="dataToDisplay?.length === 0"
           class="d-flex align-items-center justify-content-center w-100 py-5">
        <h4>No Orders</h4>
      </div>
      <div v-if="!dataToDisplay"
           class="d-flex align-items-center justify-content-center w-100 py-5">
        <div class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"></div>
      </div>
      <div v-if="dataToDisplay !== null"
           class="table-responsive">
        <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">Tracking Number</th>
              <th class="min-w-120px">Driver</th>
              <th class="min-w-140px">Origin</th>
              <th class="min-w-120px">Destination</th>
              <th class="min-w-120px">State</th>

              <th class="min-w-120px">Status</th>

              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            <template v-for="Order in dataToDisplay"
                      :key="Order.id">
              <tr>
                <td>
                  <a href="#"
                     class="text-dark fw-bold text-hover-primary fs-6">{{
                       Order.delivery
                       ? Order.delivery?.tracking_number
                       : "Pending Pickup"
                     }}</a>
                </td>
                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{
                    Order.delivery
                    ? Order.delivery?.driver.firstName +
                    " " +
                    Order.delivery?.driver.lastName
                    : "Pending Pickup"
                  }}
                </td>
                <td>
                  <a href="#"
                     class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ Order.pickup_address }}</a>
                  <span class="text-muted fw-semobold text-muted d-block fs-7">{{
                    Order.delivery
                    ? formatDate(Order.delivery?.pickup_date)
                    : "Pending Delivery"
                  }}</span>
                </td>

                <td>
                  <a href="#"
                     class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ Order.dropoff_address }}</a>
                  <span class="text-muted fw-semobold text-muted d-block fs-7">{{ formatDate(Order.created_at) }}</span>
                </td>

                <td>
                  <a href="#"
                     class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ Order.pickup_address }}</a>
                  <span class="text-muted fw-semobold text-muted d-block fs-7">{{ Order.origin }}</span>
                </td>

                <td>
                  <span :class="`badge-light-${Order?.delivery
                    ? STATUS_COLOUR_MAP[Order?.delivery.status]?.color
                    : STATUS_COLOUR_MAP[Order?.status]?.color
                    }`"
                        class="badge">{{
                          Order?.delivery ? Order?.delivery.status : Order?.status
                        }}</span>
                </td>

                <td class="text-end">
                  <button v-if="Order.delivery"
                          data-bs-toggle="modal"
                          data-bs-target="#kt_modal_view_customer_order"
                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          @click.prevent="
                            Order.delivery ? updateViewOrder(Order) : null
                            ">
                    <KTIcon icon-name="switch"
                            icon-class="fs-3" />
                  </button>

                  <!-- <button
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                   </button>-->
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="px-10">
          <TableFooter @page-change="pageChange"
                       :current-page="currentPage"
                       v-model:itemsPerPage="itemsPerPage"
                       :count="totalItems"
                       :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled" />
        </div>
      </div>
    </div>
  </div>
  <ViewCustomerOrderModal :CustomerOrderData="CustomerViewOrderData"></ViewCustomerOrderModal>
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
import ViewCustomerOrderModal from "@/components/customer/forms/ViewCustomerOrderModal.vue";
import ErrorHandler from "@/core/helpers/errorHandler";
import { STATUS_COLOUR_MAP } from "@/core/helpers/colourMaps";

export default defineComponent({
  name: "customer-Order-stats",
  components: {
    TableFooter,
    ViewCustomerOrderModal,
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
    const CustomerViewOrderData = ref<AllTypes.OrderType>(
      defaultTypes.OrderEmpty
    );

    const dataToDisplay = ref<Array<AllTypes.OrderType> | null>(null);
    const itemsPerPage = ref<number>(10);
    const totalDeliveries = ref<Array<number>>([0]);
    const total = ref<number>(0);

    const AuthStore = useAuthStore();
    const { user, token } = AuthStore;

    const itemsPerPageDropdownEnabled = ref<boolean>(true);
    const currentPage = ref<number>(1);

    const checkedRows = ref<Array<number>>([]);

    watch(
      () => itemsPerPage.value,
      (val) => {
        currentPage.value = 1;
        emit("on-items-per-page-change", val);
      }
    );
    const totalItems = computed(() => {
      if (totalDeliveries.value) {
        if (totalDeliveries.value.length <= itemsPerPage.value) {
          return total.value;
        } else {
          return totalDeliveries.value.length;
        }
      }
      return 0;
    });

    const updateEditOrder = async (Order: AllTypes.OrderType) => {
      editOrderData.value = Order;
    };
    const updateViewOrder = async (Order: AllTypes.OrderType) => {
      console.log(Order);
      CustomerViewOrderData.value = Order;
    };

    watch(
      () => currentPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        dataToDisplay.value = data.data;
      }
    );
    // watch(
    //   () => itemsPerPage.value,
    //   async (newValue) => {
    //     currentPage.value = 1;
    //     const data = await fetchPageData(currentPage.value);
    //     dataToDisplay.value = data;
    //   }
    // );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const fetchCustomerOrders = async (page) => {
      const Orders = await axios
        .get(
          API_URL +
          "customerorders/vendor/orders" +
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
      const { data } = deliveries;
      dataToDisplay.value = data;
      console.log(data);
      total.value = deliveries.total;
      currentPage.value = deliveries.current_page;

      // dataToDisplay.value = "deliveries.data";
    });

    return {
      checkedRows,
      getAssetPath,
      pageChange,
      currentPage,
      itemsPerPage,
      totalDeliveries,
      totalItems,
      dataToDisplay,
      itemsPerPageDropdownEnabled,
      ASSETS_URL,
      editOrderData,
      updateEditOrder,
      CustomerViewOrderData,
      updateViewOrder,
      formatDate,
      STATUS_COLOUR_MAP,
    };
  },
});
</script>
@/core/types/1Orders@/core/types/1Orders
