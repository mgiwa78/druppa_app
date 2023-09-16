<template>
  <!--begin::Navbar-->
  <div class="mx-5">
    <div class="card card-flush h-md-100">
      <!--begin::Body-->
      <div
        class="card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0"
        :style="`background-position: 100% 10%;
        background-image: url('${getAssetPath(
          '/media/illustrations/900x600/42.png'
        )}');`"
      >
        <!--begin::Wrapper-->
        <div class="mb-10">
          <!--begin::Title-->
          <div class="fs-2hx fw-bold text-gray-800 text-center mb-13">
            Verify DropOff
          </div>
          <!--end::Title-->

          <!--begin::Action-->
          <div class="text-center">
            <button
              @click.prevent="UpdateDropOff"
              ref="UpdateDropOffButtonRef"
              id="kt_add_customer_submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Verify? </span>
              <span class="indicator-progress">
                Verifying...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
          <!--begin::Action-->
        </div>
        <!--begin::Wrapper-->

        <!--begin::Illustration-->
        <img
          class="mx-auto h-350px h-lg-300px theme-light-show"
          :src="getAssetPath('media/illustrations/unitedpalms-1/7.png')"
          alt=""
        />
        <img
          class="mx-auto h-350px h-lg-300px theme-dark-show"
          :src="getAssetPath('media/illustrations/unitedpalms-1/7-dark.png')"
          alt=""
        />
        <!--end::Illustration-->
      </div>
      <!--end::Body-->
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";

import { defineComponent, onMounted, ref } from "vue";

import { useStaticsStore } from "@/stores/statics";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import ErrorHandler from "@/core/helpers/errorHandler";
import router from "@/router";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "driver-dashboard",
  components: {},
  setup() {
    const StaticsStore = useStaticsStore();
    const { UpdateDriverStats, driverStats } = StaticsStore;
    const AuthStore = useAuthStore();
    const route = useRoute();

    const { token, refreshProfile } = AuthStore;
    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;
    const UpdateDropOffButtonRef = ref<null | HTMLButtonElement>(null);

    const UpdateDropOff = async () => {
      if (UpdateDropOffButtonRef.value) {
        UpdateDropOffButtonRef.value!.disabled = true;
        UpdateDropOffButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const { tracking_number } = route.params;
      const formData = new FormData();

      formData.append("tracking_number", `${tracking_number}`);

      const RESPONSE = await axios
        .post(API_URL + "drivers/verify/dropoff", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          Swal.fire({
            text: "DropOff Verified",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {});
        })
        .catch((error) => {
          ErrorHandler(error);
        })
        .finally(() => {
          UpdateDropOffButtonRef.value?.removeAttribute("data-kt-indicator");
          UpdateDropOffButtonRef.value!.disabled = false;
        });

      return RESPONSE;
    };
    onMounted(async () => {
      const { tracking_number } = route.params;

      UpdateDropOff();
    });
    return { driverStats, getAssetPath, UpdateDropOff, UpdateDropOffButtonRef };
  },
});
</script>
