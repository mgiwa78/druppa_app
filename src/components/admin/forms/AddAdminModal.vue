<template>
  <div
    class="modal fade"
    id="kt_modal_add_admin"
    ref="addDriverModalRef"
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
          id="kt_modal_add_admin_form"
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_admin_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_admin_header"
              data-kt-scroll-wrappers="#kt_modal_add_admin_scroll"
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
                    placeholder="Password"
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
                  <label class="fw-bold font-weight-bolderfs-5 fw-semobold mb-2"
                    >Permissions</label
                  >
                  <!--end::Label-->
                  <Multiselect
                    class="form-select form-select-solid"
                    v-model="permissionsSelect.value"
                    v-bind="permissionsSelect"
                  >
                    <template
                      v-slot:tag="{ option, handleTagRemove, disabled }"
                    >
                      <div class="multiselect-tag is-user">
                        <img :src="option.image" />
                        {{ option.name }}
                        <i
                          v-if="!disabled"
                          @click.prevent
                          @mousedown.prevent.stop="
                            handleTagRemove(option, $event)
                          "
                        ></i>
                      </div>
                    </template>

                    <template v-slot:option="{ option }">
                      <img class="user-image" :src="option.image" />
                      {{ option.name }}
                    </template>
                  </Multiselect>
                </div>
                <!--end::Input-->
              </div>
              <div class="mb-5 row">
                <!--begin::Label-->
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >Phone Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Phone"
                    name="phone_number"
                    v-model="newAdminData.phone_number"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="phone_number" />
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
              id="kt_modal_add_admin_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_add_admin_submit"
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
import Multiselect from "@vueform/multiselect";
import { useAuthStore } from "@/stores/auth";

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
  components: { ErrorMessage, Field, VForm, Multiselect },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const addDriverModalRef = ref<null | HTMLDivElement>(null);
    const backdropRef = ref<null | HTMLDivElement>(null);

    const modalRef = ref<null | HTMLElement>(null);

    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const permissionsSelect = ref({
      mode: "tags",
      value: [],
      placeholder: "Select permissions",
      search: true,
      trackBy: "name",
      label: "name",
      options: [
        {
          value: "editDriver",
          name: "Edit Driver",
        },
        {
          value: "addDriver",
          name: "Add Driver",
        },
        {
          value: "deleteDriver",
          name: "Delete Driver",
        },
      ],
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

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().label("Email"),
      userName: Yup.string().required().label("UserName"),
      password: Yup.string().required().label("Password"),
      phone_number: Yup.string().required().label("Phone Number"),
      // permissions: Yup.string().required().label("Permissions"),
    });

    onMounted(() => {
      addDriverModalRef.value = document.getElementById(
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
      formData.append("phone_number", newAdminData.value.phone_number);
      formData.append("permissions", JSON.stringify(permissionsSelect.value));

      await axios
        .post(API_URL + "admin", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
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

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      await CreateAdminProfile();

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
      permissionsSelect,
      Multiselect,
    };
  },
});
</script>
