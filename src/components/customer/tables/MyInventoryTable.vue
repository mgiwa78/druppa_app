<template>
  <div class="card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">My Inventory</span>

        <span class="text-muted mt-1 fw-semobold fs-7"
          >{{ totalItems }} Inventories</span
        >
      </h3>
      <div class="card-toolbar">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_customer_inventory_request"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Apply For Inventory
        </button>
      </div>
    </div>

    <div class="card-body py-3">
      <div
        v-if="dataToDisplay?.length === 0"
        class="d-flex align-items-center justify-content-center w-100 py-5"
      >
        <h4>No Inventory</h4>
      </div>
      <div
        v-if="!dataToDisplay"
        class="d-flex align-items-center justify-content-center w-100 py-5"
      >
        <div
          class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"
        ></div>
      </div>
      <div
        v-if="dataToDisplay !== null && dataToDisplay.length !== 0"
        class="table-responsive"
      >
        <table
          class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
        >
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">Inventory ID</th>
              <th class="min-w-120px">Description</th>
              <th class="min-w-140px">Quantity</th>
              <th class="min-w-120px">Added</th>
              <th class="min-w-120px">Warehouse</th>

              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            <template v-for="Inventory in dataToDisplay" :key="Inventory.id">
              <tr>
                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary fs-6"
                    >{{ Inventory.id ? Inventory.id : "No ID" }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ Inventory.product_description }}</a
                  >
                </td>
                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ Inventory.quantity }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    {{
                      Inventory.created_at
                        ? formatDate(Inventory.created_at)
                        : "Pending Delivery"
                    }}
                  </a>
                  <!-- <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ formatDate(Inventory.created_at) }}</span
                  > -->
                </td>
                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ Inventory.warehouse_id }}</a
                  >
                  <!-- <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ formatDate(Inventory.created_at) }}</span
                  > -->
                </td>

                <td class="text-end">
                  <button
                    @click.prevent="updateViewInventory(Inventory)"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_view_customer_inventory"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="switch" icon-class="fs-3" />
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
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
      </div>
    </div>
  </div>
  <ViewCustomerInventoryModal
    :CustomerInventoryData="CustomerViewInventoryData"
  ></ViewCustomerInventoryModal>
  <AddInventoryModal></AddInventoryModal>
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

import ViewCustomerInventoryModal from "@/components/customer/forms/ViewCustomerInventoryModal.vue";
import AddInventoryModal from "@/components/customer/forms/AddInventoryModal.vue";
import ErrorHandler from "@/core/helpers/errorHandler";
import { STATUS_COLOUR_MAP } from "@/core/helpers/colourMaps";

export default defineComponent({
  name: "customer-Order-stats",
  components: {
    TableFooter,
    ViewCustomerInventoryModal,
    AddInventoryModal,
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

    const editInventoryData = ref<AllTypes.InventoryType>(
      defaultTypes.InventoryEmpty
    );
    const CustomerViewInventoryData = ref<AllTypes.InventoryType>(
      defaultTypes.InventoryEmpty
    );

    const dataToDisplay = ref<Array<AllTypes.InventoryType> | null>(null);
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

    const updateEditOrder = async (Inventory: AllTypes.InventoryType) => {
      editInventoryData.value = Inventory;
    };
    const updateViewInventory = async (Inventory: AllTypes.InventoryType) => {
      console.log(Inventory);
      CustomerViewInventoryData.value = Inventory;
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
            "inventory/customer/" +
            user.id +
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
      editInventoryData,
      updateEditOrder,
      CustomerViewInventoryData,
      updateViewInventory,
      formatDate,
      STATUS_COLOUR_MAP,
    };
  },
});
</script>
@/core/types/1Orders@/core/types/1Orders
