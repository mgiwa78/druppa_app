<template>
  <div class="card">
    <div class="card-header">
      <h2 class="fw-bold my-10">Create new coupon code</h2>
    </div>

    <VForm id="kt_modal_add_customer_form" class="form" @submit="submit" :validation-schema="validationSchema"
      v-slot="{}">
      <div class="card-body">
        <div class="mb-5 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Coupon Code</label>
            <Field type="text" :disabled="true" class="form-control form-control-solid"
              placeholder="Generated Coupon Code" name="couponCode" aria-disabled="true" v-model="newCouponData.code" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="couponCode" />
              </div>
            </div>
          </div>
          <div class="col-6 py-9">
            <button @click="generateCouponCode" type="button" id="kt_add_customer_submit" class="btn btn-primary">
              <span class="indicator-label"> Generate Coupon Code </span>
            </button>
          </div>
        </div>
        <div class="mb-5 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Form use by</label>

            <Field name="forUseBy" class="form-select" as="select" v-model="newCouponData.forUseBy">
              <option value="">Select a Coupon Customer</option>
              <option value="*">Allow Use By All Customers</option>

              <option v-for="customer in AllCustomers" :key="customer.id || customer.lastName" :value="customer.id">
                {{ customer.lastName + " " + customer.firstName }}
              </option>
            </Field>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="forUseBy" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Maximum usage</label>
            <Field type="number" class="form-control form-control-solid" placeholder="Enter Coupon Max use" name="maxUse"
              aria-disabled="true" v-model="newCouponData.maxUses" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="maxUse" />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-5 row">
          <div class="col-6">
            <!--be >gin::Input-->
            <label class="fw-bold required fs-5 fw-semobold mb-2">Valid From</label>
            <div class="position-relative align-items-center">
              <!--begin::Datepicker-->

              <div class="demo-datetime-pickeqr">
                <el-date-picker v-model="validity" :name="['validFrom', 'validUntil']" @change="handleCouponValidity"
                  placeholder="Select date and time" type="daterange" range-separator="To" start-placeholder="valid from"
                  end-placeholder="valid until" size="large" />
              </div>
              <!--end::Datepicker-->
            </div>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="Start" />
              </div>
            </div>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="Stop" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Coupon Type</label>
            <div class="fv row mb-10">
              <div class="col-6 form-check form-check-custom form-check-solid">
                <Field class="form-check-input" name="couponType" v-model="newCouponData.couponType" type="radio"
                  value="percentageDiscount" />
                <label class="form-check-label" for="flexCheckDefault">Percentage Discount</label>
              </div>
              <div class="col-6 form-check form-check-custom form-check-solid">
                <Field v-model="newCouponData.couponType" class="form-check-input" name="couponType" type="radio"
                  value="reductionDiscount" />
                <label class="form-check-label" for="flexCheckDefault">Reduction Discount</label>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-5 row">
          <div class="col-6" v-if="newCouponData.couponType === 'percentageDiscount'">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Percentage of decrease</label>
            <Field type="number" class="form-control form-control-solid" placeholder="Enter decrease percentage"
              name="percentageDiscount" aria-disabled="true" max="100" v-model="newCouponData.percentageDiscount" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="percentageDiscount" />
              </div>
            </div>
          </div>
          <div class="col-6" v-if="newCouponData.couponType === 'reductionDiscount'">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Reduction amount</label>
            <Field type="number" class="form-control form-control-solid" placeholder="Enter Reduction amount"
              name="reductionDiscount" aria-disabled="true" v-model="newCouponData.reductionAmount" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="reductionDiscount" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer flex-center">
        <button type="reset" class="btn btn-light me-3">Discard</button>
        <button ref="submitButtonRef" type="submit" id="kt_add_customer_submit" class="btn btn-primary">
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

interface FormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone_number: string;
  state: string;
  address: string;
  city: string;
  password: string;
  gender: string;
  title: string;
}
interface inventoryRequest {
  avilableQuantity: number;
  inventoryID: number;
  requestQuantity: number;
  requestDescription: string;
  pickupAddress: string;
}
export default defineComponent({
  name: "add-inventory-modal",
  components: { ErrorMessage, Field, VForm },
  setup() {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const validity = ref<Array<string>>(["", ""]);

    // const backdropRef = ref<null | HTMLDivElement>(null);
    // const addCustomerModalRef = ref<null | HTMLElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);
    const AllCustomers = ref<Array<AllTypes.CustomerType> | null>(null);

    const { API_URL, badInternetAlert, errorAlert, successAlert } =
      __CONSTANTS__;

    const newCouponData = ref<AllTypes.CouponType>(defaultTypes.CouponEmpty);

    const validationSchema = Yup.object().shape({
      couponCode: Yup.string().required().label("Coupon Code"),
      forUseBy: Yup.string().required().label("For Use By"),
      maxUse: Yup.string().required().label("MaxUse"),

      // validFrom: Yup.string().required().label("Valid From Date"),
      // validUntil: Yup.string().required().label("Valid Till Date"),
    });

    const fetchCustomerProfiles = async () => {
      const profiles = await axios
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
      console.log(profiles);
      AllCustomers.value = profiles.data;
    };
    onMounted(() => {
      fetchCustomerProfiles();
    });

    const CreateCouponCode = async () => {
      if (submitButtonRef.value) {
        submitButtonRef.value!.disabled = true;
        submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      }

      const formData = new FormData();
      console.log(newCouponData.value);
      formData.append("code", newCouponData.value.code);
      formData.append("validFrom", newCouponData.value.validFrom);
      formData.append("validUntil", newCouponData.value.validUntill);
      formData.append("maxUses", newCouponData.value.maxUses);
      formData.append("couponType", newCouponData.value.couponType);

      newCouponData.value.couponType === "percentageDiscount"
        ? formData.append(
          "percentageDiscount",
          newCouponData.value.percentageDiscount
        )
        : "";
      newCouponData.value.couponType === "reductionDiscount"
        ? formData.append(
          "reductionAmount",
          newCouponData.value.reductionAmount
        )
        : "";

      formData.append(
        "forUser",
        JSON.stringify([newCouponData.value.forUseBy])
      );

      await axios
        .post(API_URL + "coupon/create/new", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          // hideModal(addCustomerModalRef.value);
          Swal.fire({
            text: "Coupon has been created!",
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

    const handleCouponValidity = (value) => {
      const [start, stop] = value;
      console.log(value);
      const startDate = new Date(start);
      const stopDate = new Date(stop);
      const formattedStartDate = startDate
        .toISOString()
        .replace("T", " ")
        .slice(0, -5);
      const formattedStopDate = stopDate
        .toISOString()
        .replace("T", " ")
        .slice(0, -5);
      newCouponData.value.validFrom = formattedStartDate;
      newCouponData.value.validUntill = formattedStopDate;
    };

    const generateCouponCode = () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let coupon = "";
      for (let i = 0; i < 8; i++) {
        coupon += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      newCouponData.value.code = coupon;
    };
    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      await CreateCouponCode();

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
      generateCouponCode,
      handleCouponValidity,
      validity,
    };
  },
});
</script>
