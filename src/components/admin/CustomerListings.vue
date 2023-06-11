<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Customers"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Export-->

          <!--end::Export-->
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Customer
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->

        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :loading="isLoading"
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="true"
        checkbox-label="id"
      >
        <template v-slot:name="{ row: customer }">
          {{ customer.firstName + " " + customer.lastName }}
        </template>
        <template v-slot:email="{ row: customer }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ customer.email ? customer.email : "No Email" }}
          </a>
        </template>
        <template v-slot:username="{ row: customer }">
          {{ customer.username ? customer.username : "No Username" }}
        </template>

        <template v-slot:paymentMethod="{ row: customer }">
          {{ customer.paymentMethod ? customer.paymentMethod : "Not Set" }}
        </template>

        <template v-slot:date="{ row: customer }">
          {{ customer.created_at ? customer.created_at : "Not Set" }}
        </template>
        <template v-slot:actions="{ row: customer }">
          <button
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_view_customer"
            class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
            @click.prevent="updateViewProfile(customer)"
          >
            View
          </button>

          <button
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_edit_admin"
            class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
            @click.prevent="updateEditProfile(customer)"
          >
            Edit
          </button>
          <!--end::Menu-->
        </template>
      </Datatable>
    </div>
  </div>

  <AddCustomerModal></AddCustomerModal>
  <ViewCustomerModal :ProfileData="viewProfileData"></ViewCustomerModal>
  <EditCustomerModal :ProfileData="editProfileData"></EditCustomerModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";

import type { ICustomer } from "@/core/data/customers";
import EditCustomerModal from "@/components/admin/forms/EditCustomerModal.vue";
import ViewCustomerModal from "@/components/admin/forms/ViewCustomerModal.vue";
import AddCustomerModal from "@/components/admin/forms/AddCustomerModal.vue";

import __CONSTANTS__ from "@/constants";
import axios from "axios";
import Swal from "sweetalert2";
import arraySort from "array-sort";

interface CustomerProfile {
  username: string;
  email: string;
  id: number;
  firstName: string;
  lastName: string;
  profile?: string;
  last_login: string;
}
export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    AddCustomerModal,
    EditCustomerModal,
    ViewCustomerModal,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Customer Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Username",
        columnLabel: "username",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Payment Method",
        columnLabel: "paymentMethod",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Created Date",
        columnLabel: "date",
        sortEnabled: true,
        columnWidth: 225,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const selectedIds = ref<Array<number>>([]);
    const isLoading = ref<boolean>(true);

    const tableData = ref<Array<ICustomer>>([]);
    const editProfileData = ref<CustomerProfile | null>(null);
    const viewProfileData = ref<CustomerProfile | null>(null);

    const { API_URL, ASSETS_URL } = __CONSTANTS__;

    const fetchPageData = async (page: number) => {
      if (typeof page === "number") {
        return await fetchAllAdminProfiles(page);
      } else {
        return await fetchAllAdminProfiles(1);
      }
    };
    const updateEditProfile = async (profile: CustomerProfile) => {
      editProfileData.value = profile;
    };
    const updateViewProfile = async (profile: CustomerProfile) => {
      viewProfileData.value = profile;
    };
    const fetchAllAdminProfiles = async (page) => {
      const profiles = await axios
        .get(API_URL + "fetchCustomerProfiles")
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
      return profiles.customer_users;
    };

    onMounted(async () => {
      const profiles = await fetchPageData(1);
      console.log(profiles);
      tableData.value = profiles;

      isLoading.value = false;
    });

    const deleteFewCustomers = () => {
      selectedIds.value.forEach((item) => {
        deleteCustomer(item);
      });
      selectedIds.value.length = 0;
    };

    const deleteCustomer = (id: number) => {
      for (let i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].id === id) {
          tableData.value.splice(i, 1);
        }
      }
    };

    const search = ref<string>("");

    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length);
      if (search.value !== "") {
        let results: Array<ICustomer> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    return {
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
      getAssetPath,
      isLoading,
      updateEditProfile,
      ViewCustomerModal,
      editProfileData,
      updateViewProfile,
      viewProfileData,
    };
  },
});
</script>
