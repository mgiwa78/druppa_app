<template>
  <div class="w-lg-500px p-10">
    <VForm class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" novalidate @submit="onSubmitRegister"
      id="kt_login_signup_form" :validation-schema="registration">
      <div class="mb-10 text-center">
        <h1 class="text-dark mb-3">Create an Account</h1>

        <div class="text-gray-400 fw-semobold fs-4">
          Already have an account?

          <router-link to="/sign-in" class="link-primary fw-bold">
            Sign in here
          </router-link>
        </div>
      </div>


      <div class="row fv-row mb-7">
        <div class="col-xl-12">
          <label class="form-label fw-bold text-dark fs-6">First Name</label>
          <Field class="form-control form-control-lg form-control-solid" type="text" v-model="newCustomerData.firstName"
            placeholder="" name="firstName" autocomplete="off" />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="firstName" />
            </div>
          </div>
        </div>

        <div class="col-xl-12">
          <label class="form-label fw-bold text-dark fs-6">Last Name</label>
          <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
            v-model="newCustomerData.lastName" name="lastName" autocomplete="off" />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="lastName" />
            </div>
          </div>
        </div>
        <div class="mb-5 mt-2 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Title</label>

            <Field v-model="newCustomerData.title" name="title"
              class="form-select form-control form-control-lg form-control-solid" as="select">
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
            <label class="fw-bold required fs-5 fw-semobold mb-2">Gender</label>

            <Field v-model="newCustomerData.gender" name="gender"
              class="form-select form-control form-control-lg form-control-solid" as="select">
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
        </div>
        <div class="col-xl-12">
          <label class="fw-bold required fs-5 fw-semobold mb-2">Address</label>
          <Field v-slot="{ field }" v-model="newCustomerData.address" name="address" rules="required">
            <textarea type="text" v-bind="field" class="form-control form-control-solid" placeholder="Address"
              name="address" required v-model="newCustomerData.address" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="address" />
              </div>
            </div>
          </Field>
        </div>
        <div class="col-xl-12">
          <label class="fw-bold required fs-5 fw-semobold mb-2">State</label>

          <Field v-model="newCustomerData.state" name="state"
            class="form-select form-control form-control-lg form-control-solid" as="select">
            <option value="">Select a State...</option>
            <option v-for="state in statesInNigeria" :key="state.code" :value="state.name">
              {{ state.name }}
            </option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="state" />
            </div>
          </div>
        </div>
        <div class="col-xl-12">
          <label class="form-label fw-bold text-dark fs-6">City</label>

          <Field v-model="newCustomerData.city" name="city"
            class="form-select form-control form-control-lg form-control-solid" as="select">
            <option v-if="newCustomerData.state" selected value="">
              Select a State
            </option>
            <template v-if="newCustomerData.state">
              <template v-if="citiesInNigeria[newCustomerData.state]">
                <option v-for="city in citiesInNigeria[newCustomerData.state]" :key="city.code" :value="city.city">
                  {{ city.city }}
                </option>
              </template>
              <option v-else :value="newCustomerData.state">
                {{ newCustomerData.state }}
              </option>
            </template>
            <option v-else selected value="">Select a State First</option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="city" />
            </div>
          </div>
        </div>


      </div>

      <div class="fv-row mb-7">
        <label class="form-label fw-bold text-dark fs-6">Email</label>
        <Field class="form-control form-control-lg form-control-solid" type="email" placeholder="" name="email"
          v-model="newCustomerData.email" autocomplete="off" />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-7">
        <label class="form-label fw-bold text-dark fs-6">Phone number</label>
        <Field class="form-control form-control-lg form-control-solid" type="phone_number" placeholder=""
          name="phone_number" v-model="newCustomerData.phone_number" autocomplete="off" />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="phone_number" />
          </div>
        </div>
      </div>

      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <div class="mb-1">
          <label class="form-label fw-bold text-dark fs-6"> Password </label>

          <div class="position-relative mb-3">
            <Field v-model="newCustomerData.password" class="form-control form-control-lg form-control-solid"
              type="password" placeholder="" name="password" autocomplete="off" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
        </div>
        <div class="text-muted">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>

      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-dark fs-6">Confirm Password</label>
        <Field class="form-control form-control-lg form-control-solid" type="password" placeholder=""
          name="password_confirmation" autocomplete="off" />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>

      <div class="fv-row mb-10">
        <label class="form-check form-check-custom form-check-solid">
          <Field class="form-check-input" type="checkbox" name="toc" value="1" />
          <span class="form-check-label fw-semobold text-gray-700 fs-6">
            I Agree &
            <a href="#" class="ms-1 link-primary">Terms and conditions</a>.
          </span>
        </label>
      </div>

      <div class="text-center">
        <button id="kt_sign_up_submit" ref="submitButton" type="submit" class="btn btn-lg btn-primary">
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import statesInNigeria from "@/core/data/nigeriaStates";
import citiesInNigeria from "@/core/data/citiesInNigeria";
import __CONSTANTS__ from "@/constants";
import ErrorHandler from "@/core/helpers/errorHandler";
import { useStaticsStore } from "@/stores/statics";

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
  name: "user-sign-up",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },

  setup() {
    const { API_URL } = __CONSTANTS__;
    const AuthStore = useAuthStore();
    const StaticsStore = useStaticsStore();

    const router = useRouter();
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

    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().email().label("Email"),
      gender: Yup.string().required().label("Gender"),
      phone_number: Yup.string()
        .min(11)
        .max(11)
        .required()
        .label("Phone number"),
      state: Yup.string().required().label("State"),
      city: Yup.string().required().label("City"),
      address: Yup.string().required().label("Address"),
      password: Yup.string().required().label("Password"),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const signUpUser = async () => {
      const formData = new FormData();

      formData.append("firstName", newCustomerData.value.firstName);
      formData.append("lastName", newCustomerData.value.lastName);
      formData.append("email", newCustomerData.value.email);
      formData.append("password", newCustomerData.value.password);
      formData.append("gender", newCustomerData.value.gender);
      formData.append("state", newCustomerData.value.state);
      formData.append("title", newCustomerData.value.title);
      formData.append("phone_number", newCustomerData.value.phone_number);
      formData.append("address", newCustomerData.value.address);
      formData.append("city", newCustomerData.value.city);
      formData.append("type", "Customer");

      axios
        .post(API_URL + "register", formData)
        .then((response) => {
          Swal.fire({
            text: "You Account has been created, Sign in Now!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-primary",
            },
          }).then(() => {
            router.push({ name: "sign-in" });
          });
          // router.push({ name: "dashboard" });
        })
        .catch((error) => {
          console.log(error);
          ErrorHandler(error);
        });
    };
    const onSubmitRegister = async () => {
      // Clear existing errors

      AuthStore.resetStore()
      StaticsStore.resetStore()
      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Send login request
      await signUpUser();
      // const error = Object.values(store.errors);

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      registration,
      onSubmitRegister,
      submitButton,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      newCustomerData,
    };
  },
});
</script>
