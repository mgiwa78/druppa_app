<template>
  <div
    class="modal fade"
    id="kt_modal_edit_admin"
    ref="editAdminModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_admin_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Edit Admin User</h2>

          <div
            id="kt_modal_edit_admin_close"
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
                    v-model="editAdminData.firstName"
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
                    v-model="editAdminData.lastName"
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
                    >Phone Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="phone_number"
                    name="phone_number"
                    v-model="editAdminData.phone_number"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="phone_number" />
                    </div>
                  </div>
                </div>
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
                    v-model="editAdminData.email"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>

                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="mb-5 row">
                <!--begin::Label-->

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
                <!--
                <div class="col-6">
                  <label
                    class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                    >Password</label
                  >

                <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Your API Name"
                    name="password"
                    v-model="editAdminData.password"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                </div> -->
              </div>
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
import { computed, defineComponent, ref, type PropType } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import { useAuthStore } from "@/stores/auth";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import Multiselect from "@vueform/multiselect";
import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "edit-admin-modal",
  props: {
    ProfileData: {
      type: Object as PropType<AllTypes.AdminType>,
    },
  },
  components: { ErrorMessage, Field, VForm, Multiselect },
  setup(props) {
    const { API_URL } = __CONSTANTS__;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);

    const AuthStore = useAuthStore();
    const { user, token } = AuthStore;

    const permissionsSelect = ref({
      mode: "tags",
      value: [] as any,
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

    const editAdminData = computed(() => {
      console.log("object");
      if (props.ProfileData && props.ProfileData.id) {
        updatePermissionsSelect();

        return {
          firstName: props.ProfileData.firstName || "",
          lastName: props.ProfileData.lastName || "",
          email: props.ProfileData.email || "",
          gender: props.ProfileData.gender || "",
          profile: props.ProfileData.profile || "",
          phone_number: props.ProfileData.phone_number || "",
          id: props.ProfileData.id || "",
          permissions:
            props.ProfileData.permissions?.map((item) => item.permission) || [],
        };
      }

      return {
        ...defaultTypes.AdminEmpty,
      };
    });
    // const editAdminData = ref<AdminProfile>({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   username: "",
    //   profile: "",
    //   last_login: "",
    //   id: null,
    //   permissions: [],
    // });
    const updatePermissionsSelect = () => {
      permissionsSelect.value.value = props.ProfileData?.permissions
        ? props.ProfileData?.permissions.map((item) => item.permission)
        : [];
    };
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().label("Email"),
      phone_number: Yup.string().required().label("phone_number"),
    });

    // watch([props.ProfileData], () => {
    //   console.log(props.ProfileData);

    //   if (props.ProfileData?.id) {
    //     console.log(props.ProfileData);
    //     editAdminData.value = props.ProfileData;
    //   }
    // });
    const updateProfile = async () => {
      if (submitButtonRef.value) {
        // eslint-disable-next-line
        submitButtonRef.value!.disabled = true;
        // Activate indicator
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }
      if (!user) return;

      const formData = new FormData();
      formData.append("id", `${editAdminData.value.id}`);

      formData.append("firstName", editAdminData.value.lastName!);
      formData.append("lastName", editAdminData.value.firstName!);
      formData.append("phone_number", editAdminData.value.phone_number!);
      formData.append("gender", editAdminData.value.gender!);
      formData.append("permissions", `${editAdminData.value.permissions}`);
      formData.append("email", editAdminData.value.email!);
      formData.append("_method", "put");
      // formData.append("state", editAdminData.value.state!);

      await axios
        .post(API_URL + `admin`, formData, {
          method: "put",
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "Profile has been updated!",
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
      await updateProfile();

      //Disable button
      if (submitButtonRef.value) {
        submitButtonRef.value.disabled = false;

        submitButtonRef.value?.removeAttribute("data-kt-indicator");
      }
    };

    return {
      editAdminData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
      permissionsSelect,
    };
  },
});
</script>
