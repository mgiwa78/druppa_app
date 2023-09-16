<template>
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">All Coupons</span>

        <span class="text-muted mt-1 fw-semobold fs-7">{{ totalItems }} Coupons</span>
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
              <th class="min-w-150px">Coupon Code</th>
              <th class="min-w-120px">Valid from</th>
              <th class="min-w-140px">Valid Till</th>
              <th class="min-w-120px">Coupon Type</th>
              <th class="min-w-120px">Coupom Amount</th>

              <th class="min-w-120px">Status</th>

              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="coupon in dataToDisplay" :key="coupon.id">
              <tr>
                <td>
                  <span class="text-dark fw-bold text-hover-primary fs-6">{{
                    coupon.code
                  }}</span>
                </td>
                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{ formatDate(coupon.validFrom) }}
                </td>
                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{ formatDate(coupon.validUntill) }}

                  <!-- <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ coupon.customer_order.pickup_address }}</a
                  >
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ formatDate(coupon.pickup_date) }}</span
                  > -->
                </td>

                <td>
                  <span :class="`badge-light-${coupon.couponType === 'percentageDiscount'
                    ? 'warning'
                    : coupon.couponType === 'reductionDiscount'
                      ? 'primary'
                      : ''
                    }`" class="badge">
                    {{
                      coupon.couponType === "percentageDiscount"
                      ? "Percentage Discount"
                      : coupon.couponType === "reductionDiscount"
                        ? "Reduction Discount"
                        : "No type"
                    }}
                  </span>
                </td>

                <td>
                  {{
                    coupon.couponType === "percentageDiscount"
                    ? coupon.percentageDiscount
                    : coupon.couponType === "reductionDiscount"
                      ? coupon.reductionAmount
                      : "NO TYPE"
                  }}

                  <!-- <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ coupon.customer_order.pickup_state }}</a
                  >
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ coupon.customer_order.pickup_city }}</span
                  > -->
                </td>

                <td>
                  <span :class="`badge-light-${coupon.status.toString() === '1'
                          ? 'success'
                          : coupon.status.toString() === '1'
                            ? 'danger'
                            : ''
                        }`" class="badge">{{
        coupon.status.toString() === "1"
        ? "Active"
        : coupon.status.toString() === "1"
          ? "In-Active"
          : ""
      }}</span>
                </td>

                <td class="text-end">
                  <button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    @click.prevent="routeToModifyCoupon(coupon)">
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
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
  <!-- <ViewDeliveryModal :DeliveryData="viewCouponData"></ViewDeliveryModal> -->
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
// import ViewDeliveryModal from "@/components/admin/forms/ViewDeliveryModal.vue";
import { STATUS_COLOUR_MAP } from "@/core/helpers/colourMaps";
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import router from "@/router";
import ErrorHandler from "@/core/helpers/errorHandler";

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

    const CouponPaginationData = ref<any>({});

    const editProfileData = ref<AllTypes.CouponType>(
      defaultTypes.DeliveryEmpty
    );

    const viewCouponData = ref<AllTypes.CouponType>(defaultTypes.DeliveryEmpty);

    const dataToDisplay = ref<Array<AllTypes.CouponType> | null>(null);
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

    const routeToModifyCoupon = (coupon: AllTypes.CouponType) => {
      router.push({
        name: "editCoupon",
        params: {
          couponId: coupon.id,
        },
      });
    };

    watch(
      () => currentPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        dataToDisplay.value = data.data;
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const fetchAllCoupons = async (page) => {
      const coupons = await axios
        .get(API_URL + "coupon" + `?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          dataToDisplay.value = [];
          ErrorHandler(error);
        });
      return coupons.data;
    };

    const fetchPageData = async (page: number) => {
      if (typeof page === "number") {
        return await fetchAllCoupons(page);
      } else {
        return await fetchAllCoupons(1);
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
      CouponPaginationData.value = deliveries;

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
      totalCoupons,
      totalItems,
      dataToDisplay,
      itemsPerPageDropdownEnabled,
      ASSETS_URL,
      editProfileData,
      viewCouponData,
      routeToModifyCoupon,
      formatDate,
      STATUS_COLOUR_MAP,
    };
  },
});
</script>
