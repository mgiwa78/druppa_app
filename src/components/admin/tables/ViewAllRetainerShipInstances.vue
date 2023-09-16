<template>
  <div class="modal fade" id="kt_modal_view_retainership_instancesModalRef" ref="ViewRetainershipInstancesModalRef"
    tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_delivery_header">
          <h2 class="fw-bold">View Retainership Instances</h2>

          <div id="kt_modal_add_delivery_close" data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>

        <div class="card-body py-3 px-5">
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
                  <th class="min-w-50px">ID</th>
                  <th class="min-w-130px">Assigned TO</th>
                  <th class="min-w-140px">Order ID</th>

                  <th class="min-w-120px">Created at</th>

                </tr>
              </thead>
              <!--end::Table head-->

              <!--begin::Table body-->
              <tbody>
                <template v-for="retainership in AllRetainershipInstances" :key="retainership.id">
                  <tr>
                    <td>
                      <span class="text-dark fw-bold  fs-6">{{
                        retainership.id
                      }}</span>
                    </td>
                    <td class="text-dark fw-bold  fs-6">
                      {{ retainership.customer_id }}
                    </td>
                    <td class="text-dark fw-bold  fs-6">
                      {{ retainership.customer_order_id }}

                    </td>

                    <td class="text-dark fw-bold  fs-6">
                      {{ formatDate(retainership.created_at) }}

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
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref, type PropType, watch, onMounted } from "vue";
import __CONSTANTS__ from "@/constants";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import formatDate from "@/core/helpers/formatDate";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";

import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "add-delivery-modal",
  components: {
    // ErrorMessage, Field, VForm 
    TableFooter,
  }, emits: [
    "page-change",
    "on-sort",
    "on-items-select",
    "on-items-per-page-change",
  ],
  props: {
    RetainershipData: {
      type: Object as PropType<AllTypes.Retainership>,
    },
  },

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
        if (props.RetainershipData?.id) {
          const data = await fetchPageData(newValue);
          dataToDisplay.value = data.data;
          console.log(data.data);
        }
      }
    );
    const fetchPageData = async (page) => {
      if (typeof page === "number") {
        return await fetchAllRetainerships(page);
      }
    };

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const fetchAllRetainerships = async (page) => {
      const retainershipsInstances = await axios
        .get(API_URL + `retainerships/${props.RetainershipData?.id}/instances` + `?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          dataToDisplay.value = null;
          ErrorHandler(error);
        });
      console.log(retainershipsInstances)
      return retainershipsInstances.data;
    };
    // eslint-disable-next-line vue/no-async-in-computed-properties
    const AllRetainershipInstances = ref<Array<AllTypes.RetainershipInstance>>([])
    // const a = async () => {
    //   if (props.RetainershipData?.id) {
    //     const retainerships = await fetchPageData(props.RetainershipData?.id, currentPage);
    //     console.log(retainerships)
    //     return retainerships
    //   } else return props.RetainershipData
    // }
    // return a()



    watch(
      () => props.RetainershipData,
      async (newValue) => {
        if (props.RetainershipData?.id) {
          const data = await fetchPageData(1);
          dataToDisplay.value = data;
          console.log(data)
          AllRetainershipInstances.value = data;
        }
      }
    );
    onMounted(async () => {

    });

    return {
      getAssetPath,
      ASSETS_URL,
      formatDate, AllRetainershipInstances, pageChange, totalItems, currentPage, itemsPerPage, itemsPerPageDropdownEnabled, dataToDisplay,
    };
  },
});
</script>
