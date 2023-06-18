<template>
  <div class="card">
    <div class="card-body pt-0">
      <!--begin::Tables Widget 12-->
      <div :class="widgetClasses" class="card">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">Admin Users</span>

            <span class="text-muted mt-1 fw-semobold fs-7"
              >{{ totalItems }} Administrative users</span
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
              Create Admin
            </button>
          </div>
        </div>
        <!--end::Header-->

        <!--begin::Body-->
        <div class="card-body py-3">
          <!--begin::Table container-->
          <div
            v-if="!dataToDisplay.length"
            class="d-flex align-items-center justify-content-center w-100 py-5"
          >
            <div
              class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"
            ></div>
          </div>
          <div v-else class="table-responsive">
            <!--begin::Table-->

            <table class="table align-middle gs-0 gy-4">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold text-muted bg-light">
                  <th class="ps-4 min-w-300px rounded-start">Name</th>
                  <th class="min-w-125px">Last Login</th>
                  <th class="min-w-200px text-center">Permissions</th>
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

                    <td>
                      <span
                        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                        >{{ formatDate(profile.last_login) }}</span
                      >
                      <span
                        class="text-muted fw-semobold text-muted d-block fs-7"
                        >{{}}</span
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
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_view_admin"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                        @click.prevent="updateViewProfile(profile)"
                      >
                        View
                      </button>

                      <button
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_edit_admin"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                        @click.prevent="updateEditProfile(profile)"
                      >
                        Edit
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
                v-model:itemsPerPage="itemsInTable"
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

interface AdminProfile {
  username: string;
  email: string;
  id: number;
  firstName: string;
  lastName: string;
  profile?: string;
  city: string;
  last_login: string;
  address: string;
  phone_number: string;
  gender: string;
  state: string;
  type: string;
  created_at: string;
  title: string;
  permissions: Array<Permission>;
}
interface Permission {
  id: number;
  admin_id: number;
  permission: string;
  status: string;
}
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

    const dataToDisplay = ref<Array<AdminProfile>>([]);
    const editProfileData = ref<AdminProfile>({
      username: "",
      email: "",
      id: 0,
      firstName: "",
      lastName: "",
      profile: "",
      city: "",
      last_login: "",
      address: "",
      phone_number: "",
      gender: "",
      state: "",
      type: "",
      created_at: "",
      title: "",
      permissions: [],
    });
    const viewProfileData = ref<AdminProfile>({
      username: "",
      email: "",
      id: 0,
      firstName: "",
      lastName: "",
      profile: "",
      city: "",
      last_login: "",
      address: "",
      phone_number: "",
      gender: "",
      state: "",
      type: "",
      created_at: "",
      title: "",
      permissions: [],
    });
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const itemsInTable = ref<number>(5);
    const totalProfiles = ref<Array<number>>([0]);
    const total = ref<number>(0);
    const itemsPerPageDropdownEnabled = ref<boolean>(true);

    const { API_URL, ASSETS_URL } = __CONSTANTS__;
    const search = ref<string>("");
    const currentPage = ref<number>(1);

    watch(
      () => itemsInTable.value,
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
      if (totalProfiles.value) {
        if (totalProfiles.value.length <= itemsInTable.value) {
          return total.value;
        } else {
          return totalProfiles.value.length;
        }
      }
      return 0;
    });

    watch(
      () => currentPage.value,
      async (newValue) => {
        const data = await fetchPageData(newValue);
        console.log(data);
        dataToDisplay.value = data.data;
      }
    );

    const updateEditProfile = async (profile: AdminProfile) => {
      editProfileData.value = profile;
    };
    const updateViewProfile = async (profile: AdminProfile) => {
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
      const profiles = await fetchPageData(1);
      AdminPaginationData.value = profiles;

      dataToDisplay.value = profiles.data;

      total.value = profiles.total;
      currentPage.value = profiles.currentPage;
    });
    const list = [
      {
        agent: {
          image: getAssetPath("media/svg/avatars/001-boy.svg"),
          name: "Brad Simmons",
          skills: "HTML, JS, ReactJS",
        },
        earnings: {
          value: "$8,000,000",
          remarks: "Pending",
        },
        comission: {
          value: "$5,400",
          remarks: "Paid",
        },
        company: {
          name: "Intertico",
          fields: "Web, UI/UX Design",
        },
        rating: {
          value: 5,
          remarks: "Best Rated",
        },
      },
      {
        agent: {
          image: getAssetPath("media/svg/avatars/047-girl-25.svg"),
          name: "Lebron Wayde",
          skills: "PHP, Laravel, VueJS",
        },
        earnings: {
          value: "$8,750,000",
          remarks: "Paid",
        },
        comission: {
          value: "$7,400",
          remarks: "Paid",
        },
        company: {
          name: "Agoda",
          fields: "Houses & Hotels",
        },
        rating: {
          value: 4,
          remarks: "Above Avarage",
        },
      },
      {
        agent: {
          image: getAssetPath("media/svg/avatars/006-girl-3.svg"),
          name: "Brad Simmons",
          skills: "HTML, JS, ReactJS",
        },
        earnings: {
          value: "$8,000,000",
          remarks: "In Proccess",
        },
        comission: {
          value: "$2,500",
          remarks: "Rejected",
        },
        company: {
          name: "RoadGee",
          fields: "Paid",
        },
        rating: {
          value: 5,
          remarks: "Best Rated",
        },
      },
      {
        agent: {
          image: getAssetPath("media/svg/avatars/014-girl-7.svg"),
          name: "Natali Trump",
          skills: "HTML, JS, ReactJS",
        },
        earnings: {
          value: "$700,000",
          remarks: "Pending",
        },
        comission: {
          value: "$7,760",
          remarks: "Paid",
        },
        company: {
          name: "The Hill",
          fields: "Insurance",
        },
        rating: {
          value: 3,
          remarks: "Avarage",
        },
      },
      {
        agent: {
          image: getAssetPath("media/svg/avatars/020-girl-11.svg"),
          name: "	Jessie Clarcson",
          skills: "HTML, JS, ReactJS",
        },
        earnings: {
          value: "$1,320,000",
          remarks: "Pending",
        },
        comission: {
          value: "$6,250",
          remarks: "Paid",
        },
        company: {
          name: "Intertico",
          fields: "Web, UI/UX Design",
        },
        rating: {
          value: 5,
          remarks: "Best Rated",
        },
      },
    ];

    return {
      search,
      list,
      getAssetPath,
      pageChange,
      currentPage,
      itemsInTable,
      totalProfiles,
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
