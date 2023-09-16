<template>
  <div class="card">
    <div class="card-header">
      <h2 class="fw-bold my-10">Create Retainership</h2>
    </div>

    <VForm id="kt_modal_add_customer_form" class="form" @submit="submit" :validation-schema="validationSchema"
      v-slot="{}">
      <div class="card-body">

        <div class="mb-5 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Retainership Instance will be assign to</label>

            <Field name="assignedTo" class="form-select" as="select" v-model="newCouponData.assignedTo">
              <option value="">Select a Customer</option>
              <option value="*">Allow Use By All Customers</option>

              <option v-for="customer in AllCustomers" :key="customer.id || customer.lastName" :value="customer.id">
                {{ customer.lastName + " " + customer.firstName }}
              </option>
            </Field>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="assignedTo" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Maximum usage</label>
            <Field type="number" class="form-control form-control-solid" placeholder="Enter Coupon Max use" name="maxUses"
              aria-disabled="true" v-model="newCouponData.set_num_of_orders" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="maxUses" />
              </div>
            </div>
          </div>
        </div>


      </div>
      <div class="card-footer flex-center">
        <button type="reset" class="btn btn-light me-3">Discard</button>
        <button ref="submitButtonRef" type="submit" id="kt_create_retainer_submit" class="btn btn-primary">
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
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import statesInNigeria from "@/core/data/nigeriaStates";
import citiesInNigeria from "@/core/data/citiesInNigeria";
import { useAuthStore } from "@/stores/auth";
import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import ErrorHandler from "@/core/helpers/errorHandler";


export default defineComponent({
  name: "add-inventory-modal",
  components: { ErrorMessage, Field, VForm },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const validity = ref<Array<string>>(["", ""]);



    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);
    const AllCustomers = ref<Array<AllTypes.CustomerType> | null>(null);

    const { API_URL } =
      __CONSTANTS__;

    const newCouponData = ref<AllTypes.Retainership>(defaultTypes.RetainershipEmpty);

    const validationSchema = Yup.object().shape({
      assignedTo: Yup.string().required().label("For Use By"),
      maxUses: Yup.string().required().label("MaxUse"),
      // validFrom: Yup.string().required().label("Valid From Date"),
      // validUntil: Yup.string().required().label("Valid Till Date"),
    });

    const fetchCustomerProfiles = async () => {
      const customers = await axios
        .get(API_URL + "customers", {
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

      AllCustomers.value = customers.data;
    };

    onMounted(() => {
      fetchCustomerProfiles();
    });

    const CreateRetainerShip = async () => {
      console.log(newCouponData.value);
      if (submitButtonRef.value) {
        submitButtonRef.value!.disabled = true;
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const formData = new FormData();


      formData.append("customer_id", newCouponData.value.assignedTo);
      formData.append("set_num_of_orders", newCouponData.value.set_num_of_orders);



      await axios
        .post(API_URL + "retainerships", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({
            text: "Retainership has been created!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          newCouponData.value = defaultTypes.CouponEmpty;
        })

        .catch((error) => {
          ErrorHandler(error);
        })
        .then(() => {
          submitButtonRef.value?.removeAttribute("data-kt-indicator");
          submitButtonRef.value!.disabled = false;
        });
    };




    const submit = async () => {
      console.log(newCouponData.value);
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      await CreateRetainerShip();

      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };

    return {
      newCouponData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      AllCustomers,
      validity,
    };
  },
});
</script>
