<template>
  <div
    class="modal fade"
    id="kt_update_is_active_modal"
    ref="startDeleveryModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div
          class="alert alert-dismissible bg-light-warning d-flex flex-center flex-column py-10 px-10 px-lg-20 mb-10"
        >
          <!--begin::Close-->
          <button
            type="button"
            class="position-absolute top-0 end-0 m-2 btn btn-icon btn-icon-warning"
            data-bs-dismiss="alert"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </button>
          <!--end::Close-->
          <span class="svg-icon svg-icon-5tx svg-icon-warning mb-5">
            <inline-svg src="media/icons/duotune/general/gen044.svg" />
          </span>
          <!--begin::Content-->
          <div class="text-center text-dark">
            <h1 class="fw-bolder mb-5">
              Are you sure you want to make your profile
              {{ newState ? "Active" : "In-Active" }}
            </h1>
            <div
              class="separator separator-dashed border-warning opacity-25 mb-5"
            ></div>
            <div class="mb-9">
              Note the the state set may affect the
              <strong>orders you are able to see</strong>, and you commision
              rate
            </div>
            <!--begin::Buttons-->
            <div class="d-flex flex-center flex-wrap">
              <a
                href="#"
                class="btn btn-outline btn-outline-warning btn-active-warning m-2"
                >Cancel</a
              >
              <button
                ref="submitButtonRef"
                @click="UpdateState"
                id="kt_add_driver_submit"
                class="btn btn-warning m-2"
              >
                <span class="indicator-label"> Update Anyway </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
            <!--end::Buttons-->
          </div>
          <!--end::Content-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import formatDate from "@/core/helpers/formatDate";
import { useAuthStore } from "@/stores/auth";
import Multiselect from "@vueform/multiselect";
import type { PropType } from "vue";
import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "start-delivery-modal",
  props: {
    newState: {
      type: Boolean,
    },
  },
  components: {},
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const startDeleveryModalRef = ref<null | HTMLDivElement>(null);
    const backdropRef = ref<null | HTMLDivElement>(null);

    const AuthStore = useAuthStore();
    const { token, refreshProfile } = AuthStore;

    const modalRef = ref<null | HTMLElement>(null);

    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    onMounted(() => {
      startDeleveryModalRef.value = document.getElementById(
        "kt_update_is_active_modal"
      ) as HTMLDivElement;
    });
    const UpdateState = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      if (submitButtonRef.value) {
        submitButtonRef.value!.disabled = true;
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      await axios
        .post(
          API_URL + "stateUpdate",
          { isActive: props.newState },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          Swal.fire({
            text: "Profile has been updated!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            submitButtonRef.value?.removeAttribute("data-kt-indicator");
            submitButtonRef.value!.disabled = false;
            refreshProfile();
          });
        })
        .catch((error) => {
          ErrorHandler(error);
        })
        .finally(() => {
          hideModal(startDeleveryModalRef.value);
          submitButtonRef.value?.removeAttribute("data-kt-indicator");
          submitButtonRef.value!.disabled = false;
        });
    };
    const submit = async () => {
      await UpdateState();
    };

    return {
      submit,
      submitButtonRef,
      modalRef,
      getAssetPath,
      Multiselect,
      formatDate,
      UpdateState,
    };
  },
});
</script>
