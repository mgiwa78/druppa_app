<template>
  <div
    class="modal fade"
    id="kt_modal_view_customer_inventory"
    ref="viewCustomerInventoryModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_delivery_header">
          <h2 class="fw-bold">View Inventory</h2>

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
              <img :src="getAssetPath('media/avatars/blank.png')" alt="image" />
            </div>

            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ InventoryData.id }}
            </a>

            <!-- <div class="fs-5 fw-semobold text-muted mb-6">
              {{ InventoryData.type }}
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
                  <div class="fw-bold mt-5">Customer Name</div>
                  <div class="text-gray-600">
                    {{
                      InventoryData.customer?.firstName +
                      " " +
                      InventoryData.customer?.lastName
                    }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Driver Name</div>
                  <div class="text-gray-600">
                    {{ InventoryData.warehouse.location }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Origin</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary">
                      {{ InventoryData.warehouse.name }}</a
                    >
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Added</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary">
                      {{ formatDate(InventoryData.created_at) }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Destination</div>
                  <div class="text-gray-600">
                    {{ InventoryData.product_description }}
                  </div>
                </div>

                <div class="col-6">
                  <div class="fw-bold mt-5">Quantity</div>
                  <div class="text-gray-600">
                    {{ InventoryData.quantity }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_view_inventory_order"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_view_inventory_order"
            >
              Place Inventory Delivery Request
              <span class="ms-2 rotate-180">
                <KTIcon icon-name="down" icon-class="fs-3" />
              </span>
            </div>
          </div>
          <div class="separator separator-dashed my-3"></div>

          <div id="kt_customer_view_inventory_order" class="collapse show">
            <div class="py-5 fs-6">
              <VForm
                class="form"
                @submit="submit"
                :validation-schema="validationSchema"
                v-slot="{}"
              >
                <div class="mb-5 row">
                  <!--begin::Label-->
                  <div class="col-6">
                    <label class="fw-bold required fs-5 fw-semobold mb-2"
                      >Available Quantity</label
                    >
                    <Field
                      type="text"
                      class="form-control form-control-solid"
                      placeholder="Avilable Quantity"
                      name="avilableQuantity"
                      aria-disabled="true"
                      v-model="InventoryData.quantity"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="avilableQuantity" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <label class="fw-bold required fs-5 fw-semobold mb-2"
                      >Request Quantity</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <Field
                      type="number"
                      class="form-control form-control-solid"
                      placeholder="Request Quantity"
                      name="requestQuantity"
                      v-model="InventoryDeliveryRequest.requestQuantity"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="requestQuantity" />
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Input-->
                <div class="mb-5 row">
                  <!--begin::Label-->

                  <div class="col-12">
                    <label
                      class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                      >Request Description</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <textarea
                      type="textarea"
                      class="form-control form-control-solid"
                      placeholder="Request description"
                      name="requestDescription"
                      v-model="InventoryDeliveryRequest.requestDescription"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="requestDescription" />
                      </div>
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <div class="mb-5 row">
                  <!--begin::Label-->

                  <div class="col-12">
                    <label
                      class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                      >Delivery Address</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <textarea
                      type="textarea"
                      class="form-control form-control-solid"
                      placeholder="Enter Delivery Address"
                      name="deliveryAddress"
                      v-model="InventoryDeliveryRequest.deliveryAddress"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="deliveryAddress" />
                      </div>
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <div class="mb-5">
                  <button
                    type="reset"
                    id="inventory_delivery_requestRef_cancel"
                    class="btn btn-light me-3"
                  >
                    Discard
                  </button>

                  <button
                    ref="inventoryDeliveryRequestRef"
                    type="submit"
                    id="inventory_delivery_requestRef"
                    class="btn btn-primary"
                  >
                    <span class="indicator-label"> Submit </span>
                    <span class="indicator-progress">
                      Please wait...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>
                </div>
              </VForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, type PropType, ref } from "vue";
import __CONSTANTS__ from "@/constants";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import formatDate from "@/core/helpers/formatDate";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import ErrorHandler from "@/core/helpers/errorHandler";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2";

export default defineComponent({
  name: "add-delivery-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  props: {
    CustomerInventoryData: {
      type: Object as PropType<AllTypes.InventoryType>,
    },
  },

  setup(props) {
    console.log(props.CustomerInventoryData);
    const AuthStore = useAuthStore();
    const { token, user } = AuthStore;

    const { ASSETS_URL, API_URL } = __CONSTANTS__;
    // const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const inventoryDeliveryRequestRef = ref<null | HTMLButtonElement>(null);

    const validationSchema = Yup.object().shape({
      avilableQuantity: Yup.number().required().label("Avilable Quantity"),
      requestQuantity: Yup.number().required().label("Request Quantity"),
    });

    const InventoryDeliveryRequest = ref<AllTypes.inventoryDeliveryRequest>(
      defaultTypes.InventoryDeliveryRequest
    );

    const InventoryData = computed(() => {
      if (props.CustomerInventoryData && props.CustomerInventoryData.id) {
        return {
          id: props.CustomerInventoryData.id || "",
          warehouse_id: props.CustomerInventoryData.warehouse_id || "",
          product_description:
            props.CustomerInventoryData.product_description || "",
          quantity: props.CustomerInventoryData.quantity || "",
          created_at: props.CustomerInventoryData.created_at || "",
          customer: props.CustomerInventoryData.customer || "",
          warehouse: {
            id: props.CustomerInventoryData.id || "",
            created_at: props.CustomerInventoryData.warehouse?.capacity || "",
            location: props.CustomerInventoryData.warehouse?.location || "",
            name: props.CustomerInventoryData.warehouse?.name || "",
          },
        };
      }
      return {
        ...defaultTypes.InventoryEmpty,
      };
    });

    const SendInventoryDeliveryRequest = async () => {
      const formData = new FormData();

      formData.append("customer_id", `${user.id}`);
      formData.append("inventory_id", `${props.CustomerInventoryData?.id}`);
      formData.append(
        "requestDescription",
        InventoryDeliveryRequest.value.requestDescription
      );
      formData.append(
        "requestQuantity",
        `${InventoryDeliveryRequest.value.requestQuantity}`
      );
      formData.append(
        "deliveryAddress",
        InventoryDeliveryRequest.value.deliveryAddress
      );

      await axios
        .post(API_URL + "inventoryDeliveryRequest", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          InventoryDeliveryRequest.value =
            defaultTypes.InventoryDeliveryRequest;
          Swal.fire({
            text: "Your request has been sent!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        })
        .catch((error) => {
          ErrorHandler(error);
        });
    };

    const submit = async () => {
      if (!inventoryDeliveryRequestRef.value) {
        return;
      }
      inventoryDeliveryRequestRef.value.disabled = true;
      inventoryDeliveryRequestRef.value.setAttribute("data-kt-indicator", "on");

      await SendInventoryDeliveryRequest();

      inventoryDeliveryRequestRef.value?.removeAttribute("data-kt-indicator");
      inventoryDeliveryRequestRef.value!.disabled = false;
    };

    return {
      getAssetPath,
      InventoryData,
      ASSETS_URL,
      formatDate,
      InventoryDeliveryRequest,
      validationSchema,
      submit,
      inventoryDeliveryRequestRef,
    };
  },
});
</script>
