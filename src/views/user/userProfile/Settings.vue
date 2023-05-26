<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        @submit="saveChanges1()"
        :validation-schema="userDataValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Avatar</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                :style="{
                  backgroundImage: `url(${getAssetPath(
                    '/media/avatars/blank.png'
                  )})`,
                }"
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-125px h-125px"
                  :style="`background-image: url(${State.userData.avatar})`"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeImage()"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Full Name</label
            >
            <!--end::Label-->
            <!-- form -->
            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="fname"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name"
                    v-model="State.userData.first_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="fname" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="lname"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Last name"
                    v-model="State.userData.last_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lname" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Contact Phone</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="No Phone Number"
                v-model="State.userData.phone"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--end::Input group-->

          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Account</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Email Address-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">Email Address</div>
            <div class="fs-6 fw-semobold text-gray-600">
              support@keenthemes.com
            </div>
          </div>

          <div
            id="kt_signin_email_edit"
            :class="{ 'd-none': !emailFormDisplay }"
            class="flex-row-fluid"
          >
            <!--begin::Form-->
            <VForm
              id="kt_signin_change_email"
              class="form"
              novalidate
              @submit="updateEmail()"
              :validation-schema="changeEmail"
            >
              <div class="row mb-6">
                <div class="col-lg-6 mb-4 mb-lg-0">
                  <div class="fv-row mb-0">
                    <label
                      for="emailaddress"
                      class="form-label fs-6 fw-bold mb-3"
                      >Enter New Email Address</label
                    >
                    <Field
                      type="email"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      id="emailaddress"
                      placeholder="Email Address"
                      name="emailaddress"
                      v-model="State.userData.email"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="emailaddress" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmemailpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirm Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmemailpassword"
                      id="confirmemailpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmemailpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_signin_submit"
                  type="submit"
                  ref="updateEmailButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Update Email </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_signin_cancel"
                  type="button"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                  @click="emailFormDisplay = !emailFormDisplay"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_email_button"
            :class="{ 'd-none': emailFormDisplay }"
            class="ms-auto"
          >
            <button
              class="btn btn-light fw-bolder px-6"
              @click="emailFormDisplay = !emailFormDisplay"
            >
              Change Email
            </button>
          </div>
        </div>
        <!--end::Email Address-->

        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <div class="fs-4 fw-bolder mb-1">Password</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordFormDisplay }"
          >
            <div class="fs-6 fw-semobold text-gray-600 mb-4">
              Password must be at least 8 character and contain symbols
            </div>

            <!--begin::Form-->
            <VForm
              id="kt_signin_change_password"
              class="form"
              novalidate
              @submit="updatePassword()"
              :validation-schema="changePassword"
            >
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="currentpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Current Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="currentpassword"
                      id="currentpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="currentpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="newpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="newpassword"
                      id="newpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="newpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirm New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmpassword"
                      id="confirmpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Update Password </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <button
              @click="passwordFormDisplay = !passwordFormDisplay"
              class="btn btn-light fw-bolder"
            >
              Reset Password
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Sign-in Method-->

  <!--begin::Connected Accounts-->

  <!--end::Deactivate Account-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

import type { User } from "@/stores/auth";
// interface UserData {
//   id?: Number;
//   avatar?: string;
//   first_name?: string;
//   last_name?: string;
//   phone?: Number;
//   bio?: Number;
//   address?: string;
//   gender?: string;
//   state?: string;
//   institure?: string;
//   edu_role?: string;
//   faculty?: string;
//   dept?: string;
//   lawclinic?: string;
//   affiliate?: string;
//   created_at?: string;
//   email?: string;
//   email_verified_at?: boolean;
// }

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const AuthStore = useAuthStore();
    const { user } = AuthStore;

    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const userDataValidator = Yup.object().shape({
      fname: Yup.string().required().label("First name"),
      lname: Yup.string().required().label("Last name"),
      phone: Yup.string().label("Contact phone").nullable(),
    });

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("Email"),
      confirmemailpassword: Yup.string().required().label("Password"),
    });

    const changePassword = Yup.object().shape({
      currentpassword: Yup.string().required().label("Current password"),
      newpassword: Yup.string().min(4).required().label("Password"),
      confirmpassword: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const updateProfile = async () => {
      if (!user) return;
      await axios
        .post(
          `http://localhost/druppa-api/index.php/users/editProfile/${user.id}`,
          {
            ...State.userData,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response.data.error == "Invalid User") {
            Swal.fire({
              text: "Invalid Email or Password",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Try again!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          }
        });
    };
    const State = reactive({
      userDataSet: false,
      userData: {
        avatar: getAssetPath("media/avatars/300-1.jpg"),
        first_name: "Max",
        last_name: "Max",
        phone: 44327,
        email: "mail",
      } as User,
      setUserData(res: User) {
        this.userData = { ...res };
      },
    });

    onMounted(() => {
      State.userDataSet = true;
      if (user) {
        State.setUserData(user);
      }
    });

    const saveChanges1 = async () => {
      try {
        await updateProfile();
        // submitButton1.value.setAttribute("data-kt-indicator", "on");
      } catch (error) {
        console.log(error);
      }
      submitButton1.value?.removeAttribute("data-kt-indicator");
    };

    const updateEmail = () => {
      if (updateEmailButton.value) {
        // Activate indicator
        updateEmailButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updateEmailButton.value?.removeAttribute("data-kt-indicator");

          emailFormDisplay.value = false;
        }, 2000);
      }
    };

    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updatePasswordButton.value?.removeAttribute("data-kt-indicator");

          Swal.fire({
            text: "Password is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            passwordFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const removeImage = () => {
      State.userData.avatar = "/media/avatars/blank.png";
    };

    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges1,

      State,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      userDataValidator,
      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updateEmail,
      updatePassword,
      getAssetPath,
    };
  },
});
</script>
