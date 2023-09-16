<template>
  <div class="card">
    <div class="card-body pt-0">
      <div :class="widgetClasses" class="card">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">Vendor Items</span>

            <span class="text-muted mt-1 fw-semobold fs-7">{{ totalItems }} My Items</span>
          </h3>
          <div class="card-toolbar">

            <a href="#/vendor/vendorItems/create" class="btn btn-primary">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Create Item
            </a>
          </div>
        </div>

        <div class="card-body py-3">
          <div v-if="dataToDisplay === null" class="d-flex align-items-center justify-content-center w-100 py-5">
            <h4>No Records</h4>
          </div>
          <div v-if="!dataToDisplay?.length && dataToDisplay"
            class="d-flex align-items-center justify-content-center w-100 py-5">
            <div class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"></div>
          </div>

          <div v-if="dataToDisplay?.length && dataToDisplay" class="table-responsive">

            <table class="table align-middle gs-0 gy-4">
              <thead>
                <tr class="fw-bold text-muted bg-light">
                  <th class="ps-4 min-w-300px rounded-start">Name</th>
                  <th class="min-w-125px">Category</th>
                  <th class="min-w-125px">Created</th>
                  <th class="min-w-150px text-center">Price</th>
                  <th class="min-w-150px text-center">Description</th>
                  <th class="min-w-150px text-end rounded-end"></th>
                </tr>
              </thead>

              <tbody>
                <template v-for="vendorItem in dataToDisplay" :key="vendorItem.id">
                  <tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-50px me-5">
                          <span class="symbol-label bg-light">
                            <img :src="vendorItem.image
                              ? `${ASSETS_URL + vendorItem.image}`
                              : getAssetPath('media/avatars/blank.png')
                              " alt="image" class="h-75 align-self-end" />
                          </span>
                        </div>

                        <div class="d-flex justify-content-start flex-column">
                          <span class="text-dark fw-bold text-hover-primary mb-1 fs-6">{{ vendorItem.name }}</span>

                        </div>
                      </div>
                    </td>

                    <td>
                      <span class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{
                        vendorItem.vendor_item_category_id }}</span>
                    </td>

                    <td>
                      <span class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">Date Created</span>
                      <span class="text-muted fw-semobold text-muted d-block fs-7">{{
                        formatDate(vendorItem.created_at) }}</span>
                    </td>
                    <td>
                      <span class="text-dark text-center fw-bold text-hover-primary d-block mb-1 fs-6">{{
                        vendorItem.price }}</span>
                    </td>
                    <td>
                      <span class="text-muted fw-semobold text-muted d-block fs-7">{{
                        vendorItem.description }}</span>
                    </td>



                    <td class="text-center">
                      <button data-bs-toggle="modal" data-bs-target="#kt_modal_view_admin"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                        @click.prevent="updateViewVendorItem(vendorItem)">
                        View
                      </button>

                      <button data-bs-toggle="modal" data-bs-target="#kt_modal_edit_admin"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                        @click.prevent="updateEditVendorItem(vendorItem)">
                        Edit
                      </button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="px-10">
              <TableFooter @page-change="pageChange" :current-page="currentPage" v-model:itemsPerPage="itemsPerPage"
                :count="totalItems" :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <AddAdminModal></AddAdminModal> -->
  <ViewVendorItemModal :VendorData="viewVendorItemData"></ViewVendorItemModal>

  <EditVendorItemModal :VendorData="editVendorItemData"></EditVendorItemModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import EditVendorItemModal from "@/components/vendor/forms/EditVendorItemModal.vue";
import ViewVendorItemModal from "@/components/vendor/forms/ViewVendorItemModal.vue";
import __CONSTANTS__ from "@/constants";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import formatDate from "@/core/helpers/formatDate";

import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "kt-widget-12",
  components: { EditVendorItemModal, ViewVendorItemModal, TableFooter },
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
    const VendorItemsPaginationData = ref<any>({});

    const dataToDisplay = ref<Array<AllTypes.VendorItemType> | null>([]);

    const editVendorItemData = ref<AllTypes.VendorItemType>(defaultTypes.VendorItemEmpty);
    const viewVendorItemData = ref<AllTypes.VendorItemType>(defaultTypes.VendorItemEmpty);

    const AuthStore = useAuthStore();
    const { token } = AuthStore;

    const itemsPerPage = ref<number>(5);
    const totalDeliveries = ref<Array<number>>([0]);
    const total = ref<number>(0);
    const itemsPerPageDropdownEnabled = ref<boolean>(true);

    const { API_URL, ASSETS_URL } = __CONSTANTS__;
    const search = ref<string>("");
    const currentPage = ref<number>(0);

    watch(
      () => itemsPerPage.value,
      (val) => {
        currentPage.value = 1;
        emit("on-items-per-page-change", val);
      }
    );

    // const searchItems = () => {
    //   tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
    //   if (search.value !== "") {
    //     let results: Array<ICustomer> = [];
    //     for (let j = 0; j < tableData.value.length; j++) {
    //       if (searchingFunc(tableData.value[j], search.value)) {
    //         results.push(tableData.value[j]);
    //       }
    //     }
    //     tableData.value.splice(0, tableData.value.length, ...results);
    //   }
    // };

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


    const updateEditVendorItem = async (vendor: AllTypes.VendorItemType) => {
      editVendorItemData.value = vendor;
    };
    const updateViewVendorItem = async (vendor: AllTypes.VendorItemType) => {
      viewVendorItemData.value = vendor;
    };

    watch(
      () => currentPage.value,
      async (newValue) => {
        const VendorItems = await fetchPageData(newValue);
        dataToDisplay.value = VendorItems.data;
        VendorItemsPaginationData.value = VendorItems;
        total.value = VendorItems.total;
        currentPage.value = VendorItems.currentPage;
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const fetchAllVendorItems = async (page) => {
      const VendorItems = await axios
        .get(API_URL + "vendorItem" + `?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          ErrorHandler(error)
        });
      console.log(VendorItems);
      return VendorItems.data;
    };

    const fetchPageData = async (page: number) => {
      if (typeof page === "number") {
        return await fetchAllVendorItems(page);
      } else {
        return await fetchAllVendorItems(1);
      }
    };



    onMounted(async () => {

      currentPage.value = 1;
    });

    return {
      search,
      getAssetPath,
      pageChange,
      currentPage,
      itemsPerPage,
      totalDeliveries,
      totalItems,
      dataToDisplay,
      itemsPerPageDropdownEnabled,
      ASSETS_URL,
      editVendorItemData,
      updateEditVendorItem,
      viewVendorItemData,
      updateViewVendorItem,
      formatDate,
    };
  },
});
</script>
