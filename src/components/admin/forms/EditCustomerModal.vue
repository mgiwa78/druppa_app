<template>
  <div
    class="modal fade"
    id="kt_modal_edit_admin"
    ref="editCustomerModalRef"
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
                    v-model="editCustomerData.firstName"
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
                    v-model="editCustomerData.lastName"
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
                    v-model="editCustomerData.username"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="username" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >Email</label
                  >

                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Email"
                    name="email"
                    v-model="editCustomerData.email"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-5 row">
                <!--begin::Label-->
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >Phone Number</label
                  >

                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="phone_number"
                    name="phone_number"
                    v-model="editCustomerData.phone_number"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="phone_number" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center">
            <button
              type="reset"
              id="kt_modal_create_api_key_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>

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
          </div>
        </VForm>
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
import { hideModal } from "@/core/helpers/dom";

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
        phone_number: string;
        profile?: string;
        last_login: string;
      },
    },
  },
  components: { ErrorMessage, Field, VForm },
  setup(props) {
    const { API_URL } = __CONSTANTS__;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const editCustomerModalRef = ref<null | HTMLElement>(null);

    const AuthStore = useAuthStore();
    const { user, refreshProfile } = AuthStore;

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
    //     editCustomerData.value = props.ProfileData;
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
      formData.append("id", `${editCustomerData.value.id}`);

      formData.append("firstName", editCustomerData.value.lastName!);
      formData.append("lastName", editCustomerData.value.firstName!);
      formData.append("username", editCustomerData.value.username!);
      formData.append("phone_number", editCustomerData.value.phone_number!);
      // formData.append("gender", editCustomerData.value.gender!);
      // formData.append("phone_number", `${editCustomerData.value.phone_number}`);
      formData.append("email", editCustomerData.value.email!);
      // formData.append("state", editCustomerData.value.state!);

      await axios
        .post(
          API_URL + `EditAdminProfile/${editCustomerData.value.id}`,
          formData
        )
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

    const editCustomerData = computed(() => {
      if (props.ProfileData && props.ProfileData.id) {
        console.log(props.ProfileData);
        return {
          firstName: props.ProfileData.firstName || "",
          lastName: props.ProfileData.lastName || "",
          email: props.ProfileData.email || "",
          username: props.ProfileData.username || "",
          profile: props.ProfileData.profile || "",
          last_login: props.ProfileData.last_login || "",
          phone_number: props.ProfileData.phone_number || "0",
          id: props.ProfileData.id || "",
        };
      }
      return {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        profile: "",
        last_login: "",
        phone_number: "0",
        id: 0,
      };
    });
    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }
      await updateProfile();
      hideModal(editCustomerModalRef.value);

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");
    };

    return {
      editCustomerData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      editCustomerModalRef,
      getAssetPath,
    };
  },
});
</script>
