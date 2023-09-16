<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" v-model="search" @keyup="searchItems()" class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Vendors" />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
          <!--begin::Export-->

          <!--end::Export-->
          <!--begin::Add customer-->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_vendor">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Vendor
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->

        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center d-none" data-kt-customer-table-toolbar="selected">
          <div class="fw-bold me-5">
            <span class="me-2" data-kt-customer-table-select="selected_count"></span>Selected
          </div>
          <button type="button" class="btn btn-danger" data-kt-customer-table-select="delete_selected">
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable n dev@on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" checkbox-label="id">
        <template v-slot:name="{ row: vendor }">
          {{ vendor.vendorName }}
        </template>
        <template v-slot:email="{ row: vendor }">
          <span href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ vendor.email ? vendor.email : "No Email" }}
          </span>
        </template>

        <template v-slot:contactInformation="{ row: vendor }">
          {{
            vendor.contactInformation ? vendor.contactInformation : "Not Set"
          }}
        </template>

        <template v-slot:date="{ row: vendor }">
          {{ vendor.created_at ? formatDate(vendor.created_at) : "Not Set" }}
        </template>
        <template v-slot:actions="{ row: vendor }">
          <button href="#" data-bs-toggle="modal" data-bs-target="#kt_modal_view_vendor"
            class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
            @click.prevent="updateViewVendor(vendor)">
            View
          </button>

          <button href="#" data-bs-toggle="modal" data-bs-target="#kt_modal_edit_vendor"
            class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
            @click.prevent="updateEditVendor(vendor)">
            Edit
          </button>
          <!--end::Menu-->
        </template>
      </Datatable>
    </div>
  </div>

  <AddVendorModal></AddVendorModal>
  <ViewVendorModal :VendorData="viewVendor"></ViewVendorModal>
  <EditVendorModal :VendorData="editVendor"></EditVendorModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";

import type { ICustomer } from "@/core/data/customers";
import EditVendorModal from "@/components/admin/forms/EditVendorModal.vue";
import ViewVendorModal from "@/components/admin/forms/ViewVendorModal.vue";
import AddVendorModal from "@/components/admin/forms/AddVendorModal.vue";

import formatDate from "@/core/helpers/formatDate";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import Swal from "sweetalert2";
import arraySort from "array-sort";
import { useAuthStore } from "@/stores/auth";
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    AddVendorModal,
    EditVendorModal,
    ViewVendorModal,
  },

  setup() {
    const AuthStore = useAuthStore();
    const { token } = AuthStore;

    const tableHeader = ref([
      {
        columnName: "Vendor Name",
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
        columnName: "Contact Information",
        columnLabel: "contactInformation",
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

    const tableData = ref<Array<AllTypes.VendorType>>([]);
    const DeftableData = ref<Array<AllTypes.VendorType>>([]);

    const editVendor = ref<AllTypes.VendorType>(defaultTypes.CustomerEmpty);
    const viewVendor = ref<AllTypes.VendorType>(defaultTypes.CustomerEmpty);

    const { API_URL } = __CONSTANTS__;

    const fetchPageData = async () => {
      return await fetchVendors();
    };
    const updateEditVendor = async (vendor: AllTypes.VendorType) => {
      editVendor.value = vendor;
    };
    const updateViewVendor = async (vendor: AllTypes.VendorType) => {
      viewVendor.value = vendor;
    };

    const fetchVendors = async () => {
      const vendors = await axios
        .get(API_URL + "vendors", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          ErrorHandler(error);
        });
      console.log(vendors);
      return vendors.data;
    };

    onMounted(async () => {
      const profiles = await fetchPageData();
      console.log(profiles);
      tableData.value = profiles;
      DeftableData.value = profiles;

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
      if (search.value !== "") {
        let results: Array<AllTypes.VendorType> = [];
        for (let j = 0; j < DeftableData.value.length; j++) {
          if (searchingFunc(DeftableData.value[j], search.value)) {
            results.push(DeftableData.value[j]);
          }
        }
        tableData.value = results;
      } else {
        tableData.value = DeftableData.value;
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
      updateEditVendor,
      editVendor,
      updateViewVendor,
      viewVendor,
      formatDate,
    };
  },
});
</script>
