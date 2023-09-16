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
          <h2 class="fw-bold">View Inventory Delivery Request</h2>

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
            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ viewInventoryDeliveryRequest.inventory_id }}
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
                <div class="row">
                  <div class="col-12">
                    <div class="fw-bold mt-5">Quantity</div>
                    <div class="text-gray-600">
                      {{ viewInventoryDeliveryRequest.inventory.quantity }}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Request Description</div>
                  <div class="text-gray-600">
                    {{ viewInventoryDeliveryRequest.requestDescription }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Request Quantity</div>
                  <div class="text-gray-600">
                    {{ viewInventoryDeliveryRequest.requestQuantity }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Delivery Address</div>
                  <div class="text-gray-600">
                    <span class="text-gray-600 text-hover-primary">
                      {{ viewInventoryDeliveryRequest.deliveryAddress }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">status</div>
                  <div class="text-gray-600">
                    {{ viewInventoryDeliveryRequest.status }}
                  </div>
                </div>
                <div class="col-6">
                  <button
                    ref="ApproveButtonRef"
                    type="submit"
                    id="kt_Approve_inventry_request_submit"
                    class="btn btn-primary"
                    @click="handleInventryDeliveryRequestApproval"
                  >
                    <span class="indicator-label"> Approve </span>
                    <span class="indicator-progress">
                      Please wait...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>
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
import { computed, defineComponent, ref, type PropType, onMounted } from "vue";
import __CONSTANTS__ from "@/constants";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import formatDate from "@/core/helpers/formatDate";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import ErrorHandler from "@/core/helpers/errorHandler";
import Swal from "sweetalert2";

export default defineComponent({
  name: "view_inventory_delivery_request",
  components: {
    // ErrorMessage, Field, VForm
  },
  props: {
    InventoryDeliveryRequest: {
      type: Object as PropType<AllTypes.inventoryDeliveryRequest>,
    },
  },

  setup(props) {
    const AuthStore = useAuthStore();
    const { token } = AuthStore;

    const { API_URL, ASSETS_URL } = __CONSTANTS__;
    const ApproveButtonRef = ref<null | HTMLButtonElement>(null);

    const CurrentInventoryQuantity = ref<number>();

    const viewInventoryDeliveryRequest = computed(() => {
      if (props.InventoryDeliveryRequest && props.InventoryDeliveryRequest.id) {
        console.log(props.InventoryDeliveryRequest.inventory);
        console.log(defaultTypes.InventoryDeliveryRequest);
        return {
          customer: props.InventoryDeliveryRequest.customer,
          inventory: props.InventoryDeliveryRequest.inventory
            ? props.InventoryDeliveryRequest.inventory
            : defaultTypes.InventoryDeliveryRequest.inventory,
          id: props.InventoryDeliveryRequest.id || "",
          inventory_id: props.InventoryDeliveryRequest.inventory_id || "",
          deliveryAddress: props.InventoryDeliveryRequest.deliveryAddress || "",
          requestDescription:
            props.InventoryDeliveryRequest.requestDescription || "",
          requestQuantity: props.InventoryDeliveryRequest.requestQuantity || "",
          status: props.InventoryDeliveryRequest.status || "",
        };
      }
      return {
        ...defaultTypes.InventoryDeliveryRequest,
      };
    });

    const fetchCurrentInventoryQuantity = async (inventory_id: number) => {
      const quantity = await axios
        .get(
          API_URL + "inventoryDeliveryRequest/confirmQuantity/" + inventory_id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .catch((error) => {
          ErrorHandler(error);
        });
    };
    const handleInventryDeliveryRequestApproval = async () => {
      if (ApproveButtonRef.value) {
        ApproveButtonRef.value!.disabled = true;
        ApproveButtonRef.value.setAttribute("data-kt-indicator", "on");
      }
      const formData = new FormData();

      formData.append(
        "inventoryDeliveryRequestID",
        `${props.InventoryDeliveryRequest?.id}`
      );

      const viewInventoryDeliveryRequestApproval = await axios
        .post(API_URL + "inventoryDeliveryRequest/approveRequest", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);

          Swal.fire({
            text: "Request Approved",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Close",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        })
        .catch((error) => {
          ErrorHandler(error);
        });

      ApproveButtonRef.value?.removeAttribute("data-kt-indicator");
      ApproveButtonRef.value!.disabled = false;
    };
    return {
      getAssetPath,
      viewInventoryDeliveryRequest,
      ASSETS_URL,
      formatDate,
      ApproveButtonRef,
      handleInventryDeliveryRequestApproval,
    };
  },
});
</script>
