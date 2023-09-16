<template>
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Inventries</span>

        <span class="text-muted mt-1 fw-semobold fs-7"
          >{{ totalItems }} Inventries</span
        >
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div
        v-if="dataToDisplay === null"
        class="d-flex align-items-center justify-content-center w-100 py-5"
      >
        <h4>No Records</h4>
      </div>
      <div
        v-if="!dataToDisplay?.length && dataToDisplay"
        class="d-flex align-items-center justify-content-center w-100 py-5"
      >
        <div
          class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"
        ></div>
      </div>
      <div
        v-if="dataToDisplay?.length && dataToDisplay"
        class="table-responsive"
      >
        <!--begin::Table-->
        <table
          class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">Inventory Id</th>
              <th class="min-w-140px">Description</th>
              <th class="min-w-120px">Added</th>
              <th class="min-w-120px">Warehouse</th>
              <th class="min-w-120px">Customer</th>
              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="inventory in dataToDisplay" :key="inventory.id">
              <tr>
                <td>
                  <span
                    href="#"
                    class="text-dark fw-bold text-hover-primary fs-6"
                    >{{ inventory.id }}</span
                  >
                </td>

                <td>
                  <span
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ inventory.product_description }}</span
                  >
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ formatDate(inventory.quantity) }}</span
                  >
                </td>

                <td>
                  <span
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ formatDate(inventory.created_at) }}</span
                  >
                </td>

                <td>
                  <span
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ inventory.warehouse?.name }}</span
                  >
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ inventory.warehouse?.id }}</span
                  >
                </td>

                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{
                    inventory.customer.firstName +
                    " " +
                    inventory.customer.lastName
                  }}
                </td>

                <td class="text-end">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_view_inventory"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    @click.prevent="updateViewProfile(inventory)"
                  >
                    <KTIcon icon-name="switch" icon-class="fs-3" />
                  </button>

                  <button
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </button>
                </td>
              </tr>
            </template>
          </tbody>

          <!--end::Table body-->
        </table>
        <div class="px-10">
          <TableFooter
            @page-change="pageChange"
            :current-page="currentPage"
            v-model:itemsPerPage="itemsPerPage"
            :count="totalItems"
            :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
          />
        </div>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 13-->
  <ViewInventoryModal :InventoryData="viewInventoryData"></ViewInventoryModal>
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
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import ViewInventoryModal from "@/components/admin/forms/ViewInventoryModal.vue";

export default defineComponent({
  name: "kt-widget-12",
  components: {
    TableFooter,
    ViewInventoryModal,
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

    const editProfileData = ref<AllTypes.InventoryType>(
      defaultTypes.InventoryEmpty
    );
    const viewInventoryData = ref<AllTypes.InventoryType>(
      defaultTypes.InventoryEmpty
    );

    const dataToDisplay = ref<Array<AllTypes.InventoryType> | null>([]);
    const itemsPerPage = ref<number>(10);
    const totalDeliveries = ref<Array<number>>([0]);
    const total = ref<number>(0);

    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const itemsPerPageDropdownEnabled = ref<boolean>(true);
    const currentPage = ref<number>(1);

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
          value: "50",
          color: "primary",
        },
        company: {
          name: "Intertico",
          fields: "Web, UI/UX Design",
        },
        status: {
          label: "Approved",
          color: "success",
        },
        total: "$3560",
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
          value: "50",
          color: "primary",
        },
        company: {
          name: "Agoda",
          fields: "Houses & Hotels",
        },
        status: {
          label: "In Progress",
          color: "warning",
        },
        total: "$4850",
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
          color: "primary",
        },
        company: {
          name: "RoadGee",
          fields: "Transportation",
        },
        status: {
          label: "Success",
          color: "danger",
        },
        total: "$8376",
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
          value: "50",
          color: "primary",
        },
        company: {
          name: "The Hill",
          fields: "Insurance",
        },
        status: {
          label: "Rejected",
          color: "info",
        },
        total: "$9486",
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
          value: "50",
          color: "primary",
        },
        company: {
          name: "Phillipines",
          fields: "Transportation",
        },
        status: {
          label: "Approved",
          color: "primary",
        },
        total: "$8476",
      },
    ];

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

    const updateEditProfile = async (inventory: AllTypes.InventoryType) => {
      editProfileData.value = inventory;
    };
    const updateViewProfile = async (inventory: AllTypes.InventoryType) => {
      viewInventoryData.value = inventory;
    };

    watch(
      () => currentPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        dataToDisplay.value = data.data;
        console.log(data.data);
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const fetchAllAdminProfiles = async (page) => {
      const profiles = await axios
        .get(API_URL + "inventory" + `?page=${page}`, {
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
      return profiles.data;
    };

    const fetchPageData = async (page: number) => {
      if (typeof page === "number") {
        return await fetchAllAdminProfiles(page);
      } else {
        return await fetchAllAdminProfiles(1);
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
      list,
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
      updateEditProfile,
      viewInventoryData,
      updateViewProfile,
      formatDate,
    };
  },
});
</script>
