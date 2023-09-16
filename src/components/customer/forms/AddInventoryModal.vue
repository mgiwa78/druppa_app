<template>
  <div class="modal fade" id="kt_modal_customer_inventory_request" ref="InventoryRequestModalRef" tabindex="-1"
    aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Apply For Inventory Storage</h2>

          <div id="kt_modal_add_customer_close" data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <VForm id="kt_modal_add_customer_form" class="form" @submit="submit" :validation-schema="validationSchema"
          v-slot="{}">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
              <!--begin::Input group-->

              <div class="mb-5 row">
                <!--begin::Label-->
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">Quantity</label>
                  <Field type="number" class="form-control form-control-solid" placeholder="Quantity" name="quantity"
                    aria-disabled="true" v-model="InventoryRequest.quantity" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="quantity" />
                    </div>
                  </div>
                </div>

              </div>
              <!--end::Input-->
              <div class="mb-5 row">
                <!--begin::Label-->

                <div class="col-12">
                  <label class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2">Request Description</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <textarea type="textarea" class="form-control form-control-solid" placeholder="Request description"
                    name="requestDescription" v-model="InventoryRequest.requestDescription"></textarea>
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
                  <label class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2">Pickup Address</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <textarea type="textarea" class="form-control form-control-solid" placeholder="Pickup Address"
                    name="pickupAddress" v-model="InventoryRequest.pickupAddress"></textarea>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="pickupAddress" />
                    </div>
                  </div>
                </div>
                <!--end::Input-->
              </div>


            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="reset" id="kt_modal_add_customer_cancel" class="btn btn-light me-3">
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button ref="submitButtonRef" type="submit" id="kt_add_customer_submit" class="btn btn-primary">
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import statesInNigeria from "@/core/data/nigeriaStates";
import citiesInNigeria from "@/core/data/citiesInNigeria";
import { useAuthStore } from "@/stores/auth";
import ErrorHandler from "@/core/helpers/errorHandler";


interface inventoryRequest {
  quantity: number;
  requestDescription: string;
  pickupAddress: string;
}
export default defineComponent({
  name: "add-inventory-modal",
  components: { ErrorMessage, Field, VForm },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const backdropRef = ref<null | HTMLDivElement>(null);
    const addCustomerModalRef = ref<null | HTMLElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);
    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const InventoryRequest = ref<inventoryRequest>({
      quantity: 0,
      requestDescription: "sdfsdfdsf",
      pickupAddress: "sdfsdf",
    });


    const validationSchema = Yup.object().shape({
      quantity: Yup.string().required().label("Quantity"),
    });

    const SendInventoryRequest = async () => {

      if (submitButtonRef.value) {
        submitButtonRef.value!.disabled = true;
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const formData = new FormData();

      formData.append("quantity", `${InventoryRequest.value.quantity}`);
      formData.append("request_description", InventoryRequest.value.requestDescription);
      formData.append("pickup_address", InventoryRequest.value.pickupAddress);



      await axios
        .post(API_URL + `customers/${user.id}/request-inventory`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          hideModal(addCustomerModalRef.value);
          Swal.fire({
            text: "Inventory Request has been sent!",
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
          ErrorHandler(error)
        })
        .then(() => {
          submitButtonRef.value?.removeAttribute("data-kt-indicator");
          submitButtonRef.value!.disabled = false;
        });
    };

    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      console.log("object")

      await SendInventoryRequest();

      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };

    return {
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      addCustomerModalRef,
      InventoryRequest,
    };
  },
});
</script>
