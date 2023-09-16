<template>
  <div class="card">
    <div class="card-body pt-0">
      <!--begin::Tables Widget 12-->
      <div class="card">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">Coupon Users</span>

            <span class="text-muted mt-1 fw-semobold fs-7"
              >{{ totalItems }} Users using this coupon</span
            >
          </h3>
          <div class="card-toolbar">
            <!-- <div class="d-flex align-items-center position-relative my-1 mx-10">
              <KTIcon
                icon-name="magnifier"
                icon-class="fs-1 position-absolute ms-6"
              />
              <input
                type="text"
                v-model="search"
                class="form-control form-control-solid w-250px ps-15 mx-50"
                placeholder="Search Users"
              />
            </div> -->
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_add_admin"
            >
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Add Customer
            </button>
          </div>
        </div>
        <!--end::Header-->

        <!--begin::Body-->
        <div class="">
          <!--begin::Table container-->
          <div
            v-if="!dataToDisplay?.length"
            class="d-flex align-items-center justify-content-center w-100 py-5"
          >
            <h4>No Customers</h4>
          </div>
          <div
            v-if="!dataToDisplay?.length && dataToDisplay === null"
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

            <table class="table align-middle gs-0 gy-4">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold text-muted bg-light">
                  <th class="ps-4 min-w-300px rounded-start">Name</th>
                </tr>
              </thead>
              <!--end::Table head-->

              <!--begin::Table body-->
              <tbody>
                <template v-for="profile in dataToDisplay" :key="profile.id">
                  <tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-50px me-5">
                          <span class="symbol-label bg-light">
                            <img
                              :src="
                                profile.profile
                                  ? `${ASSETS_URL + profile.profile}`
                                  : getAssetPath('media/avatars/blank.png')
                              "
                              alt="image"
                              class="h-75 align-self-end"
                            />
                          </span>
                        </div>

                        <div class="d-flex justify-content-start flex-column">
                          <span
                            class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                            >{{ profile.firstName }}</span
                          >
                          <span
                            class="text-muted fw-semobold text-muted d-block fs-7"
                            >{{ profile.lastName }}</span
                          >
                        </div>
                      </div>
                    </td>

                    <!-- <td>
                      <span
                        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                        >{{ formatDate(profile.created_at) }}</span
                      >
        
                    </td>

                    <td class="text-center">
                      <span
                        v-for="perm in profile.permissions"
                        :key="perm.id"
                        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                        >{{ perm.permission }}</span
                      >
                    </td>

                    <td class="text-center">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_view_admin"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                        @click.prevent="updateViewProfile(profile)"
                      >
                        View
                      </button>

                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_edit_admin"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                        @click.prevent="updateEditProfile(profile)"
                      >
                        Edit
                      </button>
                    </td> -->
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
        </div>
      </div>
    </div>
  </div>
  <AddUserToCoupon></AddUserToCoupon>
</template>

<script lang="ts">

import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import AddUserToCoupon from "@/components/admin/forms/AddUserToCoupon.vue";

import __CONSTANTS__ from "@/constants";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import formatDate from "@/core/helpers/formatDate";

import { useRoute } from "vue-router";
import ErrorHandler from "@/core/helpers/errorHandler";

import axios from "axios";
import { useAuthStore } from "@/stores/auth";

import type { AllTypes } from "../../../core/types";

import { defaultTypes } from "../../../core/types/defaultData.js";

export default defineComponent({
  name: "kt-widget-12",
  components: { AddUserToCoupon, TableFooter },
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
    const route = useRoute();
    const CouponCustomersPagination = ref<any>({});

    const dataToDisplay = ref<Array<AllTypes.AdminType> | null>([]);

    const editProfileData = ref<AllTypes.AdminType>(defaultTypes.AdminEmpty);
    const viewProfileData = ref<AllTypes.AdminType>(defaultTypes.AdminEmpty);

    const AuthStore = useAuthStore();
    const { token } = AuthStore;

    const itemsPerPage = ref<number>(5);
    const totalDeliveries = ref<Array<number>>([0]);
    const total = ref<number>(0);
    const itemsPerPageDropdownEnabled = ref<boolean>(true);

    const { API_URL, ASSETS_URL } = __CONSTANTS__;
    const search = ref<string>("");
    const currentPage = ref<number>(1);

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

    watch(
      () => currentPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        dataToDisplay.value = data.data;
      }
    );

    const updateEditProfile = async (profile: AllTypes.AdminType) => {
      editProfileData.value = profile;
    };
    const updateViewProfile = async (profile: AllTypes.AdminType) => {
      viewProfileData.value = profile;
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

    const fetchAllCouponUsers = async (page) => {
      const { couponId } = route.params;

      const profiles = await axios
        .get(API_URL + "coupon/customers/" + couponId + `?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          dataToDisplay.value = null;
          ErrorHandler(error);
        });

      return profiles.data;
    };

    const fetchPageData = async (page: number) => {
      if (typeof page === "number") {
        return await fetchAllCouponUsers(page);
      } else {
        return await fetchAllCouponUsers(1);
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
      const customers = await fetchPageData(1);
      CouponCustomersPagination.value = customers;
      console.log(customers);
      dataToDisplay.value = customers.data;

      total.value = customers.total;
      currentPage.value = customers.currentPage;
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
      editProfileData,
      updateEditProfile,
      viewProfileData,
      updateViewProfile,
      formatDate,
    };
  },
});
</script>
