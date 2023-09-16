<template>
  <div
    class="modal fade"
    id="kt_modal_edit_driver"
    ref="editDriverModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_driver_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Edit Driver</h2>

          <div
            id="kt_modal_edit_driver_close"
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
          id="kt_modal_edit_driver_form"
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_edit_driver_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_edit_driver_header"
              data-kt-scroll-wrappers="#kt_modal_edit_driver_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->

              <div class="mb-5 row">
                <!--begin::Label-->

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
                    v-model="editDriverData.lastName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                </div>
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
                    v-model="editDriverData.firstName"
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
                    >Title</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    name="title"
                    class="form-select"
                    as="select"
                    v-model="editDriverData.title"
                  >
                    <option value="">Select a Title...</option>
                    <option
                      :selected="
                        editDriverData.title === 'Mr' ||
                        editDriverData.title === 'Mr.'
                      "
                      :value="'Mr.' || 'Mr'"
                    >
                      Mr
                    </option>
                    <option
                      :selected="
                        editDriverData.title === 'Mrs' ||
                        editDriverData.title === 'Mrs.'
                      "
                      :value="'Mrs.' || 'Mrs'"
                    >
                      Mrs
                    </option>
                    <option
                      :selected="
                        editDriverData.title === 'Prof.' ||
                        editDriverData.title === 'Prof.'
                      "
                      :value="'Prof.' || 'Prof'"
                    >
                      Prof
                    </option>
                    <option
                      :selected="
                        editDriverData.title === 'Miss' ||
                        editDriverData.title === 'Miss.'
                      "
                      :value="'Miss.' || 'Miss'"
                    >
                      Miss
                    </option>
                    <option
                      :selected="
                        editDriverData.title === 'Ms.' ||
                        editDriverData.title === 'Ms.'
                      "
                      :value="'Ms.' || 'Ms'"
                    >
                      Ms
                    </option>
                    <option
                      :selected="
                        editDriverData.title === 'Dr' ||
                        editDriverData.title === 'Dr.'
                      "
                      :value="'Dr.' || 'Dr'"
                    >
                      Dr
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="title" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >Gender</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    name="gender"
                    class="form-select"
                    as="select"
                    v-model="editDriverData.gender"
                  >
                    <option value="">Select a Gender...</option>
                    <option
                      :selected="editDriverData.gender === 'male'"
                      value="male"
                    >
                      Male
                    </option>
                    <option
                      :selected="editDriverData.gender === 'female'"
                      value="female"
                    >
                      Female
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="gender" />
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
                    v-model="editDriverData.email"
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
                    v-model="editDriverData.password"
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
                    >Phone Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Phone Number"
                    name="phone_number"
                    v-model="editDriverData.phone_number"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="phone_number" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2"
                    >State</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    name="state"
                    class="form-select"
                    as="select"
                    v-model="editDriverData.state"
                  >
                    <option value="">Select a State...</option>
                    <option
                      v-for="state in statesInNigeria"
                      :key="state.code"
                      :value="state.name"
                    >
                      {{ state.name }}
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="state" />
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
                    >City</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    name="city"
                    class="form-select"
                    as="select"
                    v-model="editDriverData.city"
                    ><option v-if="editDriverData.state" selected value="">
                      Select a State
                    </option>
                    <template v-if="editDriverData.state">
                      <template v-if="citiesInNigeria[editDriverData.state]">
                        <option
                          v-for="city in citiesInNigeria[editDriverData.state]"
                          :key="city.code"
                          :value="city.city"
                        >
                          {{ city.city }}
                        </option>
                      </template>
                      <option v-else :value="editDriverData.state">
                        {{ editDriverData.state }}
                      </option>
                    </template>
                    <option v-else selected value="">
                      Select a State First
                    </option>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="city" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label
                    class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                    >Allow Editing</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->

                  <label
                    class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
                  >
                    <!--begin::Input-->
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="editDriverData.allowEdit"
                      id="kt_modal_allowEdit"
                      name="allowEdit"
                    />
                    <!--end::Input-->

                    <!--begin::Label-->
                    <span
                      class="form-check-label fw-semobold text-muted"
                      for="kt_modal_connected_accounts_google"
                    ></span>
                    <!--end::Label-->
                  </label>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="city" />
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
              id="kt_modal_edit_driver_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>

            <button
              ref="editSubmitButtonRef"
              type="submit"
              id="kt_edit_driver_submit"
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

import ErrorHandler from "@/core/helpers/errorHandler";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

export default defineComponent({
  name: "edit-admin-modal",
  props: {
    ProfileData: {
      type: Object as PropType<AllTypes.DriverType>,
    },
  },
  components: { ErrorMessage, Field, VForm },
  setup(props) {
    const { API_URL } = __CONSTANTS__;

    const editSubmitButtonRef = ref<null | HTMLButtonElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const editDriverModalRef = ref<null | HTMLElement>(null);

    const AuthStore = useAuthStore();
    const { user, token } = AuthStore;

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().label("Email"),
      gender: Yup.string().required().label("gender"),
      password: Yup.string().label("password"),
      phone_number: Yup.string().required().label("phone_number"),
      state: Yup.string().required().label("state"),
      city: Yup.string().required().label("city"),
      title: Yup.string().required().label("title"),
    });

    const updateProfile = async () => {
      if (editSubmitButtonRef.value) {
        editSubmitButtonRef.value!.disabled = true;
        editSubmitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }
      if (!user) return;

      const EditformData = new FormData();

      EditformData.append("firstName", editDriverData.value.firstName);
      EditformData.append(
        "allowEdit",
        `${editDriverData.value.allowEdit ? 1 : 0}`
      );
      EditformData.append("lastName", editDriverData.value.lastName);
      EditformData.append("phone_number", editDriverData.value.phone_number);
      EditformData.append("city", editDriverData.value.city);
      EditformData.append("address", editDriverData.value.address);

      EditformData.append("state", editDriverData.value.state);
      EditformData.append("gender", editDriverData.value.gender);
      EditformData.append("title", editDriverData.value.title);
      EditformData.append("email", editDriverData.value.email);

      await axios
        .post(API_URL + `drivers/${editDriverData.value.id}`, EditformData, {
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
          }).then(() => hideModal(editDriverModalRef.value));
        })
        .catch((error) => {
          ErrorHandler(error);
        })
        .finally(() => {
          editSubmitButtonRef.value?.removeAttribute("data-kt-indicator");
          editSubmitButtonRef.value!.disabled = false;
          hideModal(editDriverModalRef.value);
        });
    };

    const editDriverData = computed(() => {
      if (props.ProfileData && props.ProfileData.id) {
        console.log(props.ProfileData);
        return {
          firstName: props.ProfileData.firstName || "",
          allowEdit: props.ProfileData.allowEdit === 1 ? true : false,
          lastName: props.ProfileData.lastName || "",
          email: props.ProfileData.email || "",
          profile: props.ProfileData.profile || "",
          phone_number: props.ProfileData.phone_number || "0",
          id: props.ProfileData.id || "",
          title: props.ProfileData.title || "",
          city: props.ProfileData.city || "",
          password: "",
          state: props.ProfileData.state || "",
          address: props.ProfileData.address || "",
          gender: props.ProfileData.gender || "",
        };
      }
      return {
        ...defaultTypes.DriverEmpty,
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
      editDriverData,
      validationSchema,
      submit,
      editSubmitButtonRef,
      modalRef,
      editDriverModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
    };
  },
});
</script>
