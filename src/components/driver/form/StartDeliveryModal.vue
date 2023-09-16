<template>
  <div class="modal fade"
       id="kt_start_delivery_modal"
       ref="startDeleveryModalRef"
       tabindex="-1"
       aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header"
             id="kt_start_delivery_modal_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Start Delivery</h2>

          <div id="kt_start_delivery_modal_close"
               data-bs-dismiss="modal"
               class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross"
                    icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->

        <!--begin::Modal body-->
        <div class="modal-body py-10 px-lg-17">
          <!--begin::Scroll-->
          <div class="scroll-y me-n7 pe-7"
               id="kt_start_delivery_modal_scroll"
               data-kt-scroll="true"
               data-kt-scroll-activate="{default: false, lg: true}"
               data-kt-scroll-max-height="auto"
               data-kt-scroll-dependencies="#kt_start_delivery_modal_header"
               data-kt-scroll-wrappers="#kt_start_delivery_modal_scroll"
               data-kt-scroll-offset="300px">
            <!--begin::Input group-->

            <div class="row mb-7">
              <!--begin::Label-->

              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Order Type</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    OrderData?.order_type
                  }}</span>
                </div>
              </div>

              <!--end::Col-->
            </div>

            <div class="row mb-7">
              <!--begin::Label-->

              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Customer Name</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    OrderData?.customer.firstName +
                    " " +
                    OrderData?.customer.lastName
                  }}</span>
                </div>
              </div>
              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Origin</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    OrderData?.origin
                  }}</span>
                </div>
              </div>
              <!--end::Col-->
            </div>

            <div class="row mb-7">
              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Location Type</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    OrderData?.location_type
                  }}</span>
                </div>
              </div>
              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Pickup Location</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    OrderData?.pickup_address
                  }}</span>
                </div>
              </div>
              <!--begin::Label-->

              <!--end::Col-->
            </div>
            <div class="row mb-7"
                 v-if="OrderData?.location_type === 'Inter-State'">
              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Pickup State</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    OrderData?.pickup_state
                  }}</span>
                </div>
              </div>
              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Drop-off Location</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    OrderData?.dropoff_state
                  }}</span>
                </div>
              </div>
              <!--begin::Label-->

              <!--end::Col-->
            </div>

            <div class="row mb-7">
              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Drop Off Location</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    OrderData?.dropoff_address
                  }}</span>
                </div>
              </div>
              <div class="col-6">
                <label class="col-lg-4 fw-semobold text-muted">Order Placed At</label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-bold fs-6 text-dark">{{
                    formatDate(OrderData?.created_at!)
                  }}</span>
                </div>
              </div>
              <!--begin::Label-->

              <!--end::Col-->
            </div>
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--begin::Button-->

          <!--end::Button-->

          <!--begin::Button-->
          <button ref="submitButtonRef"
                  v-on:click.prevent="StartDelivery()"
                  id="kt_start_delivery_modal_submit"
                  class="btn btn-primary">
            <span class="indicator-label"> Go For Pickup</span>
            <span class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal footer-->
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import formatDate from "@/core/helpers/formatDate";

import Multiselect from "@vueform/multiselect";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import type { PropType } from "vue";

import ErrorHandler from "@/core/helpers/errorHandler";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "start-delivery-modal",
  props: {
    OrderData: {
      type: Object as PropType<AllTypes.OrderType>,
    },
  },
  components: {},
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const startDeleveryModalRef = ref<null | HTMLDivElement>(null);
    const backdropRef = ref<null | HTMLDivElement>(null);

    const modalRef = ref<null | HTMLElement>(null);

    const { API_URL } = __CONSTANTS__;

    const AuthStore = useAuthStore();
    const { user, token } = AuthStore;

    const permissionsSelect = ref({
      mode: "tags",
      value: [],
      placeholder: "Select permissions",
      search: true,
      trackBy: "name",
      label: "name",
      options: [
        {
          value: "editCustomer",
          name: "Edit Customer",
        },
        {
          value: "addCustomer",
          name: "Add Customer",
        },
        {
          value: "deleteCustomer",
          name: "Delete Customer",
        },
      ],
    });
    const orderData = ref<AllTypes.OrderType>(defaultTypes.OrderEmpty);

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().label("Email"),
      userName: Yup.string().required().label("UserName"),
      password: Yup.string().required().label("Password"),
      permissions: Yup.string().required().label("Permissions"),
    });

    onMounted(() => {
      startDeleveryModalRef.value = document.getElementById(
        "kt_start_delivery_modal"
      ) as HTMLDivElement;
    });
    const StartDelivery = async () => {
      if (submitButtonRef.value) {
        // eslint-disable-next-line
        submitButtonRef.value!.disabled = true;
        // Activate indicator
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const formData = new FormData();

      await axios
        .patch(
          API_URL + `deliveries/driver/assignDelivery/${props.OrderData?.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          Swal.fire({
            text: "Delivery Initiated successfully!",
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
        })
        .finally(() => {
          submitButtonRef.value?.removeAttribute("data-kt-indicator");
          submitButtonRef.value!.disabled = false;
        });
    };
    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      await StartDelivery();

      backdropRef.value = document.querySelector(
        ".modal-backdrop"
      ) as HTMLDivElement;

      console.log(backdropRef.value);
      startDeleveryModalRef.value?.removeAttribute("aria-modal");
      startDeleveryModalRef.value?.removeAttribute("role");
      startDeleveryModalRef.value?.setAttribute("aria-hidden", "true");

      startDeleveryModalRef.value!.style.display = "none";
      startDeleveryModalRef.value?.classList.remove("show");
      backdropRef.value?.classList.remove("show");
      backdropRef.value?.remove();
      //Disable button
      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };

    return {
      orderData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      getAssetPath,
      permissionsSelect,
      Multiselect,
      formatDate,
      StartDelivery,
    };
  },
});
</script>
@/core/types/1Orders
