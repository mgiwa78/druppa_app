<template>
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Inventory Application Request</span>

        <span class="text-muted mt-1 fw-semobold fs-7">{{ totalItems }} Requests</span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div v-if="dataToDisplay === null" class="d-flex align-items-center justify-content-center w-100 py-5">
        <h4>No Records</h4>
      </div>
      <div v-if="!dataToDisplay?.length && dataToDisplay"
        class="d-flex align-items-center justify-content-center w-100 py-5">
        <div class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"></div>
      </div>
      <div v-if="dataToDisplay?.length && dataToDisplay" class="table-responsive">
        <!--begin::Table-->
        <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">Request Id</th>
              <th class="min-w-120px">Pickup Address</th>
              <th class="min-w-140px">Request Description</th>
              <th class="min-w-120px">Quantity</th>
              <th class="min-w-120px">Status</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="request in dataToDisplay" :key="request.id">
              <tr>

                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{
                    request.id
                  }}
                </td>
                <td>
                  {{ request.pickup_address }}
                </td>

                <td>
                  {{ request.request_description }}
                </td>
                <td>
                  {{ request.quantity }}
                </td>

                <td>
                  <span :class="`badge-light-${request.status
                    ? STATUS_COLOUR_MAP[request.status].color
                    : 'gray'
                    }`" class="badge">{{ request.status }}</span>
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
  <!-- <ViewDeliveryModal :DeliveryData="viewDeliveryData"></ViewDeliveryModal> -->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
import formatDate from "@/core/helpers/formatDate";
import ViewDeliveryModal from "@/components/admin/forms/ViewDeliveryModal.vue";
import { STATUS_COLOUR_MAP } from "@/core/helpers/colourMaps";
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

interface InventoryRequest {
  quantity: number;
  request_description: string;
  pickup_address: string;
  id: string;
  status: string;
}
export default defineComponent({
  name: "inventory_requests_table",
  components: {
    TableFooter,
    // ViewDeliveryModal,
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

    const editProfileData = ref<InventoryRequest>(
      defaultTypes.DeliveryEmpty
    );
    const viewDeliveryData = ref<InventoryRequest>(
      defaultTypes.DeliveryEmpty
    );

    const dataToDisplay = ref<Array<InventoryRequest> | null>([]);
    const itemsPerPage = ref<number>(10);
    const totalDeliveries = ref<Array<number>>([0]);
    const total = ref<number>(0);

    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

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

    // const updateEditProfile = async (request:InventoryRequest) => {
    //   editProfileData.value = request;
    // };
    // const updateViewProfile = async (request:InventoryRequest) => {
    //   viewRequestData.value = request;
    // };

    watch(
      () => currentPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        dataToDisplay.value = data;
        console.log(data);
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const fetchUserInventoryRequests = async (page) => {
      const requests = await axios
        .get(API_URL + `customers/inventory/inventory-request` + `?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          dataToDisplay.value = null;
          if (error.response.data.message) {
            Swal.fire({
              text: error.response.data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Error Fetching Data!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          } else {
            Swal.fire({
              text: error.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Error Fetching Data!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          }
        });
      return requests.data;
    };

    const fetchPageData = async (page: number) => {
      if (typeof page === "number") {
        return await fetchUserInventoryRequests(page);
      } else {
        return await fetchUserInventoryRequests(1);
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

      dataToDisplay.value = deliveries.data;
      total.value = deliveries.total;
      currentPage.value = deliveries.current_page;
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
      editProfileData,
      viewDeliveryData,
      formatDate,
      STATUS_COLOUR_MAP,
    };
  },
});
</script>
