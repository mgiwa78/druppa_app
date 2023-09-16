<template>
  <div
    class="modal fade"
    id="kt_modal_edit_vendor"
    ref="editVendorModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_vendor_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Edit Customer</h2>

          <div
            id="kt_modal_edit_customer_close"
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
          id="kt_modal_edit_customer_form"
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_edit_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_edit_vendor_header"
              data-kt-scroll-wrappers="#kt_modal_edit_customer_scroll"
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
                    v-model="editVendorData.vendorName"
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
                    v-model="editVendorData.contactInformation"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                </div>

                <!--end::Input-->
              </div>

              <div class="mb-5 row">
                <!--begin::Label-->
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >Email</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Email"
                    name="email"
                    v-model="editVendorData.email"
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
                    >Address</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Address"
                    name="address"
                    v-model="editVendorData.address"
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
          </div>

          <div class="modal-footer flex-center">
            <button
              type="reset"
              id="kt_modal_edit_vendor_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>

            <button
              ref="editSubmitButtonRef"
              type="submit"
              id="kt_edit_vendor_submit"
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
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref, type PropType } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import { useAuthStore } from "@/stores/auth";
import { hideModal } from "@/core/helpers/dom";
import statesInNigeria from "@/core/data/nigeriaStates";
import citiesInNigeria from "@/core/data/citiesInNigeria";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "edit-admin-modal",
  props: {
    VendorData: {
      type: Object as PropType<AllTypes.VendorType>,
    },
  },
  components: { ErrorMessage, Field, VForm },
  setup(props) {
    const { API_URL } = __CONSTANTS__;

    const editSubmitButtonRef = ref<null | HTMLButtonElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const editVendorModalRef = ref<null | HTMLElement>(null);

    const AuthStore = useAuthStore();
    const { user, token } = AuthStore;

    const validationSchema = Yup.object().shape({
      vendorName: Yup.string().required().label("Vendor Name"),
      contactInformation: Yup.string().required().label("Contact Information"),
      address: Yup.string().required().label("Address"),
      email: Yup.string().required().label("Email"),
    });

    const updateProfile = async () => {
      if (editSubmitButtonRef.value) {
        editSubmitButtonRef.value!.disabled = true;
        editSubmitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }
      if (!user) return;

      const EditformData = new FormData();

      EditformData.append("vendorName", editVendorData.value.vendorName);
      EditformData.append("address", editVendorData.value.address);
      EditformData.append(
        "contactInformation",
        editVendorData.value.contactInformation
      );
      EditformData.append("email", editVendorData.value.email);

      EditformData.append("_method", "put");

      await axios
        .post(API_URL + `vendors/${editVendorData.value.id}`, EditformData, {
          method: "put",
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "Profile has been Updated!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            hideModal(editVendorModalRef.value);
          });
        })
        .catch((error) => {
          ErrorHandler(error);
          hideModal(editVendorModalRef.value);
          editSubmitButtonRef.value?.removeAttribute("data-kt-indicator");
          editSubmitButtonRef.value!.disabled = false;
        })
        .finally(() => {
          hideModal(editVendorModalRef.value);
          editSubmitButtonRef.value?.removeAttribute("data-kt-indicator");
          editSubmitButtonRef.value!.disabled = false;
        });
    };

    const editVendorData = computed<AllTypes.VendorType>(() => {
      if (props.VendorData && props.VendorData.id) {
        console.log(props.VendorData);
        return {
          ...props.VendorData,
        };
      }
      return {
        ...defaultTypes.VendorEmpty,
      };
    });
    const submit = async () => {
      console.log("aaa");
      if (!editSubmitButtonRef.value) {
        return;
      }
      await updateProfile();
    };

    return {
      editVendorData,
      validationSchema,
      submit,
      editSubmitButtonRef,
      modalRef,
      editVendorModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
    };
  },
});
</script>
