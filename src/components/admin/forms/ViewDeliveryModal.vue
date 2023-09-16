<template>
  <div
    class="modal fade"
    id="kt_modal_view_delivery"
    ref="viewDeliveryModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_delivery_header">
          <h2 class="fw-bold">View Delivery Profile</h2>

          <div
            id="kt_modal_add_delivery_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <div class="card-body p-10">
          <div class="d-flex flex-center flex-column mb-5">
            <div class="symbol symbol-100px mb-7">
              <img
                :src="
                  viewDeliveryData.image
                    ? `${ASSETS_URL + viewDeliveryData.image}`
                    : getAssetPath('media/avatars/blank.png')
                "
                alt="image"
              />
            </div>

            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ viewDeliveryData.tracking_number }}
            </a>

            <!-- <div class="fs-5 fw-semobold text-muted mb-6">
              {{ viewDeliveryData.type }}
            </div> -->
          </div>

          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_view_details"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_view_details"
            >
              Details
              <span class="ms-2 rotate-180">
                <KTIcon icon-name="down" icon-class="fs-3" />
              </span>
            </div>
          </div>

          <div class="separator separator-dashed my-3"></div>

          <div id="kt_customer_view_details" class="collapse show">
            <div class="py-5 fs-6">
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Driver Name</div>
                  <div class="text-gray-600">
                    {{
                      viewDeliveryData.driver?.firstName +
                      " " +
                      viewDeliveryData.driver?.lastName
                    }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Customer Name</div>
                  <div class="text-gray-600">
                    {{
                      viewDeliveryData.customer?.firstName +
                      " " +
                      viewDeliveryData.customer?.lastName
                    }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Origin</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary">
                      viewDeliveryData.customer_order.pickup_address
                      <!-- {{ viewDeliveryData.customer_order.pickup_address }}</a -->
                    </a>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Destination</div>
                  <div class="text-gray-600">
                    <!-- {{ viewDeliveryData.customer_order.pickup_address }} -->
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">Pickup date</div>
                  <div class="text-gray-600">
                    {{ formatDate(viewDeliveryData.pickup_date) }}
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">Delivery date</div>
                  <div class="text-gray-600">
                    {{ formatDate(viewDeliveryData.delivery_date) }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">status</div>
                  <div class="text-gray-600">
                    {{ viewDeliveryData.status }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref, type PropType } from "vue";
import __CONSTANTS__ from "@/constants";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import formatDate from "@/core/helpers/formatDate";

export default defineComponent({
  name: "add-delivery-modal",
  components: {
    // ErrorMessage, Field, VForm
  },
  props: {
    DeliveryData: {
      type: Object as PropType<AllTypes.DeliveryType>,
    },
  },
  setup(props) {
    const { API_URL, ASSETS_URL } = __CONSTANTS__;

    const viewDeliveryData = computed(() => {
      console.log(props.DeliveryData);

      if (props.DeliveryData && props.DeliveryData.id) {
        return {
          customer: props.DeliveryData.customer,
          id: props.DeliveryData.id || "",
          customer_order_id: props.DeliveryData.customer_order_id || "",
          customer_order: props.DeliveryData.customer_order_id || "",
          tracking_number: props.DeliveryData.tracking_number || "",
          status: props.DeliveryData.status || "",
          pickup_date: props.DeliveryData.pickup_date || "",
          delivery_date: props.DeliveryData.delivery_date || "",
          driver: defaultTypes.DriverEmpty,
          image: props.DeliveryData.image || "",
        };
      }
      return {
        ...defaultTypes.DeliveryEmpty,
      };
    });
    return {
      getAssetPath,
      viewDeliveryData,
      ASSETS_URL,
      formatDate,
    };
  },
});
</script>
