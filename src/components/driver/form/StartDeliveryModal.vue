<template>
  <div
    class="modal fade"
    id="kt_start_delivery_modal"
    ref="startDeleveryModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_start_delivery_modal_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Start Delivery</h2>

          <div
            id="kt_start_delivery_modal_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->

        <!--begin::Modal body-->
        <div class="modal-body py-10 px-lg-17">
          <!--begin::Scroll-->
          <div
            class="scroll-y me-n7 pe-7"
            id="kt_start_delivery_modal_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_start_delivery_modal_header"
            data-kt-scroll-wrappers="#kt_start_delivery_modal_scroll"
            data-kt-scroll-offset="300px"
          >
            <!--begin::Input group-->

            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semobold text-muted"
                >Customer Name</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span class="fw-bold fs-6 text-dark"
                  >{{
                    OrderData?.customer.firstName +
                    " " +
                    OrderData?.customer.lastName
                  }}Johnson</span
                >
              </div>
              <!--end::Col-->
            </div>
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semobold text-muted"
                >Pickup Location</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span class="fw-bold fs-6 text-dark">{{
                  OrderData?.pick_up
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semobold text-muted"
                >Drop Off Location</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span class="fw-bold fs-6 text-dark">{{
                  OrderData?.drop_off
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semobold text-muted">Expected</label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span class="fw-bold fs-6 text-dark">{{
                  formatDate(OrderData?.created_at!)
                }}</span>
              </div>
              <!--end::Col-->
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

          <!--end::Button-->

          <!--begin::Button-->
          <button
            ref="submitButtonRef"
            type="submit"
            id="kt_start_delivery_modal_submit"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Go For Pickup</span>
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
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import formatDate from "@/core/helpers/formatDate";

import Multiselect from "@vueform/multiselect";
import type { OrderType } from "@/core/types/Orders";
import type { PropType } from "vue";

interface FormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  permissions: Array<string>;
}

export default defineComponent({
  name: "start-delivery-modal",
  props: {
    OrderData: {
      type: Object as PropType<OrderType>,
    },
  },
  components: {},
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);

    const startDeleveryModalRef = ref<null | HTMLDivElement>(null);
    const backdropRef = ref<null | HTMLDivElement>(null);

    const modalRef = ref<null | HTMLElement>(null);

    const { API_URL } = __CONSTANTS__;

    const permissionsSelect = ref({
      mode: "tags",
      value: [],
      placeholder: "Select permissions",
      search: true,
      trackBy: "name",
      label: "name",
      options: [
        {
          value: "editCustomer",
          name: "Edit Customer",
        },
        {
          value: "addCustomer",
          name: "Add Customer",
        },
        {
          value: "deleteCustomer",
          name: "Delete Customer",
        },
      ],
    });
    const newAdminData = ref<FormData>({
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      permissions: [],
    });

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required().label("First Name"),
      lastName: Yup.string().required().label("Last Name"),
      email: Yup.string().required().label("Email"),
      userName: Yup.string().required().label("UserName"),
      password: Yup.string().required().label("Password"),
      permissions: Yup.string().required().label("Permissions"),
    });

    onMounted(() => {
      startDeleveryModalRef.value = document.getElementById(
        "kt_start_delivery_modal"
      ) as HTMLDivElement;
    });
    const CreateAdminProfile = async () => {
      if (submitButtonRef.value) {
        // eslint-disable-next-line
        submitButtonRef.value!.disabled = true;
        // Activate indicator
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const formData = new FormData();

      formData.append("firstName", newAdminData.value.firstName);
      formData.append("lastName", newAdminData.value.lastName);
      formData.append("email", newAdminData.value.email);
      formData.append("username", newAdminData.value.userName);
      formData.append("password", newAdminData.value.password);

      await axios
        .post(API_URL + "createAdminProfile", formData)
        .then(() => {
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
            }).then(() => {
              submitButtonRef.value?.removeAttribute("data-kt-indicator");
              submitButtonRef.value!.disabled = false;
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
              submitButtonRef.value?.removeAttribute("data-kt-indicator");
              submitButtonRef.value!.disabled = false;
            });
          }
        });
    };
    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      //Disable button
      submitButtonRef.value.disabled = true;
      // Activate indicator
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      await CreateAdminProfile();

      backdropRef.value = document.querySelector(
        ".modal-backdrop"
      ) as HTMLDivElement;

      console.log(backdropRef.value);
      startDeleveryModalRef.value?.removeAttribute("aria-modal");
      startDeleveryModalRef.value?.removeAttribute("role");
      startDeleveryModalRef.value?.setAttribute("aria-hidden", "true");

      startDeleveryModalRef.value!.style.display = "none";
      startDeleveryModalRef.value?.classList.remove("show");
      backdropRef.value?.classList.remove("show");
      backdropRef.value?.remove();
      //Disable button
      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };

    return {
      newAdminData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      getAssetPath,
      permissionsSelect,
      Multiselect,
      formatDate,
    };
  },
});
</script>
