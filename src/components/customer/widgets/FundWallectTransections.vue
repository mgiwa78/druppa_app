<template>
  <div :class="widgetClasses" class="card">
    <div class="card-header border-0 py-3">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Fund Wallet</span>
      </h3>
    </div>

    <div class="card-body pt-0">
      <VForm
        id="fundWalletAmountform"
        class="form"
        @submit="submit"
        :validation-schema="validationSchema"
      >
        <!--begin::Modal body-->
        <div class="modal-body">
          <!--begin::Scroll-->
          <div
            class="scroll-y me-n7 pe-7"
            id="kt_modal_add_admin_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_add_admin_header"
            data-kt-scroll-wrappers="#kt_modal_add_admin_scroll"
            data-kt-scroll-offset="300px"
          >
            <div class="mb-5 row" v-if="fundWalletAmount">
              <div class="fw-bold fs-4 col-6">Fund Account with:</div>
              <div class="fw-semobold fs-4 col-6">{{ formattedAmount }}</div>
            </div>
            <div class="mb-5 row">
              <div class="col-12">
                <label class="fw-bold required fs-5 fw-semobold mb-2"
                  >Fund your wallet</label
                >

                <Field
                  type="number"
                  class="form-control form-control-solid"
                  placeholder="Fund Your Wallet With"
                  name="fundWalletAmount"
                  v-model="fundWalletAmount"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="fundWalletAmount" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer flex-center">
          <button
            type="reset"
            id="kt_modal_add_admin_cancel"
            class="btn btn-light me-3"
          >
            Discard
          </button>

          <paystack
            v-if="fundWalletAmount"
            buttonClass="button-class btn btn-success"
            buttonText="Fund Wallet"
            type="button"
            :publicKey="PAYSTACK_PUBLIC_KEY"
            :email="user.email"
            :amount="parseFloat(fundWalletAmount)"
            :reference="reference"
            :onSuccess="onSuccessfulPayment"
            :onCanel="onCancelledPayment"
            :first_name="user.firstName"
            :last_name="user.lastName"
            :metadata="{
              userID: user.id,
            }"
          >
            Fund Wallet
          </paystack>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";

import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

import formatDate from "@/core/helpers/formatDate";
import * as Yup from "yup";
import type { AllTypes } from "../../../core/types";

import { defaultTypes } from "../../../core/types/defaultData.js";

import ErrorHandler from "@/core/helpers/errorHandler";
import paystack from "vue3-paystack";
import Swal from "sweetalert2";

interface VerificationType {
  isVerifying: boolean;
  verificationData: VerificationData | null;
}
interface VerificationData {
  status: boolean;
  data: {
    reference: string;
    amount: string;
  };
}

export default defineComponent({
  name: "customer-delivery-stats",
  components: { VForm, ErrorMessage, Field, paystack },
  props: {
    widgetClasses: String,
  },

  emits: [
    "page-change",
    "on-sort",
    "on-items-select",
    "on-items-per-page-change",
  ],

  setup(props, { emit }) {
    const { API_URL, ASSETS_URL, PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRETE_KEY } =
      __CONSTANTS__;

    const DeliveriesPaginationData = ref<any>({});
    const fundWalletAmount = ref<string>("");

    const fundWalletSubmitButtonRef = ref<null | HTMLButtonElement>(null);

    const editDeliveryData = ref<AllTypes.DeliveryType>(
      defaultTypes.DeliveryEmpty
    );
    const CustomerViewDeliveryData = ref<AllTypes.DeliveryType>(
      defaultTypes.DeliveryEmpty
    );

    const verification = ref<VerificationType>({
      isVerifying: false,
      verificationData: null,
    });

    const dataToDisplay = ref<Array<AllTypes.DeliveryType> | null>(null);
    const itemsPerPage = ref<number>(10);
    const totalDeliveries = ref<Array<number>>([0]);
    const total = ref<number>(0);

    const validationSchema = Yup.object().shape({
      fundWalletAmount: Yup.string().required().label("FundWallet Amount"),
    });

    const AuthStore = useAuthStore();
    const { user, token } = AuthStore;

    const itemsPerPageDropdownEnabled = ref<boolean>(true);
    const currentPage = ref<number>(1);

    const checkedRows = ref<Array<number>>([]);

    const reference = computed(() => {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    });

    const formattedAmount = computed(() => {
      const numericValue = parseFloat(`${fundWalletAmount.value}`);
      if (!isNaN(numericValue)) {
        const money = numericValue / 100;

        return money
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace("$", "₦");
      }
      return "";
    });
    watch(
      () => itemsPerPage.value,
      (val) => {
        currentPage.value = 1;
        emit("on-items-per-page-change", val);
      }
    );

    const onCancelledPayment = () => {
      Swal.fire({
        text: `Payment Canceled`,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Try again!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semobold btn-light-danger",
        },
      });
    };
    const totalItems = computed(() => {
      if (totalDeliveries.value) {
        if (totalDeliveries.value.length <= itemsPerPage.value) {
          return total.value;
        } else {
          return totalDeliveries.value.length;
        }
      }
      return 0;
    });

    const updateEditDelivery = async (delivery: AllTypes.DeliveryType) => {
      editDeliveryData.value = delivery;
    };
    const updateViewDelivery = async (delivery: AllTypes.DeliveryType) => {
      CustomerViewDeliveryData.value = delivery;
    };

    const verifyPayment = async () => {
      verification.value.isVerifying = true;
      try {
        const transactionRef = await axios.get(
          `https://api.paystack.co/transaction/verify/${reference.value}`,
          {
            headers: { Authorization: `Bearer ${PAYSTACK_SECRETE_KEY}` },
          }
        );

        verification.value.isVerifying = false;
        verification.value.verificationData = transactionRef.data;
      } catch (error) {
        verification.value.isVerifying = false;
      }
    };

    const updateCustomerBalance = async () => {
      const formData = new FormData();

      formData.append("amount", `${fundWalletAmount.value}`);

      await axios
        .post(API_URL + `wallet/deposit`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          window.location.reload();
        });
    };

    const onSuccessfulPayment = async () => {
      await verifyPayment();
      await updateCustomerBalance();
    };

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const submit = async () => {
      if (!fundWalletSubmitButtonRef.value) {
        return;
      }

      fundWalletSubmitButtonRef.value.disabled = true;
      fundWalletSubmitButtonRef.value.setAttribute("data-kt-indicator", "on");

      fundWalletSubmitButtonRef.value?.removeAttribute("data-kt-indicator");
      fundWalletSubmitButtonRef.value!.disabled = false;
    };

    return {
      checkedRows,
      getAssetPath,
      pageChange,
      currentPage,
      itemsPerPage,
      totalDeliveries,
      totalItems,
      dataToDisplay,
      itemsPerPageDropdownEnabled,
      ASSETS_URL,
      editDeliveryData,
      updateEditDelivery,
      CustomerViewDeliveryData,
      updateViewDelivery,
      formatDate,
      fundWalletAmount,
      validationSchema,
      submit,
      fundWalletSubmitButtonRef,
      PAYSTACK_PUBLIC_KEY,
      reference,
      user,
      onSuccessfulPayment,
      onCancelledPayment,
      formattedAmount,
    };
  },
});
</script>
