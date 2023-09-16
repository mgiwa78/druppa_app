<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div v-if="State.userData" id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm id="kt_account_profile_details_form" class="form" novalidate @submit="saveChanges1()"
        :validation-schema="userDataValidator">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->

            <div class="col-lg-8 fv-row">
              <label class="col-lg-6 col-form-label required fw-semobold fs-6">Avatar</label>
              <!--end::Label-->

              <!--begin::Col-->
              <!--begin::Image input-->
              <div class="image-input image-input-outline" data-kt-image-input="true">
                <!--begin::Preview existing avatar-->
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <div class="image-input image-input-outline">
                  <!--begin::Inputs-->
                  <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                    data-kt-image-input-action="remove" data-bs-toggle="tooltip" @click="removeImage()"
                    title="Remove avatar">
                    <i class="bi bi-x fs-2"></i>
                  </span>

                  <input type="file" @change="State.onChangeFileUpload" name="avatar" accept=".png, .jpg, .jpeg" />
                </div>
                <!--begin::Remove-->

                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
              <!--end::Col-->
            </div>
            <div class="col-lg-4 fv-row" v-if="State.userData.type !== 'Vendor'">
              <label class="col-lg-3 col-form-label fw-semobold fs-6">Title</label>
              <Field name="title" class="form-select form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                as="select" :disabled="State.userData.allowEdit === 0 ? true : false" v-model="State.userData.title">
                <option value="">Select a Title...</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
              </Field>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6"
            v-if="State.userData.type === 'Driver' || State.userData.type === 'Admin' || State.userData.type === 'Customer'">

            <label class="col-lg-4 col-form-label required fw-semobold fs-6">Full Name</label>
            <!--end::Label-->
            <!-- form -->
            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <!--begin::Col-->
              <div class="row">
                <div class="col-lg-6 fv-row">
                  <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="fname"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="First name"
                    v-model="State.userData.firstName" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="fname" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 fv-row">
                  <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="lname"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Last name"
                    v-model="State.userData.lastName" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lname" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Col-->

              <!--begin::Col-->

              <!--end::Col-->
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-6" v-if="State.userData.type === 'Vendor'">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">Vendor Name</label>
            <!--end::Label-->
            <!-- form -->
            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <!--begin::Col-->
              <div class="row">
                <div class="col-lg-12 fv-row">
                  <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="vendorName"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Vendor Name"
                    v-model="State.userData.vendorName" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="vendorName" />
                    </div>
                  </div>
                </div>

              </div>
              <!--end::Col-->

              <!--begin::Col-->

              <!--end::Col-->
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

              <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                title="Phone number must be active"></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="tel" :disabled="State.userData.allowEdit === 0 ? true : false" name="phone"
                class="form-control form-control-lg form-control-solid" placeholder="No Phone Number"
                v-model="State.userData.phone_number" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Address</span>

              <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Address must be valid"></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="address"
                class="form-control form-control-lg form-control-solid" placeholder="Set Your delivery address"
                v-model="State.userData.address" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="type" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">State</span>

              <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="State must be valid"></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="city"
                class="form-control form-control-lg form-control-solid" placeholder="Set Your delivery city"
                v-model="State.userData.city" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="city" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
        </div>

        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button @click.prevent="resetFields()" class="btn btn-light btn-active-light-primary me-2">
            Discard
          </button>

          <button type="submit" id="kt_account_profile_details_submit" ref="submitButton1" class="btn btn-primary">
            <span class="indicator-label"> Update </span>

            <span class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <div v-if="State.userData.type === 'Driver'" class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Driver Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div v-if="State.userData" id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm id="kt_account_driver_details_form" class="form" novalidate @submit="saveChanges6()"
        :validation-schema="userDriverValidator">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->

          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">License Number</label>
            <!--end::Label-->
            <!-- form -->
            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <!--begin::Col-->
              <div class="col-lg-6 fv-row">
                <Field type="text" name="licenseNumber"
                  class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                  :disabled="State.userData.allowEdit === 0 ? true : false" placeholder="License Number"
                  v-model="State.userData.licenseNumber" />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="licenseNumber" />
                  </div>
                </div>
              </div>

              <!--end::Col-->

              <!--begin::Col-->

              <!--end::Col-->
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">License Expiration</label>
            <!--end::Label-->
            <!-- form -->
            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <!--begin::Col-->
              <div class="col-lg-6 fv-row">
                <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="licenseExpiration"
                  class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="License Expiration"
                  v-model="State.userData.licenseExpiration" />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="licenseExpiration" />
                  </div>
                </div>
              </div>

              <!--end::Col-->

              <!--begin::Col-->

              <!--end::Col-->
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Vehicle Make</span>

              <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                title="Must be a valid vehicle make"></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field :disabled="State.userData.allowEdit === 0 ? true : false" type="text" name="vehicleMake"
                class="form-control form-control-lg form-control-solid" placeholder="Vehicle Make"
                v-model="State.userData.vehicleMake" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="vehicleMake" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Vehicle Model</span>

              <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                title="Must be the correct vehicle model"></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="vehicleModel"
                class="form-control form-control-lg form-control-solid" placeholder="Vehicle Model"
                v-model="State.userData.vehicleModel" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="type" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">License Plate</span>

              <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                title="Your correct and registered vehicle number"></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="licensePlate"
                class="form-control form-control-lg form-control-solid" placeholder="License Plate"
                v-model="State.userData.licensePlate" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="licensePlate" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Insurance</span>

              <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Your insurance ID"></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="text" :disabled="State.userData.allowEdit === 0 ? true : false" name="insurance"
                class="form-control form-control-lg form-control-solid" placeholder="Insurance"
                v-model="State.userData.insurance" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="insurance" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
        </div>

        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button type="reset" class="btn btn-light btn-active-light-primary me-2">
            Discard
          </button>

          <button type="submit" id="kt_account_driver_details_submit" ref="submitButton6" class="btn btn-primary">
            <span class="indicator-label"> Update </span>

            <span class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
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
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method">
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
              {{ State.userData.email }}
            </div>
          </div>

          <div id="kt_signin_email_edit" :class="{ 'd-none': !emailFormDisplay }" class="flex-row-fluid">
            <!--begin::Form-->
            <VForm id="kt_signin_change_email" class="form" novalidate @submit="updateEmail()"
              :validation-schema="changeEmail">
              <div class="row mb-6">
                <div class="col-lg-6 mb-4 mb-lg-0">
                  <div class="fv-row mb-0">
                    <label for="emailaddress" class="form-label fs-6 fw-bold mb-3">Enter New Email Address</label>
                    <Field type="email" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      id="emailaddress" :disabled="State.userData.allowEdit === 0 ? true : false"
                      placeholder="Email Address" name="emailaddress" v-model="State.userData.email" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="emailaddress" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label for="confirmemailpassword" class="form-label fs-6 fw-bold mb-3">Confirm Password</label>
                    <Field type="password" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmemailpassword" :disabled="State.userData.allowEdit === 0 ? true : false"
                      id="confirmemailpassword" aria-autocomplete="false" v-model="State.userData.confirmPassword" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmemailpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button id="kt_signin_submit" type="submit" ref="updateEmailButton" class="btn btn-primary me-2 px-6">
                  <span class="indicator-label"> Update Email </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
                <button id="kt_signin_cancel" type="button" class="btn btn-color-gray-400 btn-active-light-primary px-6"
                  @click="emailFormDisplay = !emailFormDisplay">
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div id="kt_signin_email_button" :class="{ 'd-none': emailFormDisplay }" class="ms-auto">
            <button class="btn btn-light fw-bolder px-6" @click="emailFormDisplay = !emailFormDisplay">
              Change Email
            </button>
          </div>
        </div>
        <!--end::Email Address-->

        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_password" :class="{ 'd-none': passwordFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">Password</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div id="kt_signin_password_edit" class="flex-row-fluid" :class="{ 'd-none': !passwordFormDisplay }">
            <div class="fs-6 fw-semobold text-gray-600 mb-4">
              Password must be at least 8 character and contain symbols
            </div>

            <!--begin::Form-->
            <VForm id="kt_signin_change_password" class="form" novalidate @submit="updatePassword()"
              :validation-schema="changePassword">
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label for="currentpassword" class="form-label fs-6 fw-bold mb-3">Current Password</label>
                    <Field type="password" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="currentpassword" :disabled="State.userData.allowEdit === 0 ? true : false"
                      id="currentpassword" v-model="State.userData.oldPassword" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="currentpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label for="newpassword" class="form-label fs-6 fw-bold mb-3">New Password</label>
                    <Field type="password" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="newpassword" v-model="State.userData.newPassword"
                      :disabled="State.userData.allowEdit === 0 ? true : false" id="newpassword" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="newpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label for="confirmpassword" class="form-label fs-6 fw-bold mb-3">Confirm New Password</label>
                    <Field type="password" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmpassword" :disabled="State.userData.allowEdit === 0 ? true : false"
                      id="confirmpassword" v-model="State.userData.ConfirmNewPassword" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button id="kt_password_submit" type="submit" ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6">
                  <span class="indicator-label"> Update Password </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
                <button id="kt_password_cancel" type="button" @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6">
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div id="kt_signin_password_button" class="ms-auto" :class="{ 'd-none': passwordFormDisplay }">
            <button @click="passwordFormDisplay = !passwordFormDisplay" class="btn btn-light fw-bolder">
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
import __CONSTANTS__ from "@/constants";
import type { User } from "@/stores/auth";

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;
    const { API_URL } = __CONSTANTS__;

    const submitButton1 = ref<HTMLButtonElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton6 = ref<HTMLButtonElement | null>(null);

    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const userDataValidator = Yup.object().shape({

      ...(user.type !== "Vendor" && {
        fname: Yup.string().required().label("First name"),
        lname: Yup.string().required().label("Last name"),
      }),
      ...(user.type === "Vendor" && {
        vendorName: Yup.string().required().label("Vendor Name"),
      }),
      phone: Yup.string().label("Contact phone").nullable(),
      city: Yup.string().label("City").nullable(),
      address: Yup.string().label("Address").nullable(),
    });

    const userDriverValidator = Yup.object().shape({
      licenseNumber: Yup.string().required().label("License Number"),
      licenseExpiration: Yup.string().required().label("License Expiration"),
      vehicleMake: Yup.string().label("Vehicle Make"),
      vehicleModel: Yup.string().label("Vehicle Model"),
      licensePlate: Yup.string().label("License Plate"),
      insurance: Yup.string().label("Insurance"),
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
      const formData = new FormData();
      formData.append("id", `${State.userData.id}`);

      if (State.userData.type !== "Vendor") {
        formData.append("firstName", State.userData.firstName!);
        formData.append("lastName", State.userData.lastName!);

      }

      if (State.userData.type === "Vendor") {
        formData.append("vendorName", State.userData.vendorName);
      }
      formData.append("phone_number", `${State.userData.phone_number}`);
      formData.append("state", State.userData.city!);
      formData.append("address", State.userData.address!);
      formData.append("email", State.userData.email!);
      formData.append("city", State.userData.city!);
      formData.append("title", State.userData.title!);
      formData.append("type", State.userData.type!);

      if (State.userData.type === "Driver") {
        formData.append("licenseNumber", State.userData?.licenseNumber);
        formData.append("licenseExpiration", State.userData.licenseExpiration);
        formData.append("vehicleMake", State.userData.vehicleMake);
        formData.append("vehicleModel", State.userData.vehicleModel);
        formData.append("licensePlate", State.userData.licensePlate);
        formData.append("insurance", State.userData.insurance);
      }

      if (State.newProfile) {
        formData.append("profile", State.newProfile[0]);
      }

      await axios
        .post(API_URL + "profile", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "Profile Updated successfully!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          });
        })
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
    const State = reactive({
      userDataSet: false,
      newProfile: null as FileList | null,
      userData: {
        confirmPassword: "",
        ConfirmNewPassword: "",
        newPassword: "",
        id: 0,
        profile: "",
        username: "",
        password: "",
        lastName: "",
        firstName: "",
        type: "",
        phone_number: "",
        address: "",
        gender: "",
        state: "",
        created_at: "",
        email: "",
        allowEdit: true,
        email_verified_at: false,

        licenseNumber: "",
        licenseExpiration: "",
        vehicleMake: "",
        vehicleModel: "",
        licensePlate: "",
        insurance: "",
      } as any,
      setUserData(res: User) {
        this.userData = { ...res };
      },
      onChangeFileUpload({
        target: { files },
      }: {
        target: { files: FileList };
      }) {
        this.newProfile = files;
      },
    });

    onMounted(() => {
      State.userDataSet = true;
      if (user) {
        State.setUserData(user);
      }
    });

    const saveChanges1 = async () => {
      if (submitButton1.value) {
        // eslint-disable-next-line
        submitButton1.value!.disabled = true;
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");
      }
      if (State.userData.allowEdit === 0) {
        return Swal.fire({
          text: "Profile modification not allowed",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }
      try {
        await updateProfile();

        await refreshProfile().then(() => {
          submitButton1.value?.removeAttribute("data-kt-indicator");
          submitButton1.value!.disabled = false;
        });
      } catch (error) {
        console.log(error);
      }
      submitButton1.value?.removeAttribute("data-kt-indicator");
    };

    const resetFields = () => {
      State.userData = {
        ...user,
        confirmPassword: "",
        ConfirmNewPassword: "",
        newPassword: "",
      };
    };
    const saveChanges6 = async () => {
      if (submitButton6.value) {
        // eslint-disable-next-line
        submitButton6.value!.disabled = true;
        // Activate indicator
        submitButton6.value.setAttribute("data-kt-indicator", "on");
      }
      if (State.userData.allowEdit === 0) {
        return Swal.fire({
          text: "Profile modification not allowed",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }
      try {
        await updateProfile();

        await refreshProfile().then(() => {
          submitButton6.value?.removeAttribute("data-kt-indicator");
          submitButton6.value!.disabled = false;
        });
      } catch (error) {
        console.log(error);
      }
      submitButton6.value?.removeAttribute("data-kt-indicator");
    };

    const updateEmail = async () => {
      if (State.userData.allowEdit === 0) {
        return Swal.fire({
          text: "Profile modification not allowed",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }
      const formData = new FormData();
      formData.append("email", State.userData.email);
      formData.append("password", State.userData.confirmPassword);

      await axios
        .post(API_URL + "profile/emailUpdate", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "Email Updated successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => refreshProfile());
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message) {
            return Swal.fire({
              text: error.response.data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Try again!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          } else {
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
          }
        });
      if (updateEmailButton.value) {
        // updateEmailButton.value.setAttribute("data-kt-indicator", "on");
        updateEmailButton.value?.removeAttribute("data-kt-indicator");

        emailFormDisplay.value = false;
      }
    };

    const updatePassword = async () => {
      if (State.userData.allowEdit === 0) {
        return Swal.fire({
          text: "Profile modification not allowed",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");
      }
      const formData = new FormData();
      formData.append("email", State.userData.email);
      formData.append("password", State.userData.oldPassword);
      formData.append("newPassword", State.userData.newPassword);

      await axios
        .post(API_URL + "profile/passwordUpdate", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "Password Updated successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => refreshProfile());
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message) {
            return Swal.fire({
              text: error.response.data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Try again!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          } else {
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
          }
        })
        .finally(() => {
          if (updatePasswordButton.value) {
            // updatePassword.value.setAttribute("data-kt-indicator", "on");
            updatePasswordButton.value?.removeAttribute("data-kt-indicator");

            refreshProfile();
          }
        });
    };

    const removeImage = () => {
      if (State.userData) {
        State.userData.profile = "/media/avatars/blank.png";
      }
    };

    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges1,
      submitButton6,
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
      saveChanges6,
      userDriverValidator,
      resetFields,
    };
  },
});
</script>
