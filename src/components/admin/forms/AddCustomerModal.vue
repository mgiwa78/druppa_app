<template>
  <div
    class="modal fade"
    id="kt_modal_add_customer"
    ref="addCustomerModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Create Customer</h2>

          <div
            id="kt_modal_add_customer_close"
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
          id="kt_modal_add_customer_form"
          class="form"
          @submit="submit"
          :validation-schema="validationSchema"
          v-slot="{ errors }"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
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
                    v-model="newCustomerData.lastName"
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
                    v-model="newCustomerData.firstName"
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
                    v-model="newCustomerData.title"
                  >
                    <option value="">Select a Title...</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
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
                    :class="errors.country ? 'is-invalid' : ''"
                    as="select"
                    v-model="newCustomerData.gender"
                  >
                    <option value="">Select a Gender...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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
                    v-model="newCustomerData.email"
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
                    v-model="newCustomerData.password"
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
                    v-model="newCustomerData.phone_number"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="phone_number" />
                    </div>
                  </div>
                </div>
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
                    v-model="newCustomerData.userName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="userName" />
                    </div>
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <div class="mb-5 row">
                <!--begin::Label-->
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
                    v-model="newCustomerData.state"
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
                    v-model="newCustomerData.city"
                    ><option v-if="newCustomerData.state" selected value="">
                      Select a State
                    </option>
                    <template v-if="newCustomerData.state">
                      <template v-if="citiesInNigeria[newCustomerData.state]">
                        <option
                          v-for="city in citiesInNigeria[newCustomerData.state]"
                          :key="city.code"
                          :value="city.city"
                        >
                          {{ city.city }}
                        </option>
                      </template>
                      <option v-else :value="newCustomerData.state">
                        {{ newCustomerData.state }}
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
              <div class="mb-5 row">
                <!--begin::Label-->

                <div class="col-12">
                  <label
                    class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2"
                    >Address</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <textarea
                    type="textarea"
                    class="form-control form-control-solid"
                    placeholder="Address"
                    name="address"
                    v-model="newCustomerData.address"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="address" />
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
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_add_customer_submit"
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
import statesInNigeria from "@/core/data/nigeriaStates";
import citiesInNigeria from "@/core/data/citiesInNigeria";
import { useAuthStore } from "@/stores/auth";

interface FormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone_number: string;
  state: string;
  address: string;
  city: string;
  password: string;
  gender: string;
  title: string;
}

export default defineComponent({
  name: "add-customer-modal",
  components: { ErrorMessage, Field, VForm },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const backdropRef = ref<null | HTMLDivElement>(null);
    const addCustomerModalRef = ref<null | HTMLElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);
    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const newCustomerData = ref<FormData>({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      state: "",
      userName: "",
      gender: "",
      city: "",
      password: "",
      title: "",
      phone_number: "",
    });

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().label("Email"),
      userName: Yup.string().required().label("UserName"),
      gender: Yup.string().required().label("gender"),
      phone_number: Yup.string().required().label("Phone Number"),
      city: Yup.string().required().label("City"),
      state: Yup.string().required().label("State"),
      title: Yup.string().required().label("Title"),
    });

    const CreateAdminProfile = async () => {
      if (submitButtonRef.value) {
        submitButtonRef.value!.disabled = true;
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const formData = new FormData();

      formData.append("firstName", newCustomerData.value.firstName);
      formData.append("lastName", newCustomerData.value.lastName);
      formData.append("email", newCustomerData.value.email);
      formData.append("username", newCustomerData.value.userName);
      formData.append("password", newCustomerData.value.password);
      formData.append("address", newCustomerData.value.address);
      formData.append("city", newCustomerData.value.city);
      formData.append("state", newCustomerData.value.state);
      formData.append("title", newCustomerData.value.title);
      formData.append("gender", newCustomerData.value.gender);
      formData.append("phone_number", newCustomerData.value.phone_number);

      await axios
        .post(API_URL + "customers", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          hideModal(addCustomerModalRef.value);
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
            });
          }
          if (error.response.data.message) {
            Swal.fire({
              text: `${error.response.data.message}`,
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
        .then(() => {
          submitButtonRef.value?.removeAttribute("data-kt-indicator");
          submitButtonRef.value!.disabled = false;
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
      newCustomerData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      addCustomerModalRef,
    };
  },
});
</script>
