<template>
  <div
    class="modal fade"
    id="kt_modal_view_reciept"
    ref="viewInvoiceModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <div class="modal-content p-12">
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 class="fw-bold">Invoice Details</h2>
          </div>
          <!--begin::Card title-->

          <!--begin::Card toolbar-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-3">
          <!--begin::Section-->
          <div class="mb-10">
            <!--begin::Title-->
            <h5 class="mb-4">Billing Address:</h5>
            <!--end::Title-->

            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="flex-equal me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">Bill to:</td>
                    <td class="text-gray-800 min-w-200px">
                      <router-link
                        to="/subscriptions/view"
                        class="text-gray-800 text-hover-primary"
                      >
                        {{ InvoiceData?.customer.address }}</router-link
                      >
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Customer Name:</td>
                    <td class="text-gray-800">
                      {{
                        InvoiceData?.customer.firstName +
                        " " +
                        InvoiceData?.customer.lastName
                      }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Address:</td>
                    <td class="text-gray-800">
                      {{ InvoiceData?.customer.address }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Phone:</td>
                    <td class="text-gray-800">
                      {{ InvoiceData?.customer.phone_number }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-gray-400">Pick up Location :</td>
                    <td class="text-gray-800">
                      {{
                        InvoiceData?.customer_order.pickup_address +
                        ", " +
                        InvoiceData?.customer_order.pickup_state
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-gray-400">Destination Address:</td>
                    <td class="text-gray-800">
                      {{
                        InvoiceData?.customer_order.dropoff_address +
                        ", " +
                        InvoiceData?.customer_order.dropoff_state
                      }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->

              <!--begin::Row-->
              <div class="flex-equal">
                <!--begin::Details-->
                <table class="table fs-6 fw-semobold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px">
                      Package type:
                    </td>
                    <td class="text-gray-800 min-w-200px">
                      <a href="#" class="text-gray-800 text-hover-primary">{{
                        InvoiceData?.customer_order.package_type
                      }}</a>
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Subscription Fees:</td>
                    <td class="text-gray-800">
                      ₦{{ InvoiceData?.customer_order.total_payment }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Payment type:</td>
                    <td class="text-gray-800">
                      {{ InvoiceData?.customer_order.payment_type }}
                    </td>
                  </tr>
                  <!--end::Row-->

                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Currency:</td>
                    <td class="text-gray-800">
                      {{ InvoiceData?.payment.currency }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-gray-400">Location Type:</td>
                    <td class="text-gray-800">
                      {{ InvoiceData?.customer_order.location_type }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Section-->

          <!--begin::Section-->
          <div class="mb-0">
            <!--begin::Title-->
            <h5 class="mb-4">Bill:</h5>
            <!--end::Title-->

            <!--begin::Product table-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table class="table align-middle table-row-dashed fs-6 gy-4 mb-0">
                <!--begin::Table head-->
                <thead>
                  <!--begin::Table row-->
                  <tr
                    class="border-bottom border-gray-200 text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"
                  >
                    <th class="min-w-150px">Service</th>
                    <th class="min-w-125px">Incoice ID</th>
                    <th class="min-w-125px">Payment type</th>
                    <th class="min-w-125px">Total</th>
                  </tr>
                  <!--end::Table row-->
                </thead>
                <!--end::Table head-->

                <!--begin::Table body-->
                <tbody class="fw-semobold text-gray-800">
                  <tr>
                    <td>
                      <label class="w-150px"></label>
                      <div class="fw-normal text-gray-600">
                        {{
                          InvoiceData?.created_at
                            ? formatDate(InvoiceData?.created_at)
                            : ""
                        }}
                      </div>
                    </td>
                    <td>
                      {{ InvoiceData?.id }}
                    </td>
                    <td>
                      {{ InvoiceData?.payment.payment_method }}
                    </td>
                    <td>₦ {{ InvoiceData?.customer_order.total_payment }}</td>
                  </tr>
                </tbody>
                <!--end::Table body-->
              </table>
              <!--end::Table-->
            </div>
            <!--end::Product table-->
          </div>
          <!--end::Section-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, type PropType } from "vue";
import __CONSTANTS__ from "@/constants";
import formatDate from "@/core/helpers/formatDate";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
export default defineComponent({
  name: "add-delivery-modal",
  components: {
    // ErrorMessage, Field, VForm
  },
  props: {
    InvoiceData: {
      type: Object as PropType<AllTypes.InvoiceType>,
    },
  },
  setup(props) {
    const { ASSETS_URL } = __CONSTANTS__;

    const CustomerViewDeliveryData = computed(() => {
      console.log(props.InvoiceData);

      if (props.InvoiceData && props.InvoiceData.id) {
        return {
          customer: { ...props.InvoiceData.customer } || {
            ...defaultTypes.InvoiceEmpty.customer_order,
          },
          id: props.InvoiceData.id || "",
          customer_id: props.InvoiceData.customer_id || "",
          customer_order_id: props.InvoiceData.customer_order_id || "",
          customer_order: { ...props.InvoiceData.customer_order } || {
            ...defaultTypes.InvoiceEmpty.customer_order,
          },
        };
      }
      return {
        ...defaultTypes.InventoryEmpty,
      };
    });
    return {
      getAssetPath,
      CustomerViewDeliveryData,
      ASSETS_URL,
      formatDate,
    };
  },
});
</script>
