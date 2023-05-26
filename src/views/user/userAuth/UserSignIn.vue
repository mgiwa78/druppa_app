<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
      :initial-values="{ email: 'mgiwa@gmail.com', password: 'Password' }"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-gray-400 mb-3">Welcome To Druppa</h1>
        <h1 class="text-dark mb-3">Sign In</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          New Here?

          <router-link to="/sign-up" class="link-primary fw-bold">
            Create an Account
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">Email</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>
          <!--end::Label-->

          <!--begin::Link-->
          <router-link to="/password-reset" class="link-primary fs-6 fw-bold">
            Forgot Password ?
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> Continue </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

        <!--begin::Separator-->
        <div class="text-center text-muted text-uppercase fw-bold mb-5">or</div>
        <!--end::Separator-->

        <!--begin::Google link-->
        <a
          href="#"
          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        >
          <img
            alt="Logo"
            :src="getAssetPath('media/svg/brand-logos/google-icon.svg')"
            class="h-20px me-3"
          />
          Continue with Google
        </a>
        <!--end::Google link-->

        <!--begin::Google link-->

        <!--end::Google link-->

        <!--begin::Google link-->

        <!--end::Google link-->
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import useUserStore from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "user-sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  watch: {},
  setup() {
    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const userStore = useUserStore();
    const authStore = useAuthStore();

    const { saveLogin } = userStore;
    const { setAuth } = authStore;
    const { isAuthenticated } = storeToRefs(authStore);

    const { loggedIn } = storeToRefs(userStore);
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    const logUserIn = async (values) => {
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }
      await axios
        .post("http://localhost/druppa-api/index.php/login", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response);
          setAuth(response.data.userCredentials, response.data.jwt);
          router.push({ name: "dashboard" });
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
            }).then(() => {
              submitButton.value?.removeAttribute("data-kt-indicator");
              submitButton.value!.disabled = false;
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
              submitButton.value?.removeAttribute("data-kt-indicator");
              submitButton.value!.disabled = false;
            });
          }
        });
    };
    onMounted(() => {
      if (isAuthenticated.value) {
        return router.push({ name: "dashboard" });
      }
    });
    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    // watch(loggedIn, (newLoggedIn) => {
    //   console.log("newLoggedIn");
    //   if (newLoggedIn) {
    //     return router.push({ name: "dashboard" });
    //   }
    // });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      try {
        await logUserIn(values);
      } catch (err) {
        return;
      } // Send login request
      // await store.login(values);

      //Deactivate indicator
    };

    return {
      onSubmitLogin,
      login,
      loggedIn,
      submitButton,
      getAssetPath,
    };
  },
});
</script>
