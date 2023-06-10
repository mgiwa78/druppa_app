<template>
  <div
    class="modal fade"
    id="kt_modal_add_admin"
    ref="addCustomerModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_admin_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Create Admin User</h2>

          <div
            id="kt_modal_add_admin_close"
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
          id="kt_modal_create_api_key_form"
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_create_api_key_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_create_api_key_header"
              data-kt-scroll-wrappers="#kt_modal_create_api_key_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->

              <div class="mb-5 row">
                <!--begin::Label-->
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >First Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="First Name"
                    name="firstName"
                    v-model="newAdminData.firstName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label
                    class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                    >Last Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Last Name"
                    name="lastName"
                    v-model="newAdminData.lastName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                </div>
                <!--end::Input-->
              </div>

              <div class="mb-5 row">
                <!--begin::Label-->
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >Username</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Username"
                    name="userName"
                    v-model="newAdminData.userName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="userName" />
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
                    placeholder="Your API Name"
                    name="password"
                    v-model="newAdminData.password"
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
                    v-model="newAdminData.email"
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
                    >Permissions</label
                  >
                  <!--end::Label-->

                  <Field
                    name="permissions"
                    data-control="select2"
                    data-hide-search="true"
                    data-placeholder="Select a Permissions..."
                    class="form-select form-select-solid"
                    as="select"
                    v-model="newAdminData.permissions"
                  >
                    <option value="">Select a Category...</option>
                    <option value="1">CRM</option>
                    <option value="2">Project Alice</option>
                    <option value="3">Keenthemes</option>
                    <option value="4">General</option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="permissions" />
                    </div>
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->

              <!--end::Input group-->

              <!--end::Input group-->

              <!--begin::Input group-->

              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_create_api_key_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_create_api_key_submit"
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

interface FormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  permissions: Array<string>;
}

export default defineComponent({
  name: "add-admin-modal",
  components: { ErrorMessage, Field, VForm },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const addCustomerModalRef = ref<null | HTMLDivElement>(null);
    const backdropRef = ref<null | HTMLDivElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);
    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const newAdminData = ref<FormData>({
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      permissions: [],
    });

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().label("Email"),
      userName: Yup.string().required().label("UserName"),
      password: Yup.string().required().label("Password"),
      permissions: Yup.string().required().label("Permissions"),
    });

    onMounted(() => {
      addCustomerModalRef.value = document.getElementById(
        "kt_modal_add_admin"
      ) as HTMLDivElement;
    });
    const CreateAdminProfile = async () => {
      if (submitButtonRef.value) {
        // eslint-disable-next-line
        submitButtonRef.value!.disabled = true;
        // Activate indicator
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const formData = new FormData();

      formData.append("firstName", newAdminData.value.firstName);
      formData.append("lastName", newAdminData.value.lastName);
      formData.append("email", newAdminData.value.email);
      formData.append("username", newAdminData.value.userName);
      formData.append("password", newAdminData.value.password);

      await axios
        .post(API_URL + "createAdminProfile", formData)
        .then(() => {
          Swal.fire({
            text: "Profile has been created!",
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
          if (error.response.data.message == "User does not exist") {
            Swal.fire({
              text: "Invalid Email or Password",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Try again!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            }).then(() => {
              submitButtonRef.value?.removeAttribute("data-kt-indicator");
              submitButtonRef.value!.disabled = false;
            });
          } else {
            Swal.fire({
              text: `${error.message}`,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Try again!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            }).then(() => {
              submitButtonRef.value?.removeAttribute("data-kt-indicator");
              submitButtonRef.value!.disabled = false;
            });
          }
        });
    };
    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      //Disable button
      submitButtonRef.value.disabled = true;
      // Activate indicator
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      await CreateAdminProfile();

      backdropRef.value = document.querySelector(
        ".modal-backdrop"
      ) as HTMLDivElement;

      console.log(backdropRef.value);
      addCustomerModalRef.value?.removeAttribute("aria-modal");
      addCustomerModalRef.value?.removeAttribute("role");
      addCustomerModalRef.value?.setAttribute("aria-hidden", "true");

      addCustomerModalRef.value!.style.display = "none";
      addCustomerModalRef.value?.classList.remove("show");
      backdropRef.value?.classList.remove("show");
      backdropRef.value?.remove();
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
      createAPIKeyModalRef,
      getAssetPath,
    };
  },
});
</script>
