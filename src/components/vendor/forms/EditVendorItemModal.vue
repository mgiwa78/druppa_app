<template>
  <div class="modal fade" id="kt_modal_edit_admin" ref="editAdminModalRef" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_edit_admin_header">
          <h2 class="fw-bold">Edit Vendor Item</h2>

          <div id="kt_modal_edit_admin_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <VForm id="kt_modal_create_api_key_form" class="form" @submit="submit" :validation-schema="validationSchema">
          <div class="modal-body py-10 px-lg-17">
            <div class="scroll-y me-n7 pe-7" id="kt_modal_create_api_key_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_create_api_key_header"
              data-kt-scroll-wrappers="#kt_modal_create_api_key_scroll" data-kt-scroll-offset="300px">

              <div class="mb-5 row">
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">Name</label>

                  <Field type="text" class="form-control form-control-solid" placeholder="Name" name="name"
                    v-model="editVendorItem.name" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold font-weight-bolder required fs-5 fw-semobold mb-2">Price</label>

                  <Field type="text" class="form-control form-control-solid" placeholder="Price" name="price"
                    v-model="editVendorItem.price" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="price" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-5 row">
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">Description</label>

                  <Field type="text" class="form-control form-control-solid" placeholder="Description" name="description"
                    v-model="editVendorItem.description" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">Category</label>
                  <Field name="itemCategory" class="form-select form-control form-control-lg form-control-solid"
                    as="select" v-model="editVendorItem.vendor_item_category_id">
                    <option value="">Select a Item Category...</option>
                    <option v-for="category in AllCategories" :key="category.id" :value="category.id">{{ category.name }}
                    </option>
                  </Field>

                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="itemCategory" />
                    </div>
                  </div>
                </div>

              </div>





            </div>
          </div>

          <div class="modal-footer flex-center">
            <button type="reset" id="kt_modal_create_api_key_cancel" class="btn btn-light me-3">
              Discard
            </button>

            <button ref="submitButtonRef" type="submit" id="kt_modal_create_api_key_submit" class="btn btn-primary">
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
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
import { computed, defineComponent, ref, type PropType, onMounted } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import { useAuthStore } from "@/stores/auth";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import Multiselect from "@vueform/multiselect";
import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "edit-vendor-item-modal",
  props: {
    VendorData: {
      type: Object as PropType<AllTypes.VendorItemType>,
    },
  },
  components: { ErrorMessage, Field, VForm },
  setup(props) {
    const { API_URL } = __CONSTANTS__;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);

    const AuthStore = useAuthStore();
    const { user, token } = AuthStore;



    const editVendorItem = computed<AllTypes.VendorItemType>(() => {
      console.log("object");
      if (props.VendorData && props.VendorData.id) {

        return {
          ...props.VendorData
        }

      }
      return { ...defaultTypes.AdminEmpty }
    });

    const AllCategories = ref<Array<AllTypes.vendorCategoryType>>([]);

    const validationSchema = Yup.object().shape({
      name: Yup.string().required().label("Name"),
      description: Yup.string().required().label("Description"),
      price: Yup.string().required().label("Price"),
      vendor_item_category_id: Yup.string().required().label("vendor item category "),
    });

    const updateVendorItem = async () => {
      if (submitButtonRef.value) {
        // eslint-disable-next-line
        submitButtonRef.value!.disabled = true;
        // Activate indicator
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }
      if (!user) return;

      const formData = new FormData();
      formData.append("id", `${editVendorItem.value.id}`);

      formData.append("name", editVendorItem.value.name!);
      formData.append("price", editVendorItem.value.price!);
      formData.append("description", editVendorItem.value.description!);
      formData.append("vendor_item_category_id", editVendorItem.value.vendor_item_category_id!);
      formData.append("_method", "put");

      await axios
        .post(API_URL + `vendorItem`, formData, {
          method: "put",
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "Item has been updated!",
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
          ErrorHandler(error);
        });
    };

    const fetchVendorCategories = async () => {
      const profiles = await axios
        .get(API_URL + "vendorItemCategories", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
          Swal.fire({
            text: error.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Error Fetching Data!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        });
      console.log(profiles);
      AllCategories.value = profiles.data;
    };

    onMounted(() => {
      fetchVendorCategories();
    });
    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }
      await updateVendorItem();

      if (submitButtonRef.value) {
        submitButtonRef.value.disabled = false;

        submitButtonRef.value?.removeAttribute("data-kt-indicator");
      }
    };

    return {
      editVendorItem,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
      AllCategories
    };
  },
});
</script>
