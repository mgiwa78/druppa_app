<template>
  <div>
    <div class="d-flex flex-column flex-lg-row flex-wrap gap-10 justify-content-start">
      <RestaurantItem v-for="item in dataToDisplay" :item="item" :key="item.id || item.name"
        className="col-12 col-sm-8 col-md-6 col-xl-4 col-xxl-3 " :image="getAssetPath('media/stock/600x600/img-65.jpg')"
        :updateItem="updateResturantItem(item)" />
    </div>
  </div>
  <MakeDishOrderModal :item="CustomerResturantItemOrder" />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import formatDate from "@/core/helpers/formatDate";
import MakeDishOrderModal from "@/components/customer/forms/MakeDishOrderModal.vue";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import ViewInvoiceModal from "@/components/customer/forms/ViewInvoiceModal.vue";
import RestaurantItem from "@/components/general/RestaurantItem.vue";

import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "resturant-dishes-table",
  components: {
    MakeDishOrderModal, RestaurantItem
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


    const CustomerResturantItemOrder = ref<AllTypes.VendorItemType>(
      defaultTypes.VendorItemEmpty
    );

    const updateResturantItem = (VendorItem: AllTypes.VendorItemType): any => {
      CustomerResturantItemOrder.value = VendorItem;
    };

    const dataToDisplay = ref<Array<AllTypes.VendorItemType> | null>();
    const itemsPerPage = ref<number>(4);
    const totalOrders = ref<Array<number>>([0]);
    const total = ref<number>(0);

    const AuthStore = useAuthStore();
    const { token } = AuthStore;

    const itemsPerPageDropdownEnabled = ref<boolean>(true);
    const currentPage = ref<number>(1);
    const viewInvoiceData = ref<AllTypes.InvoiceType>(
      defaultTypes.InvoiceEmpty
    );

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

    watch(
      () => currentPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        dataToDisplay.value = data.data;
      }
    );
    watch(
      () => itemsPerPage.value,
      async () => {
        const data = await fetchPageData(0);
        dataToDisplay.value = data.data;
      }
    );

    const updateViewInvoice = async (profile: AllTypes.InvoiceType) => {
      viewInvoiceData.value = profile;
    };

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
      const deliveries = await fetchPageData(1);
      console.log(deliveries);
      DeliveriesPaginationData.value = deliveries;

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
      formatDate,
      statusFilter,
      updateViewInvoice,
      viewInvoiceData, updateResturantItem, CustomerResturantItemOrder
    };
  },
});
</script>
