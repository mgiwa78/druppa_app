<template>
  <div class="card">
    <div class="card-header">
      <h2 class="fw-bold my-10">Create Vendor Item</h2>
    </div>
    <VForm class="form" @submit="submit" :validation-schema="validationSchema" v-slot="{}">
      <div class="card-body">
        <div class="mb-5 row">
          <input type="file" @change="onChangeFileUpload" name="avatar" accept=".png, .jpg, .jpeg" />

        </div>
        <div class="mb-5 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Item Name</label>
            <Field type="text" class="form-control form-control-solid" placeholder="Enter Item Name" name="itemName"
              v-model="newVendorItem.name" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="itemName" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Item Price</label>
            <Field type="text" class="form-control form-control-solid" placeholder="Enter Item price" name="itemPrice"
              v-model="newVendorItem.price" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="itemPrice" />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-5 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Item Description</label>
            <Field type="text" class="form-control form-control-solid" placeholder="Enter Item Description"
              name="itemDescription" v-model="newVendorItem.description" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="itemDescription" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Category</label>
            <Field name="itemCategory" class="form-select form-control form-control-lg form-control-solid" as="select"
              v-model="newVendorItem.vendor_item_category_id">
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

      <div class="card-footer flex-center">
        <button type="reset" class="btn btn-light me-3">Discard</button>
        <button ref="submitButtonRef" type="submit" id="kt_add_vendor_item_submit" class="btn btn-primary">
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
import { defineComponent, onMounted, ref } from "vue";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import ErrorHandler from "@/core/helpers/errorHandler";

export default defineComponent({
  name: "create_vendor_item_form",
  components: { ErrorMessage, Field, VForm },
  setup() {
    const { API_URL } = __CONSTANTS__;


    const AuthStore = useAuthStore();
    const { user, token } = AuthStore;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const AllCategories = ref<Array<AllTypes.vendorCategoryType>>([]);

    const modalRef = ref<null | HTMLElement>(null);
    const newVendorItem = ref<AllTypes.VendorItemType>(
      defaultTypes.VendorItemEmpty
    );

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

    const validationSchema = Yup.object().shape({
      itemCategory: Yup.number().required().label("Item Category"),
      itemDescription: Yup.string().required().label("Item Description"),
      itemName: Yup.string().required().label("Item Name"),
      itemPrice: Yup.string().required().label("Item Price"),
    });

    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }
      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      const formData = new FormData()

      formData.append("name", newVendorItem.value.name);
      formData.append("description", newVendorItem.value.description);
      formData.append("price", newVendorItem.value.price);
      formData.append("image", newVendorItem.value.image[0]);
      formData.append("vendor_id", `${user.id}`);
      formData.append("vedor_item_category_id", newVendorItem.value.vendor_item_category_id);

      await axios
        .post(API_URL + "vendorItem", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "Item has been created!",
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
          ErrorHandler(error)
        })
        .then(() => {
          submitButtonRef.value?.removeAttribute("data-kt-indicator");
          submitButtonRef.value!.disabled = false;
        });
      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };
    const onChangeFileUpload = (e) => {
      const files = e.target.files
      newVendorItem.value.image = files;
    }
    return {
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      getAssetPath,
      newVendorItem, AllCategories, onChangeFileUpload
    };
  },
});
</script>
