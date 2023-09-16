<template>
  <!--begin::Table Widget 7-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Wallet Transactions</span>

        <span class="text-muted mt-1 fw-semobold fs-7">{{ walletTransactions?.length }} Transactions</span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <div class="tab-content">
        <template v-for="(item, index) in items" :key="index">
          <!--begin::Tap pane-->
          <div :class="[index === 0 && 'active show']" class="tab-pane fade" :id="`kt_table_widget_7_tab_${index + 1}`">
            <!--begin::Table container-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table class="table align-middle gs-0 gy-3">
                <!--begin::Table head-->
                <thead>
                  <tr>
                    <th class="p-0 w-50px"></th>
                    <th class="p-0 min-w-150px"></th>
                    <th class="p-0 min-w-140px"></th>
                    <th class="p-0 min-w-120px"></th>
                  </tr>
                </thead>
                <!--end::Table head-->

                <!--begin::Table body-->
                <tbody>
                  <template v-if="!walletTransactions">
                    <tr>
                      <td>
                        <div class="d-flex align-items-center justify-content-center w-100 py-5">
                          <div class="spinner-border spinner-border-sm align-middle ms-2 w-25px h-25px"></div>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-for="(walletTransaction, index1) in walletTransactions" :key="index1">
                    <tr>
                      <td>
                        <div class="symbol symbol-50px me-2">
                          <span :class="`bg-light-success`" class="symbol-label">
                            <KTIcon icon-name="compass" icon-class="`text-primary fs-2x`" />
                          </span>
                        </div>
                      </td>
                      <td>
                        <span class="text-dark fw-bold text-hover-primary mb-1 fs-6">{{ walletTransaction?.id }}</span>
                        <span class="text-muted fw-semobold d-block fs-7">{{
                          walletTransaction?.paymentType
                        }}</span>
                      </td>
                      <td class="text-end">
                        <span class="text-muted fw-bold d-block fs-">{{
                          formatDate(walletTransaction?.created_at)
                        }}</span>
                      </td>
                      <td class="text-end fw-bold">
                        ₦ {{ walletTransaction?.amount }}
                      </td>
                    </tr>
                  </template>
                </tbody>
                <!--end::Table body-->
              </table>
            </div>
            <!--end::Table-->
          </div>
          <!--end::Tap pane-->
        </template>
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Tables Widget 7-->
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { defineComponent, onMounted, ref } from "vue";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import ErrorHandler from "@/core/helpers/errorHandler";
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import formatDate from "@/core/helpers/formatDate";

export default defineComponent({
  name: "kt-widget-7",
  components: {},
  props: {
    widgetClasses: String,
  },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;
    const walletTransactions = ref<Array<AllTypes.WalletTransaction> | null>(
      null
    );

    const { API_URL } = __CONSTANTS__;

    const fetchTransactions = async () => {
      const Transactions = await axios
        .get(API_URL + "walletTransactions", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          ErrorHandler(error);
        });

      return Transactions.data;
    };

    onMounted(async () => {
      const RESPONSE = await fetchTransactions();
      walletTransactions.value = RESPONSE;
    });

    const items = [
      [
        {
          icon: {
            file: "scroll",
            color: "success",
          },
          info: {
            title: "Media Device",
            description: "Voice and video recorder",
          },
          date: "5 day ago",
          badge: {
            label: "Delivered",
            color: "success",
          },
        },
        {
          icon: {
            file: "category",
            color: "danger",
          },
          info: {
            title: "Special Meal",
            description: "Quona Rice",
          },
          date: "2 day ago",
          badge: {
            label: "Delivered",
            color: "danger",
          },
        },
        {
          icon: {
            file: "compass",
            color: "primary",
          },
          info: {
            title: "New Users",
            description: "Awesome Users",
          },
          date: "4 day ago",
          badge: {
            label: "Delivered",
            color: "primary",
          },
        },
        {
          icon: {
            file: "abstract-26",
            color: "warning",
          },
          info: {
            title: "Active Customers",
            description: "Best Customers",
          },
          date: "1 day ago",
          badge: {
            label: "Delivered",
            color: "warning",
          },
        },
        {
          icon: {
            file: "bucket",
            color: "info",
          },
          info: {
            title: "Strawberry Boxes",
            description: "From Spain",
          },
          date: "7 day ago",
          badge: {
            label: "Delivered",
            color: "info",
          },
        },
      ],

      [
        {
          icon: {
            file: "abstract-41",
            color: "info",
          },
          info: {
            title: "Strawberry Boxes",
            description: "From Spain",
          },
          date: "4 week ago",
          badge: {
            label: "Delivered",
            color: "info",
          },
        },
        {
          icon: {
            file: "category",
            color: "danger",
          },
          info: {
            title: "Special Meal",
            description: "Quona Rice",
          },
          date: "2 week ago",
          badge: {
            label: "Delivered",
            color: "danger",
          },
        },
        {
          icon: {
            file: "abstract-26",
            color: "warning",
          },
          info: {
            title: "Active Customers",
            description: "Best Customers",
          },
          date: "5 week ago",
          badge: {
            label: "Delivered",
            color: "warning",
          },
        },
      ],

      [
        {
          icon: {
            file: "package",
            color: "success",
          },
          info: {
            title: "Media Device",
            description: "Voice and video recorder",
          },
          date: "3 month ago",
          badge: {
            label: "Delivered",
            color: "success",
          },
        },
        {
          icon: {
            file: "category",
            color: "danger",
          },
          info: {
            title: "Special Meal",
            description: "Quona Rice",
          },
          date: "5 month ago",
          badge: {
            label: "Delivered",
            color: "danger",
          },
        },
        {
          icon: {
            file: "abstract-26",
            color: "warning",
          },
          info: {
            title: "Active Customers",
            description: "Best Customers",
          },
          date: "6 month ago",
          badge: {
            label: "Delivered",
            color: "warning",
          },
        },
        {
          icon: {
            file: "abstract-41",
            color: "info",
          },
          info: {
            title: "Strawberry Boxes",
            description: "From Spain",
          },
          date: "4 month ago",
          badge: {
            label: "Delivered",
            color: "info",
          },
        },
      ],
    ];

    return {
      items,
      user,
      walletTransactions,
      formatDate,
    };
  },
});
</script>
