<template>
  <div class="card">
    <div class="card-body pt-0">
      <!--begin::Tables Widget 12-->
      <div :class="widgetClasses" class="card">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">Admin Users</span>

            <span class="text-muted mt-1 fw-semobold fs-7">{{ totalItems }} Administrative users</span>
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
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_admin">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Create Admin
            </button>
          </div>
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

            <table class="table align-middle gs-0 gy-4">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold text-muted bg-light">
                  <th class="ps-4 min-w-300px rounded-start">Name</th>
                  <th class="min-w-125px">Last Login</th>
                  <th class="min-w-200px text-center">Location</th>
                  <th class="min-w-200px text-end rounded-end"></th>
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
                            <img :src="profile.profile
                              ? `${ASSETS_URL + profile.profile}`
                              : getAssetPath('media/avatars/blank.png')
                              " alt="image" class="h-75 align-self-end" />
                          </span>
                        </div>

                        <div class="d-flex justify-content-start flex-column">
                          <span class="text-dark fw-bold text-hover-primary mb-1 fs-6">{{ profile.firstName }}</span>
                          <span class="text-muted fw-semobold text-muted d-block fs-7">{{ profile.lastName }}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{
                        formatDate(profile.created_at) }}</span>
                      <span class="text-muted fw-semobold text-muted d-block fs-7">{{}}</span>
                    </td>

                    <td class="text-center">
                      <span
                        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ profile.location.name }}</span>
                    </td>

                    <td class="text-center">
                      <button data-bs-toggle="modal" data-bs-target="#kt_modal_view_admin"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                        @click.prevent="updateViewProfile(profile)">
                        View
                      </button>

                      <button data-bs-toggle="modal" data-bs-target="#kt_modal_edit_admin"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                        @click.prevent="updateEditProfile(profile)">
                        Edit
                      </button>
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
        </div>
      </div>
    </div>
  </div>
  <AddAdminModal></AddAdminModal>
  <ViewAdminModal :ProfileData="viewProfileData"></ViewAdminModal>

  <EditAdminModal :ProfileData="editProfileData"></EditAdminModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import AddAdminModal from "@/components/admin/forms/AddAdminModal.vue";
import EditAdminModal from "@/components/admin/forms/EditAdminModal.vue";
import ViewAdminModal from "@/components/admin/forms/ViewAdminModal.vue";
import __CONSTANTS__ from "@/constants";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import formatDate from "@/core/helpers/formatDate";

import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";

import type { AllTypes } from "../../../core/types";

import { defaultTypes } from "../../../core/types/defaultData.js";

export default defineComponent({
  name: "kt-widget-12",
  components: { AddAdminModal, EditAdminModal, ViewAdminModal, TableFooter },
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
    const AdminPaginationData = ref<any>({});

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

    const fetchAllAdminProfiles = async (page) => {
      const profiles = await axios
        .get(API_URL + "admin" + `?page=${page}`, {
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
      console.log(profiles);
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
      const profiles = await fetchPageData(1);
      AdminPaginationData.value = profiles;

      dataToDisplay.value = profiles.data;

      total.value = profiles.total;
      currentPage.value = profiles.currentPage;
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
