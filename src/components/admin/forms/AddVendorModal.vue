<template>
  <div
    class="modal fade"
    id="kt_modal_add_vendor"
    ref="addVendorModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_vendor_header">
          <!--begin::Modal CuisineType-->
          <h2 class="fw-bold">Create Vendor</h2>

          <div
            id="kt_modal_add_vendor_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <VForm
          id="kt_modal_add_vendor_form"
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
          v-slot="{}"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_vendor_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_vendor_header"
              data-kt-scroll-wrappers="#kt_modal_add_vendor_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->

              <div class="mb-5 row">
                <!--begin::Label-->

                <div class="col-6">
                  <label
                    class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                    >Vendor Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Vendor Name"
                    name="vendorName"
                    v-model="newVendor.vendorName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="vendorName" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >Contact Information</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Contact Information"
                    name="contactInformation"
                    v-model="newVendor.contactInformation"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="contactInformation" />
                    </div>
                  </div>
                </div>

                <!--end::Input-->
              </div>

              <div class="mb-5 row">
                <!--begin::Label-->
                <div class="col-6">
                  <label
                    class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                    >Email</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Email"
                    name="email"
                    v-model="newVendor.email"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label
                    class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                    >Password</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Password"
                    name="password"
                    v-model="newVendor.password"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                </div>

                <!--end::Input-->
              </div>
              <div class="mb-5 row">
                <!--begin::Label-->
                <div class="col-6">
                  <label
                    class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                    >address</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Address"
                    name="address"
                    v-model="newVendor.address"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="address" />
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
            <button
              type="reset"
              id="kt_modal_add_vendor_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_add_customer_submit"
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
import type { AllTypes } from "@/core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

interface FormData {
  ContactInformation: string;
  vendorName: string;
  CuisineType: string;
}

export default defineComponent({
  name: "add-vendor-modal",
  components: { ErrorMessage, Field, VForm },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const backdropRef = ref<null | HTMLDivElement>(null);
    const addVendorModalRef = ref<null | HTMLElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);
    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const newVendor = ref<AllTypes.VendorType>(defaultTypes.VendorEmpty);

    const validationSchema = Yup.object().shape({
      contactInformation: Yup.string().required().label("Contact Information"),
      vendorName: Yup.string().required().label("Vendor Name"),
      address: Yup.string().required().label("Address"),
      email: Yup.string().required().label("Email"),
      password: Yup.string().min(8).max(20).required().label("Password"),
    });

    const NigerianCuisineTypes = [
      "Jollof Rice",
      "Fried Rice",
      "Coconut Rice",
      "Egusi Soup",
      "Oha Soup",
      "Efo Riro",
      "Fufu",
      "Amala",
      "Pounded Yam",
      "Eba/Garri",
      "Suya",
      "Pepper Soup",
      "Moi Moi",
      "Akara",
      "Puff-Puff",
      "Chin Chin",
      "Zobo",
      "Palm Wine",
      "Chapman",
    ];

    const CreateNewVendor = async () => {
      if (submitButtonRef.value) {
        submitButtonRef.value!.disabled = true;
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const formData = new FormData();

      formData.append("contactInformation", newVendor.value.contactInformation);
      formData.append("vendorName", newVendor.value.vendorName);
      formData.append("address", newVendor.value.address);
      formData.append("email", newVendor.value.email);
      formData.append("password", newVendor.value.password);

      await axios
        .post(API_URL + "vendors", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          hideModal(addVendorModalRef.value);
          Swal.fire({
            text: "Vendor has been created!",
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

      await CreateNewVendor();

      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };

    return {
      newVendor,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      addVendorModalRef,
      NigerianCuisineTypes,
    };
  },
});
</script>
