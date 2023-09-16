<template>
  <div class="modal fade"
       id="kt_modal_customer_make_resturant_order"
       ref="customerMakeResturantOrder"
       tabindex="-1"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header"
             id="kt_make_dish_order_header">
          <h2 class="fw-bold">Make Order</h2>

          <div id="kt_make_dish_order_close"
               data-bs-dismiss="modal"
               class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross"
                    icon-class="fs-1" />
          </div>
        </div>
        <VForm v-if="orderView === 'enterOrderDetails'"
               id="kt_make_dish_order_form"
               class="form"
               @submit="submit"
               :validation-schema="validationSchema"
               v-slot="{}">
          <div class="modal-body py-10 px-lg-17">
            <div class="scroll-y me-n7 pe-7"
                 id="kt_make_dish_order_scroll"
                 data-kt-scroll="true"
                 data-kt-scroll-activate="{default: false, lg: true}"
                 data-kt-scroll-max-height="auto"
                 data-kt-scroll-dependencies="#kt_make_dish_order_header"
                 data-kt-scroll-wrappers="#kt_make_dish_order_scroll"
                 data-kt-scroll-offset="300px">
              <div class="mb-5 row">
                <div class="col-6">
                  <div class="fw-bold fs-3 mt-4">
                    {{ ItemData?.name
                    }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold fs-3 mt-4">
                    {{ formatMoneyToNaira(ItemData?.price)
                    }}
                  </div>
                </div>
              </div>
              <div class="mb-5 row">
                <div class="col-6">
                  <div class="fw-bold text-gray-400 fs-3 mt-4  text-capitalize">
                    {{ ItemData?.category.name
                    }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold fs-3 mt-4 text-capitalize  text-gray-400">By
                    {{ ItemData?.vendor.vendorName
                    }}
                  </div>
                </div>
              </div>
              <div class="mb-5 row">
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">Delivery instructions</label>
                  <Field type="text"
                         class="form-control form-control-solid"
                         placeholder="Delivery instructions"
                         name="deliveryInstructions"
                         aria-disabled="true"
                         v-model="dishOrderData.deliveryInstructions" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="deliveryInstructions" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">Dropoff address</label>

                  <Field type="text"
                         class="form-control form-control-solid"
                         placeholder="Dropoff address"
                         name="dropoffAddress"
                         v-model="dishOrderData.dropOff.dropOffAddress" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="dropoffAddress" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-5 row">
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">Dropoff state</label>

                  <Field type="text"
                         class="form-control form-control-solid"
                         placeholder="Dropoff state"
                         name="dropoffState"
                         v-model="dishOrderData.dropOff.dropOffState" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="dropoffState" />
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <label class="fw-bold required fs-5 fw-semobold mb-2">Payment Type</label>
                  <div class="row mx-1">
                    <div class="col-6 form-check form-check-custom form-check-solid">
                      <Field class="form-check-input"
                             name="paymentType"
                             v-model="dishOrderData.paymentType"
                             type="radio"
                             value="On-Delivery" />
                      <label class="form-check-label"
                             for="flexCheckDefault">On Delivery</label>
                    </div>
                    <div class="col-6 form-check form-check-custom form-check-solid">
                      <Field v-model="dishOrderData.paymentType"
                             class="form-check-input"
                             name="paymentType"
                             type="radio"
                             value="Online" />
                      <label class="form-check-label"
                             for="flexCheckDefault">Online</label>
                    </div>
                  </div>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="paymentType" />
                    </div>
                  </div>
                </div>

              </div>


            </div>
          </div>

          <div class="modal-footer flex-center">
            <button type="reset"
                    id="kt_make_dish_order_cancel"
                    class="btn btn-light me-3">
              Discard
            </button>

            <button ref="submitButtonRef"
                    type="submit"
                    id="kt_add_customer_submit"
                    class="btn btn-primary">
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>
        </VForm>
        <div class="card-body"
             v-if="orderView === 'makePayment'">
          <paystack v-if="dishOrderData.paymentType === 'Online'"
                    buttonClass="button-class btn btn-success"
                    buttonText="Pay via Paystack"
                    type="button"
                    :publicKey="PAYSTACK_PUBLIC_KEY"
                    :email="user.email"
                    :amount="Number(ItemData?.price) * 100"
                    :reference="reference"
                    :onSuccess="onSuccessfulPayment"
                    :onCanel="onCancelledPayment"
                    :first_name="user.firstName"
                    :last_name="user.lastName"
                    :metadata="{
                      dropOffAddress: dishOrderData.dropOff.dropOffAddress,
                      dropOffState: dishOrderData.dropOff.dropOffState,
                      userID: user.id,
                      shipmentType: 'Logistics',
                    }">
            Make Payment
          </paystack>
        </div>

        <div v-if="orderView === 'paymentComplete'"
             class="card-body">
          <div class="pb-8 pb-lg-10">
            <h2 class="fw-bold text-dark">Your Are Done!</h2>
          </div>

          <div class="mb-0 card-body"
               v-if="paymentProcess === 'processing'">
            <div class="spinner-border text-primary"
                 role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="mb-0"
               v-if="paymentProcess === 'processed'">
            <template v-if="dishOrderData.paymentType === 'Online'">
              <div class="fs-6 text-gray-600 mb-5">
                Your payment has been verified and sent to our driver, you will
                recieve a through your registered line.
              </div>
              <div :class="`notice d-flex bg-light-${verification?.verificationData?.status ? 'success' : 'danger'
                } rounded border-${verification?.verificationData?.status ? 'success' : 'danger'
                } border border-dashed p-6`">
                <KTIcon icon-name="information-5"
                        :icon-class="`fs-2tx text-${verification?.verificationData?.status ? 'success' : 'danger'
                          } me-4`" />
                <div class="d-flex flex-stack flex-grow-1">
                  <div class="fw-semobold">
                    <h4 class="text-gray-800 fw-bold">Payment Success</h4>
                    <div class="fs-6 text-gray-600">
                      Your Paymeny has wass successfull and your invoice has been
                      generated
                      <a href="#"
                         class="fw-bold">View your delivey status</a>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="dishOrderData.paymentType === 'On-Delivery'">
              <div class="fs-6 text-gray-600 mb-5">
                Your order has been made and sent to our drivers for processing, you
                will recieve a through your registered line.
              </div>
              <div :class="`notice d-flex bg-light-success rounded border-success border border-dashed p-6`">
                <KTIcon icon-name="information-5"
                        :icon-class="`fs-2tx text-success  me-4`" />
                <div class="d-flex flex-stack flex-grow-1">
                  <div class="fw-semobold">
                    <h4 class="text-gray-800 fw-bold">Order Success</h4>
                    <div class="fs-6 text-gray-600">
                      Your Paymeny has wass successfull and your invoice has been
                      generated
                      <a onclick=""
                         href="#"
                         class="fw-bold">View your delivey status</a>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, type PropType, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";

import * as Yup from "yup";
import __CONSTANTS__ from "@/constants";
import axios from "axios";
import statesInNigeria from "@/core/data/nigeriaStates";
import citiesInNigeria from "@/core/data/citiesInNigeria";

import { useAuthStore } from "@/stores/auth";
import ErrorHandler from "@/core/helpers/errorHandler";
import type { AllTypes } from "@/core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import formatMoneyToNaira from "@/core/helpers/formatMoney"

import paystack from "vue3-paystack";
import { parseTwoDigitYear } from "moment";

interface VerificationData {
  status: boolean;
  data: {
    reference: string;
    amount: string;
    currency: string;
    channel: string;
    customer: { email: string };
    metadata: {
      dropOffAddress: string;
      dropOffState: string;
      origin: string;
      customerID: string;
      packageType: string;
      deliveryInstructions: string;
      locationType: string;
    };
  };
}

interface VerificationType {
  isVerifying: boolean;
  verificationData: VerificationData | null;
}

export default defineComponent({
  name: "make-dish-order-modal",
  components: { ErrorMessage, Field, VForm, paystack },
  props: {
    ItemData: { type: Object as PropType<AllTypes.VendorItemType>, },
  },
  setup(props) {
    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const orderView = ref<
      "makePayment" | "enterOrderDetails" | "paymentComplete"
    >("enterOrderDetails");

    const addCustomerModalRef = ref<null | HTMLElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);
    const { PAYSTACK_PUBLIC_KEY, API_URL, PAYSTACK_SECRETE_KEY } =
      __CONSTANTS__;

    const dishOrderData = ref<AllTypes.MakeShipmentOrder>({ ...defaultTypes.MakeShipmentOrderEmpty, customer: user, dropOff: { dropOffAddress: user.address, dropOffState: user.state, }, pickUp: { pickupAddress: props.ItemData?.vendor.address, pickupState: user.state }, origin: user.state, vendorItemID: props.ItemData?.id, orderType: "Resturant", customerID: user.id, vendor_id: props.ItemData?.vendor_id });

    const reference = computed(() => {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    });

    const validationSchema = Yup.object().shape({
      deliveryInstructions: Yup.string().required().label("Delivery Instructions"),
      dropoffAddress: Yup.string().required().label("Dropoff Address"),
      dropoffState: Yup.string().required().label("Dropoff State"),
      paymentType: Yup.string().required().label("Payment Type"),
    });

    const paymentProcess = ref<"processing" | "processed" | null>(null);


    const MakeDishOrder = async () => {
      const formDateCustomerOrder = new FormData();
      const formDataPayment = new FormData();


      orderView.value = "paymentComplete";
      if (dishOrderData.value.paymentType === "Online") {
        const verificationData = verification.value.verificationData;

        if (!verificationData) return;

        const {
          data: { reference, amount, currency, channel },
        } = verificationData;

        formDataPayment.append("  ", reference);
        formDataPayment.append("amount", amount);
        formDataPayment.append("currency", currency);
        formDataPayment.append("payment_method", channel);

        formDateCustomerOrder.append("payment_type", "Online");
      }

      if (dishOrderData.value.paymentType === "On-Delivery") {
        formDataPayment.append("amount", `${props.ItemData?.price}`);
        formDataPayment.append("currency", "NGN");
        formDataPayment.append("payment_method", "On-Delivery");
        formDateCustomerOrder.append("payment_type", "On-Delivery");
      }

      const formDataInvoice = new FormData();

      formDataPayment.append(
        "status",
        `${verification.value.verificationData?.status ? 1 : 0}`
      );

      formDataPayment.append("customer_id", `${user.id}`);

      formDateCustomerOrder.append("customer_id", `${user.id}`);
      formDateCustomerOrder.append("payment_method", "Card");
      formDateCustomerOrder.append(
        "pickup_address",
        dishOrderData.value.pickUp.pickupAddress
      );
      formDateCustomerOrder.append(
        "dropoff_address",
        dishOrderData.value.dropOff.dropOffAddress
      );

      if (dishOrderData.value.locationType === "Inter-State") {
        formDateCustomerOrder.append(
          "dropoff_state",
          dishOrderData.value.dropOff.dropOffState
        );
        formDateCustomerOrder.append(
          "pickup_state",
          dishOrderData.value.pickUp.pickupState
        );
      }

      formDateCustomerOrder.append(
        "origin",
        dishOrderData.value.pickUp.pickupState !== ""
          ? dishOrderData.value.pickUp.pickupState
          : dishOrderData.value.origin
      );
      formDateCustomerOrder.append(
        "package_type",
        dishOrderData.value.packageType
      );

      formDateCustomerOrder.append("total_payment", `${props.ItemData?.price}`);
      formDateCustomerOrder.append(
        "delivery_instructions",
        dishOrderData.value.deliveryInstructions
      );
      formDateCustomerOrder.append(
        "location_type",
        dishOrderData.value.locationType
      );
      formDateCustomerOrder.append(
        "vendor_id",
        `${dishOrderData.value.vendor_id}`
      );
      formDateCustomerOrder.append(
        "order_type",
        `Resturant`
      );
      formDateCustomerOrder.append(
        "vendor_item_id",
        `${props.ItemData?.id}`
      );


      try {
        await axios
          .post(API_URL + `payment`, formDataPayment, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(async (res) => {
            formDateCustomerOrder.append("payment_id", res.data.data.id);

            await axios
              .post(API_URL + `customerorders/resturant`, formDateCustomerOrder, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(async (Orderres) => {
                formDataInvoice.append(
                  "customer_order_id",
                  Orderres.data.data.id
                );

                formDataInvoice.append("customer_id", `${user.id}`);

                await axios.post(API_URL + `invoice`, formDataInvoice, {
                  headers: { Authorization: `Bearer ${token}` },
                });
              });
          });
      } catch (error) {
        console.log(error);
        ErrorHandler(error);
      }
    };

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


    const verification = ref<VerificationType>({
      isVerifying: false,
      verificationData: null,
    });

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
        console.log(transactionRef.data);
        console.log(verification.value);
        console.log(dishOrderData.value)
      } catch (error) {
        verification.value.isVerifying = false;

        console.log(error);
      }
    };

    const onSuccessfulPayment = async () => {
      await verifyPayment();
      await MakeDishOrder();
      paymentProcess.value = "processed";
    };

    const submit = async () => {


      if (!submitButtonRef.value) {
        return;
      }
      console.log(dishOrderData.value)
      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");


      if (dishOrderData.value.paymentType == "Online") {
        orderView.value = "makePayment";

        return;
      }
      if (dishOrderData.value.paymentType == "On-Delivery") {
        MakeDishOrder();
        paymentProcess.value = "processed";
        return;
      }
      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };

    onMounted(() => {
      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    })
    return {
      dishOrderData,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      addCustomerModalRef, formatMoneyToNaira, orderView, paymentProcess, reference, PAYSTACK_PUBLIC_KEY, onCancelledPayment, onSuccessfulPayment, user, verification
    };
  },
});
</script>
