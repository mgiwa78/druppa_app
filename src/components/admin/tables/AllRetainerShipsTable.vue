<template>
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">All Retainerships</span>

        <span class="text-muted mt-1 fw-semobold fs-7">{{ totalItems }} Retainerships</span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div v-if="dataToDisplay === null" class="d-flex align-items-center justify-content-center w-100 py-5">
        <div class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"></div>
      </div>
      <div v-if="dataToDisplay?.length === 0 && dataToDisplay"
        class="d-flex align-items-center justify-content-center w-100 py-5">
        <h4>No Records</h4>
      </div>
      <div v-if="dataToDisplay?.length && dataToDisplay" class="table-responsive">
        <!--begin::Table-->
        <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">ID</th>
              <th class="min-w-120px">Assigned TO</th>
              <th class="min-w-140px">Max Orders</th>

              <th class="min-w-120px">Status</th>
              <th class="min-w-120px">Created at</th>

              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="retainership in dataToDisplay" :key="retainership.id">
              <tr>
                <td>
                  <span class="text-dark fw-bold text-hover-primary fs-6">{{
                    retainership.id
                  }}</span>
                </td>
                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{ retainership.customer_id }}
                </td>
                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{ retainership.set_num_of_orders }}


                </td>

                <td class="text-dark fw-bold text-hover-primary fs-6">
                  <span :class="`badge-light-${retainership.set_num_of_orders >
                    retainership.current_num_of_orders
                    ? 'success'
                    : 'danger'
                    }`" class="badge">{{
    retainership.set_num_of_orders >
    retainership.current_num_of_orders ? 'Active' : 'Expired' }}</span>
                  <a href="#" class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"></a>

                </td>
                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{ formatDate(retainership.created_at) }}

                </td>

                <td class="text-end">
                  <button data-bs-toggle="modal" data-bs-target="#kt_modal_view_retainership_instancesModalRef"
                    class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                    @click.prevent="updateViewRetainershipData(retainership)">
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
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
  <!--end::Tables Widget 13-->
  <ViewAllRetainerShipInstances :RetainershipData="viewRetainershipData"></ViewAllRetainerShipInstances>
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
import ViewAllRetainerShipInstances from "@/components/admin/tables/ViewAllRetainerShipInstances.vue";
import { STATUS_COLOUR_MAP } from "@/core/helpers/colourMaps";
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import router from "@/router";
import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "inventory_requests_table",
  components: {
    TableFooter,
    ViewAllRetainerShipInstances,
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


    const viewRetainershipData = ref<AllTypes.Retainership>(defaultTypes.DeliveryEmpty);
    const updateViewRetainershipData = async (profile: AllTypes.Retainership) => {
      viewRetainershipData.value = profile;
    };
    const dataToDisplay = ref<Array<AllTypes.Retainership> | null>(null);
    const itemsPerPage = ref<number>(10);
    const totalCoupons = ref<Array<number>>([0]);
    const total = ref<number>(0);

    const AuthStore = useAuthStore();
    const { token } = AuthStore;

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
      if (totalCoupons.value) {
        if (totalCoupons.value.length <= itemsPerPage.value) {
          return total.value;
        } else {
          return totalCoupons.value.length;
        }
      }
      return 0;
    });



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

    const fetchAllRetainerships = async (page) => {
      const coupons = await axios
        .get(API_URL + "retainerships" + `?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          dataToDisplay.value = null;
          ErrorHandler(error);
        });
      return coupons.data;
    };

    const fetchPageData = async (page: number) => {
      if (typeof page === "number") {
        return await fetchAllRetainerships(page);
      } else {
        return await fetchAllRetainerships(1);
      }
    };



    onMounted(async () => {
      const retainerships = await fetchPageData(1);

      console.log(
        retainerships
      )
      dataToDisplay.value = retainerships.data;
      total.value = retainerships.total;
      currentPage.value = retainerships.current_page;
    });

    return {
      checkedRows,
      getAssetPath,
      pageChange,
      currentPage,
      itemsPerPage,
      totalCoupons,
      totalItems,
      dataToDisplay,
      itemsPerPageDropdownEnabled,
      ASSETS_URL,
      updateViewRetainershipData,
      viewRetainershipData,
      formatDate,
      STATUS_COLOUR_MAP,
    };
  },
});
</script>
