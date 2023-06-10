<template>
  <div
    class="modal fade"
    id="kt_modal_view_admin"
    ref="viewAdminModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_admin_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">View Admin Profile</h2>

          <div
            id="kt_modal_add_admin_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <div class="card-body p-10">
          <!--begin::Summary-->
          <div class="d-flex flex-center flex-column mb-5">
            <!--begin::Avatar-->
            <div class="symbol symbol-100px symbol-circle mb-7">
              <img :src="getAssetPath('media/avatars/300-1.jpg')" alt="image" />
            </div>
            <!--end::Avatar-->

            <!--begin::Name-->
            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              Max Smith
            </a>
            <!--end::Name-->

            <!--begin::Position-->
            <div class="fs-5 fw-semobold text-muted mb-6">Software Enginer</div>
            <!--end::Position-->

            <!--end::Info-->
          </div>
          <!--end::Summary-->

          <!--begin::Details toggle-->
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_view_details"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_view_details"
            >
              Details
              <span class="ms-2 rotate-180">
                <KTIcon icon-name="down" icon-class="fs-3" />
              </span>
            </div>

            <span
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              title="Edit customer details"
            >
              <a
                href="#"
                class="btn btn-sm btn-light-primary"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_update_customer"
              >
                Edit
              </a>
            </span>
          </div>
          <!--end::Details toggle-->

          <div class="separator separator-dashed my-3"></div>

          <!--begin::Details content-->
          <div id="kt_customer_view_details" class="collapse show">
            <div class="py-5 fs-6">
              <!--begin::Badge-->
              <div class="badge badge-light-info d-inline">Premium user</div>
              <!--begin::Badge-->
              <!--begin::Details item-->
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Account ID</div>
                  <div class="text-gray-600">ID-45453423</div>
                  <!--begin::Details item-->
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Billing Email</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary"
                      >info@keenthemes.com</a
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Billing Address</div>
                  <div class="text-gray-600">
                    101 Collin Street, <br />Melbourne 3000 VIC <br />Australia
                  </div>
                  <!--begin::Details item-->
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Upcoming Invoice</div>
                  <div class="text-gray-600">54238-8693</div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Details content-->
        </div>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
// import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";

interface FormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  permissions: Array<string>;
}

export default defineComponent({
  name: "add-admin-modal",
  components: {
    // ErrorMessage, Field, VForm
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);

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

    const submit = () => {
      if (!submitButtonRef.value) {
        return;
      }

      //Disable button
      submitButtonRef.value.disabled = true;
      // Activate indicator
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      setTimeout(() => {
        if (submitButtonRef.value) {
          submitButtonRef.value.disabled = false;

          submitButtonRef.value?.removeAttribute("data-kt-indicator");
        }

        Swal.fire({
          text: "Form has been successfully submitted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          hideModal(createAPIKeyModalRef.value);
        });
      }, 2000);
    };

    return {
      newAdminData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
    };
  },
});
</script>
