<template>
  <div class="card pt-7">
    <div style="height: 30px !important" class="card-header">
      <h2>Track Your Shipment</h2>
    </div>
    <VForm
      id="kt_modal_create_api_key_form"
      class="form"
      @submit="submit"
      :validation-schema="validationSchema"
    >
      <div class="modal-body py-10 px-lg-17">
        <div
          class="scroll-y me-n7 pe-7"
          id="kt_modal_create_api_key_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_create_api_key_header"
          data-kt-scroll-wrappers="#kt_modal_create_api_key_scroll"
          data-kt-scroll-offset="300px"
        >
          <div class="mb-5 fv-row">
            <label class="required fs-5 fw-semobold mb-2">API Name</label>

            <Field
              type="text"
              class="form-control form-control-solid"
              placeholder="Order ID"
              name="apiName"
              v-model="apiData.apiName"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="apiName" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer flex-center pb-10">
        <button
          type="reset"
          id="kt_modal_create_api_key_cancel"
          class="btn btn-light me-3"
        >
          Discard
        </button>

        <button
          ref="submitButtonRef"
          type="submit"
          id="kt_modal_create_api_key_submit"
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
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";

interface APIData {
  apiName: string;
  shortDescription: string;
  category: string;
  apiMethod: string;
}

export default defineComponent({
  name: "create-api-key-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);

    const apiData = ref<APIData>({
      apiName: "",
      shortDescription: "",
      category: "",
      apiMethod: "",
    });

    const validationSchema = Yup.object().shape({
      apiName: Yup.string().required().label("API name"),
      shortDescription: Yup.string().required().label("Description"),
      category: Yup.string().required().label("Category"),
      apiMethod: Yup.string().required().label("API method"),
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
      apiData,
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
