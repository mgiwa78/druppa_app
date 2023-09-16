<template>
  <!--begin::Navbar-->
  <div class="mx-5">
    <div class="card card-flush h-md-100">
      <!--begin::Body-->
      <div
        class="card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0"
        :style="`background-position: 100% 10%;
        background-image: url('${getAssetPath(
          '/media/illustrations/unitedpalms-1/7.png'
        )}');`"
      >
        <!--begin::Wrapper-->
        <div class="mb-10">
          <!--begin::Title-->
          <div class="fs-2hx fw-bold text-gray-800 text-center mb-13">
            Verify Pickup
          </div>
          <!--end::Title-->

          <!--begin::Action-->
          <div class="text-center">
            <button
              @click.prevent="UpdatePickUp"
              ref="UpdatePickUpButtonRef"
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
        <div class="text-center" v-if="verifyStatus">
          <img
            class="mx-auto h-600px h-lg-300 theme-light-show"
            :src="getAssetPath('media/illustrations/sigma-1/17.png')"
            alt=""
          />
          <img
            class="mx-auto h-600px h-lg-300px theme-dark-show"
            :src="getAssetPath('media/illustrations/sigma-1/17-dark.png')"
            alt=""
          />
        </div>
        <div class="text-center" v-if="verifyStatus === false">
          <img
            class="mx-auto h-300px h-lg-300 theme-light-show"
            :src="getAssetPath('media/illustrations/sigma-1/18.png')"
            alt=""
          />
          <img
            class="mx-auto h-400px h-lg-300px theme-dark-show"
            :src="getAssetPath('media/illustrations/sigma-1/18-dark.png')"
            alt=""
          />
        </div>
        <div class="text-center" v-if="verifyStatus === null">
          <img
            class="mx-auto h-600px h-lg-300 theme-light-show"
            :src="getAssetPath('media/illustrations/sigma-1/9.png')"
            alt=""
          />
          <img
            class="mx-auto h-600px h-lg-300px theme-dark-show"
            :src="getAssetPath('media/illustrations/sigma-1/9-dark.png')"
            alt=""
          />
        </div>
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

    const verifyStatus = ref<boolean | null>(null);
    const { token, refreshProfile } = AuthStore;
    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const UpdatePickUpButtonRef = ref<null | HTMLButtonElement>(null);

    const UpdatePickUp = async () => {
      verifyStatus.value = null;
      if (UpdatePickUpButtonRef.value) {
        UpdatePickUpButtonRef.value!.disabled = true;
        UpdatePickUpButtonRef.value.setAttribute("data-kt-indicator", "on");
      }
      const { tracking_number } = route.params;

      const formData = new FormData();

      formData.append("tracking_number", `${tracking_number}`);

      const RESPONSE = await axios
        .post(API_URL + "drivers/verify/pickup", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          verifyStatus.value = true;
          Swal.fire({
            text: "Login in",
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
          verifyStatus.value = false;
          ErrorHandler(error);
        })
        .finally(() => {
          UpdatePickUpButtonRef.value?.removeAttribute("data-kt-indicator");
          UpdatePickUpButtonRef.value!.disabled = false;
        });

      return RESPONSE;
    };
    onMounted(async () => {
      UpdatePickUp();
    });
    return { driverStats, getAssetPath, UpdatePickUp, verifyStatus };
  },
});
</script>
