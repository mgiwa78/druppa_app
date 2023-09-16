<template>
  <div class="modal fade" id="kt_modal_add_admin" ref="addDriverModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_admin_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add user to coupon</h2>

          <div id="kt_modal_add_admin_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <VForm id="kt_modal_add_admin_form" class="form" @submit="submit" :validation-schema="validationSchema">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_admin_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_admin_header"
              data-kt-scroll-wrappers="#kt_modal_add_admin_scroll" data-kt-scroll-offset="300px">
              <!--begin::Input group-->

              <div class="mb-5 row">
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">
                    Customer</label>

                  <Field name="userToUpload" class="form-select" as="select" v-model="userToUpload">
                    <option value="">Select a User</option>

                    <option v-for="user in allUsers" :key="user.id || user.email" :value="user.id">
                      {{ user.lastName + " " + user.firstName }}
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="userToUpload" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">
                    Allow all cumtomers</label>

                  <div class="fv row mb-10">
                    <div class="px-2 form-check form-check-custom form-check-solid">
                      <Field class="form-check-input" name="allow_all_cumtomers" v-model="allow_all_cumtomers"
                        type="radio" :value="true" />
                      <label class="form-check-label" for="flexCheckDefault">Allow all cumtomers</label>
                    </div>
                  </div>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="allow_all_cumtomers" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="reset" id="kt_modal_add_admin_cancel" class="btn btn-light me-3">
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button ref="submitButtonRef" type="submit" id="kt_modal_add_admin_submit" class="btn btn-primary">
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
import Multiselect from "@vueform/multiselect";
import { useAuthStore } from "@/stores/auth";
import type { AllTypes } from "@/core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import { useRoute } from "vue-router";
import ErrorHandler from "@/core/helpers/errorHandler";
interface FormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone_number: string;
  password: string;
  permissions: Array<string>;
}

export default defineComponent({
  name: "add-admin-modal",
  components: { ErrorMessage, Field, VForm },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;
    const router = useRoute();

    const userToUpload = ref("");

    const allUsers = ref<Array<AllTypes.CustomerType>>([]);
    const allow_all_cumtomers = ref(false);
    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const addDriverModalRef = ref<null | HTMLDivElement>(null);
    const backdropRef = ref<null | HTMLDivElement>(null);

    const modalRef = ref<null | HTMLElement>(null);

    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const fetchCustomerProfiles = async () => {
      const profiles = await axios
        .get(API_URL + "customers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          Swal.fire({
            text: error.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Error Fetching Data!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        });

      allUsers.value = profiles.data;
      return profiles.data;
    };

    onMounted(() => {
      fetchCustomerProfiles();
    });

    const newAdminData = ref<FormData>({
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      permissions: [],
      phone_number: "",
    });

    const validationSchema = Yup.object().shape({});

    onMounted(() => {
      addDriverModalRef.value = document.getElementById(
        "kt_modal_add_admin"
      ) as HTMLDivElement;
    });

    const CreateCouponRecord = async () => {
      if (submitButtonRef.value) {
        // eslint-disable-next-line
        submitButtonRef.value!.disabled = true;
        // Activate indicator
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }
      const { couponId } = router.params;
      const formData = new FormData();

      if (allow_all_cumtomers.value) {
        formData.append("customer_id", "*");
        formData.append("allow_all", "true");
      } else {
        formData.append("customer_id", userToUpload.value);
        formData.append("allow_all", "false");
      }

      formData.append("coupon_id", `${couponId}`);

      await axios
        .post(API_URL + "coupon", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "User Added Successfully!",
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
      if (!submitButtonRef.value) {
        return;
      }
      await CreateCouponRecord();
      //Disable button
      submitButtonRef.value.disabled = true;
      // Activate indicator
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      //Disable button
      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };

    return {
      newAdminData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      getAssetPath,
      Multiselect,
      allUsers,
      userToUpload,
      allow_all_cumtomers,
    };
  },
});
</script>
