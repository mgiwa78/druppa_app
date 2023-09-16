<template>
  <div
    class="modal fade"
    id="kt_modal_edit_customer"
    ref="editCustomerModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_customer_header">
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
              data-kt-scroll-dependencies="#kt_modal_edit_customer_header"
              data-kt-scroll-wrappers="#kt_modal_edit_customer_scroll"
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
                    v-model="editCustomerData.lastName"
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
                    v-model="editCustomerData.firstName"
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
                    v-model="editCustomerData.title"
                  >
                    <option value="">Select a Title...</option>
                    <option
                      :selected="
                        editCustomerData.title === 'Mr' ||
                        editCustomerData.title === 'Mr.'
                      "
                      :value="'Mr.' || 'Mr'"
                    >
                      Mr
                    </option>
                    <option
                      :selected="
                        editCustomerData.title === 'Mrs' ||
                        editCustomerData.title === 'Mrs.'
                      "
                      :value="'Mrs.' || 'Mrs'"
                    >
                      Mrs
                    </option>
                    <option
                      :selected="
                        editCustomerData.title === 'Prof.' ||
                        editCustomerData.title === 'Prof.'
                      "
                      :value="'Prof.' || 'Prof'"
                    >
                      Prof
                    </option>
                    <option
                      :selected="
                        editCustomerData.title === 'Miss' ||
                        editCustomerData.title === 'Miss.'
                      "
                      :value="'Miss.' || 'Miss'"
                    >
                      Miss
                    </option>
                    <option
                      :selected="
                        editCustomerData.title === 'Ms.' ||
                        editCustomerData.title === 'Ms.'
                      "
                      :value="'Ms.' || 'Ms'"
                    >
                      Ms
                    </option>
                    <option
                      :selected="
                        editCustomerData.title === 'Dr' ||
                        editCustomerData.title === 'Dr.'
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
                    v-model="editCustomerData.gender"
                  >
                    <option value="">Select a Gender...</option>
                    <option
                      :selected="editCustomerData.gender === 'male'"
                      value="male"
                    >
                      Male
                    </option>
                    <option
                      :selected="editCustomerData.gender === 'female'"
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
                    v-model="editCustomerData.email"
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
                    v-model="editCustomerData.password"
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
                    v-model="editCustomerData.phone_number"
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
                    v-model="editCustomerData.state"
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
                    v-model="editCustomerData.city"
                    ><option v-if="editCustomerData.state" selected value="">
                      Select a State
                    </option>
                    <template v-if="editCustomerData.state">
                      <template v-if="citiesInNigeria[editCustomerData.state]">
                        <option
                          v-for="city in citiesInNigeria[
                            editCustomerData.state
                          ]"
                          :key="city.code"
                          :value="city.city"
                        >
                          {{ city.city }}
                        </option>
                      </template>
                      <option v-else :value="editCustomerData.state">
                        {{ editCustomerData.state }}
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
                <!--end::Input-->
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center">
            <button
              type="reset"
              id="kt_modal_edit_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>

            <button
              ref="editSubmitButtonRef"
              type="submit"
              id="kt_edit_customer_submit"
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
    ProfileData: {
      type: Object as PropType<AllTypes.CustomerType>,
    },
  },
  components: { ErrorMessage, Field, VForm },
  setup(props) {
    const { API_URL } = __CONSTANTS__;

    const editSubmitButtonRef = ref<null | HTMLButtonElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const editCustomerModalRef = ref<null | HTMLElement>(null);

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

      EditformData.append("firstName", editCustomerData.value.lastName);
      EditformData.append("lastName", editCustomerData.value.firstName);
      EditformData.append("phone_number", editCustomerData.value.phone_number);
      EditformData.append("city", editCustomerData.value.city);
      EditformData.append("address", editCustomerData.value.address);

      EditformData.append("state", editCustomerData.value.state);
      EditformData.append("gender", editCustomerData.value.gender);
      EditformData.append("title", editCustomerData.value.title);
      EditformData.append("email", editCustomerData.value.email);
      EditformData.append("_method", "put");

      await axios
        .post(
          API_URL + `customers/${editCustomerData.value.id}`,
          EditformData,
          { method: "put", headers: { Authorization: `Bearer ${token}` } }
        )
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
            hideModal(editCustomerModalRef.value);
          });
        })
        .catch((error) => {
          ErrorHandler(error);
          hideModal(editCustomerModalRef.value);
          editSubmitButtonRef.value?.removeAttribute("data-kt-indicator");
          editSubmitButtonRef.value!.disabled = false;
        })
        .finally(() => {
          hideModal(editCustomerModalRef.value);
          editSubmitButtonRef.value?.removeAttribute("data-kt-indicator");
          editSubmitButtonRef.value!.disabled = false;
        });
    };

    const editCustomerData = computed(() => {
      if (props.ProfileData && props.ProfileData.id) {
        console.log(props.ProfileData);
        return {
          firstName: props.ProfileData.firstName || "",
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
        ...defaultTypes.CustomerEmpty,
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
      editCustomerData,
      validationSchema,
      submit,
      editSubmitButtonRef,
      modalRef,
      editCustomerModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
    };
  },
});
</script>
