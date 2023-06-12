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
                    >Username</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Username"
                    name="username"
                    v-model="editAdminData.username"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="username" />
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
                    v-model="editAdminData.permissions"
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
import { computed, defineComponent, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import { useAuthStore } from "@/stores/auth";

// interface AdminProfile {
//   username: string;
//   email: string;
//   id: number | null;
//   firstName: string;
//   lastName: string;
//   profile?: string;
//   last_login: string;
//   permissions: Array<Permission>;
// }
// interface Permission {
//   id: number;
//   admin_id: number;
//   permission: string;
//   status: string;
// }
export default defineComponent({
  name: "edit-admin-modal",
  props: {
    ProfileData: {
      type: Object as () => {
        username: string;
        email: string;
        id: number;
        firstName: string;
        lastName: string;
        profile?: string;
        last_login: string;
        permissions: {
          id: number;
          admin_id: number;
          permission: string;
          status: string;
        }[];
      },
    },
  },
  components: { ErrorMessage, Field, VForm },
  setup(props) {
    const { API_URL } = __CONSTANTS__;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);

    const AuthStore = useAuthStore();
    const { user, refreshProfile } = AuthStore;

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

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().label("Email"),
      username: Yup.string().required().label("UserName"),
      phone_number: Yup.string().required().label("phone_number"),
      permissions: Yup.string().required().label("Permissions"),
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
      formData.append("username", editAdminData.value.username!);
      formData.append("phone_number", editAdminData.value.phone_number!);
      // formData.append("gender", editAdminData.value.gender!);
      // formData.append("phone_number", `${editAdminData.value.phone_number}`);
      formData.append("email", editAdminData.value.email!);
      // formData.append("state", editAdminData.value.state!);

      await axios
        .post(API_URL + `admin/${editAdminData.value.id}`, formData, {
          method: "put",
        })
        .then((res) => console.log(res))
        .catch((error) => {
          return Swal.fire({
            text: error.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        });
    };

    const editAdminData = computed(() => {
      if (props.ProfileData && props.ProfileData.id) {
        console.log(props.ProfileData);
        return {
          firstName: props.ProfileData.firstName || "",
          lastName: props.ProfileData.lastName || "",
          email: props.ProfileData.email || "",
          username: props.ProfileData.username || "",
          profile: props.ProfileData.profile || "",
          last_login: props.ProfileData.last_login || "",
          phone_number: props.ProfileData.last_login || "",
          id: props.ProfileData.id || "",
          permissions: [] || "",
        };
      }
      return {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        profile: "",
        last_login: "",
        phone_number: undefined,
        id: undefined,
        permissions: [],
      };
    });

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
    };
  },
});
</script>
