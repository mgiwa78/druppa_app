<template>
  <div class="card">
    <div class="card-header">
      <h2 class="fw-bold my-10">Make Order Form</h2>
    </div>
    <VForm v-if="orderView === 'enterOrderDetails'" class="form" @submit="submit" :validation-schema="validationSchema"
      v-slot="{}">
      <div class="card-body">
        <div class="mb-5 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Customer</label>
            <Field type="text" class="form-control form-control-solid" placeholder="Customer Name" name="customerID"
              disabled="true" v-model="user.lastName" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="customerID" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">
              Package Type</label>

            <Field name="packageType" class="form-select" as="select" v-model="newOrderRequest.packageType">
              <option value="">Select a Package type</option>

              <option v-for="(type, i) in [
                'Fragile Shipments',
                'Dropship Shipments',
                'Oversized Shipments',
                'Perishable Shipments',
                'Express Shipments',
              ]" :key="i" :value="type">
                {{ type }}
              </option>
            </Field>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="packageType" />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-5 ml-10 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Location type</label>
            <div class="row mx-1">
              <div class="col-6 form-check form-check-custom form-check-solid">
                <Field class="form-check-input" name="locationType" v-model="newOrderRequest.locationType" type="radio"
                  value="Inter-State" />
                <label class="form-check-label" for="flexCheckDefault">Inter-State</label>
              </div>
              <div class="col-6 form-check form-check-custom form-check-solid">
                <Field v-model="newOrderRequest.locationType" class="form-check-input" name="locationType" type="radio"
                  value="Within-State" />
                <label class="form-check-label" for="flexCheckDefault">Within-State</label>
              </div>
            </div>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="locationType" />
              </div>
            </div>
          </div>

          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Payment Type</label>
            <div class="row mx-1">
              <div class="col-4 form-check form-check-custom form-check-solid">
                <Field class="form-check-input" name="paymentType" v-model="newOrderRequest.paymentType" type="radio"
                  value="On-Delivery" />
                <label class="form-check-label" for="flexCheckDefault">On Delivery</label>
              </div>
              <div class="col-4 form-check form-check-custom form-check-solid">
                <Field class="form-check-input" name="retainer" v-model="newOrderRequest.paymentType" type="radio"
                  value="Retainer" />
                <label class="form-check-label" for="flexCheckDefault">Retainer</label>
              </div>
              <div class="col-4 form-check form-check-custom form-check-solid">
                <Field v-model="newOrderRequest.paymentType" class="form-check-input" name="paymentType" type="radio"
                  value="Online" />
                <label class="form-check-label" for="flexCheckDefault">Online</label>
              </div>
            </div>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="paymentType" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Droppoff Instructions</label>
            <Field type="text" class="form-control form-control-solid" placeholder="Enter dropp-off Instructions"
              name="deliveryInstructions" aria-disabled="true" v-model="newOrderRequest.deliveryInstructions" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="deliveryInstructions" />
              </div>
            </div>
          </div>
        </div>

        <div class="mb-5 row">
          <div class="col-6" v-if="newOrderRequest.locationType === 'Inter-State'">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Drop-off State</label>
            <Field name="dropoffState" class="form-select form-control form-control-lg form-control-solid" as="select"
              :modelValue="newOrderRequest.dropOff.dropOffState">
              <option value="">Select a State...</option>
              <option v-for="state in statesInNigeria" :key="state.code" :value="state.name">
                {{ state.name }}
              </option>
            </Field>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="dropoffState" />
              </div>
            </div>
          </div>
          <div class="col-6" v-if="newOrderRequest.locationType === 'Inter-State'">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Pickup State</label>
            <Field name="pickupState" class="form-select form-control form-control-lg form-control-solid" as="select"
              :modelValue="newOrderRequest.pickUp.pickupState">
              <option value="">Select a State...</option>
              <option v-for="state in statesInNigeria" :key="state.code" :value="state.name">
                {{ state.name }}
              </option>
            </Field>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="pickupState" />
              </div>
            </div>
          </div>
        </div>

        <div class="mb-5 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Pickup address</label>
            <Field type="text" class="form-control form-control-solid" placeholder="Enter Coupon Max use"
              name="pickupAddress" aria-disabled="true" v-model="newOrderRequest.pickUp.pickupAddress" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="pickupAddress" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Dropp-off address</label>
            <Field type="text" class="form-control form-control-solid" placeholder="Enter dropp-off address"
              name="dropOffAddress" v-model="newOrderRequest.dropOff.dropOffAddress" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="dropOffAddress" />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-5 row">
          <div class="mb-5 row">
            <div class="col-6" v-if="newOrderRequest.locationType === 'Within-State'">
              <label class="fw-bold required fs-5 fw-semobold mb-2">State</label>
              <Field name="origin" class="form-select form-control form-control-lg form-control-solid" as="select"
                v-model="newOrderRequest.origin">
                <option value="">Select a State...</option>
                <option value="Abuja">Abuja</option>
                <option v-for="state in statesInNigeria" :key="state.code" :value="state.name">
                  {{ state.name }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="origin" />
                </div>
              </div>
            </div>
            <div class="col-6">
              <label class="fw-bold required fs-5 fw-semobold mb-2">Price</label>
              <Field type="number" class="form-control form-control-solid" placeholder="Amount" name="amount"
                disabled="true" v-model="newOrderRequest.amount" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="amount" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-5 row">
          <div class="col-6">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Shipment Description</label>
            <Field type="text" class="form-control form-control-solid" placeholder="Shipment Description"
              name="shipmentDescription" v-model="newOrderRequest.shipmentDescription" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="shipmentDescription" />
              </div>
            </div>
          </div>

          <div class="col-3">
            <label class="fw-bold required fs-5 fw-semobold mb-2">Coupon Code</label>
            <Field type="text" :class="`form-control form-control-solid 
                ${!verifyCouponButton
                ? 'bg-danger text-white'
                : 'bg-light-success'
              }`" placeholder="Enter Coupon Code" name="couponCode" v-model="newOrderRequest.couponCode" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="shipmentDescription" />
              </div>
            </div>
          </div>
          <div class="col-3">
            <button @click="verifyCoupon()" type="button" id="kt_add_confirm_coupon" class="btn btn-primary my-8">
              <span v-if="verifyCouponButton === 'validated'" class="indicator-label">
                Validated
              </span>
              <span v-if="verifyCouponButton === 'unvalidated'" class="indicator-label">
                Submit
              </span>
              <span v-if="verifyCouponButton === 'running'" class="indicator-label">
                Loading
              </span>
            </button>
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
    <div class="card-body" v-if="orderView === 'makePayment'">
      <paystack v-if="newOrderRequest.paymentType === 'Online'" buttonClass="button-class btn btn-success"
        buttonText="Pay via Paystack" type="button" :publicKey="PAYSTACK_PUBLIC_KEY" :email="user.email"
        :amount="newOrderRequest.amount" :reference="reference" :onSuccess="onSuccessfulPayment"
        :onCanel="onCancelledPayment" :first_name="user.firstName" :last_name="user.lastName" :metadata="{
          pickupAddress: newOrderRequest.dropOff.dropOffAddress,
          pickupState: newOrderRequest.pickUp.pickupState,
          dropOffAddress: newOrderRequest.dropOff.dropOffAddress,
          shipmentDescription: newOrderRequest.shipmentDescription,
          dropOffState: newOrderRequest.dropOff.dropOffState,
          userID: user.id,
          shipmentType: newOrderRequest.packageType,
        }">
        Make Payment
      </paystack>
    </div>
    <div v-if="orderView === 'paymentComplete'" class="card-body">
      <div class="pb-8 pb-lg-10">
        <h2 class="fw-bold text-dark">Your Are Done!</h2>
      </div>

      <div class="mb-0 card-body" v-if="paymentProcess === 'processing'">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div class="mb-0" v-if="paymentProcess === 'processed'">
        <template v-if="newOrderRequest.paymentType === 'Online'">
          <div class="fs-6 text-gray-600 mb-5">
            Your payment has been verified and sent to our driver, you will
            recieve a through your registered line.
          </div>
          <div :class="`notice d-flex bg-light-${verification?.verificationData?.status ? 'success' : 'danger'
            } rounded border-${verification?.verificationData?.status ? 'success' : 'danger'
            } border border-dashed p-6`">
            <KTIcon icon-name="information-5" :icon-class="`fs-2tx text-${verification?.verificationData?.status ? 'success' : 'danger'
              } me-4`" />
            <div class="d-flex flex-stack flex-grow-1">
              <div class="fw-semobold">
                <h4 class="text-gray-800 fw-bold">Payment Success</h4>
                <div class="fs-6 text-gray-600">
                  Your Paymeny has wass successfull and your invoice has been
                  generated
                  <a href="#" class="fw-bold">View your delivey status</a>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="newOrderRequest.paymentType === 'On-Delivery' || newOrderRequest.paymentType === 'Retainer'">
          <div class="fs-6 text-gray-600 mb-5">
            Your order has been made and sent to our drivers for processing, you
            will recieve a through your registered line.
          </div>
          <div :class="`notice d-flex bg-light-success rounded border-success border border-dashed p-6`">
            <KTIcon icon-name="information-5" :icon-class="`fs-2tx text-success  me-4`" />
            <div class="d-flex flex-stack flex-grow-1">
              <div class="fw-semobold">
                <h4 class="text-gray-800 fw-bold">Order Success</h4>
                <div class="fs-6 text-gray-600">
                  Your Paymeny has wass successfull and your invoice has been
                  generated
                  <a href="/#/customer/order/myOrder" class="fw-bold">View your delivey status</a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";

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
import paystack from "vue3-paystack";
import { clippingParents } from "@popperjs/core";

interface VerificationData {
  status: boolean;
  data: {
    reference: string;
    amount: string;
    currency: string;
    channel: string;
    customer: { email: string };
    metadata: {
      pickupAddress: string;
      pickupState: string;
      dropOffAddress: string;
      dropOffState: string;
      origin: string;
      customerID: string;
      packageType: string;
      shipmentDescription: string;
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
  name: "make_order_request",
  components: { ErrorMessage, Field, VForm, paystack },
  setup() {
    const paymentProcess = ref<"processing" | "processed" | null>(null);
    const { PAYSTACK_PUBLIC_KEY, API_URL, PAYSTACK_SECRETE_KEY } =
      __CONSTANTS__;

    interface CouponEffect {
      couponType: "PercentageDicount" | "ReductionDiscount";
      couponAmount: number;
    }

    const couponEffect = ref<CouponEffect | null>(null);

    const AuthStore = useAuthStore();
    const { user, token, refreshProfile } = AuthStore;

    const verification = ref<VerificationType>({
      isVerifying: false,
      verificationData: null,
    });

    const orderView = ref<
      "makePayment" | "enterOrderDetails" | "paymentComplete"
    >("enterOrderDetails");

    const PickUpAddressData = {
      pickupAddress: "house 11, Kalas-Street, palmheights Luxury, lugbe",
      pickupState: "Abuja",
    };
    const DropOffAddressData = {
      dropOffAddress: "Kalas Street, Palm Heights Luxury, lugbe, Abuja",
      dropOffState: "Abuja",
    };

    const constAmount = 2 * 50000;

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const verifyCouponButton = ref<"running" | "unvalidated" | "validated">(
      "unvalidated"
    );
    const validity = ref<Array<string>>(["", ""]);

    // const backdropRef = ref<null | HTMLDivElement>(null);
    // const addCustomerModalRef = ref<null | HTMLElement>(null);

    const modalRef = ref<null | HTMLElement>(null);
    const createAPIKeyModalRef = ref<null | HTMLElement>(null);
    const AllCustomers = ref<Array<AllTypes.CustomerType> | null>(null);

    const reference = computed(() => {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    });

    const newOrderRequest = ref<AllTypes.MakeShipmentOrder>({
      packageType: "Express Shipments",
      paymentType: "On-Delivery",
      deliveryInstructions: "Call - 09054551017 When at gate",
      locationType: "Within-State",
      customerID: `${user.id}`,
      orderType: "Logistics",
      origin: "Abuja",
      pickUp: PickUpAddressData,
      dropOff: DropOffAddressData,
      shipmentDescription: "Blue stripped cargo",
      couponCode: "",
      amount: "20000",
    });

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

    const validationSchema = Yup.object().shape({
      customerID: Yup.string().required().label("customerID"),
      packageType: Yup.string().required().label("Package Type"),
      shipmentDescription: Yup.string().required().label("Shipment Description"),
      deliveryInstructions: Yup.string().required().label("Delivery Instructions"),
      pickupState: Yup.string().when('locationType', {
        is: 'Inter-State',
        then: Yup.string().required().label("Pickup State"),
        otherwise: Yup.string(),
      }),
      dropoffState: Yup.string().when('locationType', {
        is: 'Inter-State',
        then: Yup.string().required().label("Drop-off State"),
        otherwise: Yup.string(),
      }),
      origin: Yup.string().when('locationType', {
        is: 'Within-State',
        then: Yup.string().required().label("State is required"),
        otherwise: Yup.string(),
      }),
      pickupAddress: Yup.string().required().label("Pickup address"),
      dropOffAddress: Yup.string().required().label("Drop-off address"),
      paymentType: Yup.string().required().label("Payment Type address"),
      locationType: Yup.string().required().label("Location Type"),
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
      } catch (error) {
        verification.value.isVerifying = false;

        console.log(error);
      }
    };

    const verifyCoupon = async () => {
      verifyCouponButton.value = "running";

      if (newOrderRequest.value.couponCode === "") {
        verifyCouponButton.value = "unvalidated";
        return;
      }
      const couponData = new FormData();
      couponData.append("coupon_code", newOrderRequest.value.couponCode);

      try {
        const RESPONSE = await axios
          .post(API_URL + `coupon/verify`, couponData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            verifyCouponButton.value = "validated";
            return res;
          });

        return RESPONSE.data;
      } catch (error) {
        verifyCouponButton.value = "unvalidated";
        ErrorHandler(error);
      }
    };
    // onMounted(() => {
    // });

    const OrderRequest = async () => {
      let retainership_id
      if (newOrderRequest.value.paymentType === "Retainer") {
        const a = async () => {
          const retainership_confirm = await axios.get(API_URL + `retainerships/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          retainership_id = retainership_confirm.data.data.id
          console.log(retainership_id)
        }
        await a()
      }

      const formDateCustomerOrder = new FormData();
      const formDataPayment = new FormData();

      if (newOrderRequest.value.couponCode !== "") {
        const couponData = await verifyCoupon();

        if (couponData.data) {
          formDateCustomerOrder.append("coupon_id", couponData.data.id);
        }
      }
      if (
        verifyCouponButton.value === "unvalidated" &&
        newOrderRequest.value.couponCode !== ""
      )
        return Swal.fire({
          text: "Invalid Coupon",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Close",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });

      orderView.value = "paymentComplete";
      if (newOrderRequest.value.paymentType === "Online") {
        const verificationData = verification.value.verificationData;

        if (!verificationData) return;

        const {
          data: { reference, amount, currency, channel },
        } = verificationData;

        // formDataPayment.append("  ", reference);
        formDataPayment.append("amount", amount);
        formDataPayment.append("currency", currency);
        formDataPayment.append("payment_method", channel);

        formDateCustomerOrder.append("payment_type", "Online");
      }

      if (newOrderRequest.value.paymentType === "On-Delivery") {
        formDataPayment.append("amount", `${constAmount}`);
        formDataPayment.append("currency", "NGN");
        formDataPayment.append("payment_method", "On-Delivery");
        formDateCustomerOrder.append("payment_type", "On-Delivery");
      }

      if (newOrderRequest.value.paymentType === "Retainer") {
        formDataPayment.append("amount", `${newOrderRequest.value.amount}`);
        formDataPayment.append("currency", "NGN");
        formDataPayment.append("payment_method", "Retainer");
        formDateCustomerOrder.append("payment_type", "Retainer");
        formDateCustomerOrder.append("retainer_instance_id", retainership_id);
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
        newOrderRequest.value.pickUp.pickupAddress
      );
      formDateCustomerOrder.append(
        "dropoff_address",
        newOrderRequest.value.dropOff.dropOffAddress
      );



      if (newOrderRequest.value.locationType === "Inter-State") {
        formDateCustomerOrder.append(
          "dropoff_state",
          newOrderRequest.value.dropOff.dropOffState
        );
        formDateCustomerOrder.append(
          "pickup_state",
          newOrderRequest.value.pickUp.pickupState
        );
      }

      formDateCustomerOrder.append(
        "origin",
        newOrderRequest.value.pickUp.pickupState !== ""
          ? newOrderRequest.value.pickUp.pickupState
          : newOrderRequest.value.origin
      );
      formDateCustomerOrder.append(
        "package_type",
        newOrderRequest.value.packageType
      );
      formDateCustomerOrder.append(
        "shipment_description",
        newOrderRequest.value.shipmentDescription
      );
      formDateCustomerOrder.append("total_payment", `${constAmount}`);
      formDateCustomerOrder.append(
        "delivery_instructions",
        newOrderRequest.value.deliveryInstructions
      );
      formDateCustomerOrder.append(
        "location_type",
        newOrderRequest.value.locationType
      );

      try {
        await axios
          .post(API_URL + `payment`, formDataPayment, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(async (res) => {
            formDateCustomerOrder.append("payment_id", res.data.data.id);


            await axios
              .post(API_URL + `customerorders`, formDateCustomerOrder, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(async (Orderres) => {
                formDataInvoice.append(
                  "customer_order_id",
                  Orderres.data.data.id
                );

                if (newOrderRequest.value.paymentType === "Retainer") {
                  const retainerFormData = new FormData()
                  console.log(Orderres)

                  retainerFormData.append("customer_order_id", Orderres.data.data.id)
                  retainerFormData.append("customer_id", Orderres.data.data.customer_id)
                  retainerFormData.append("payment_id", res.data.data.id);

                  await axios.post(API_URL + `retainerships/${retainership_id}/instances`, retainerFormData, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                }

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


    const onSuccessfulPayment = async () => {
      await verifyPayment();
      await OrderRequest();
      paymentProcess.value = "processed";
    };


    const submit = async () => {
      paymentProcess.value = "processing";
      if (!submitButtonRef.value) {
        return;
      }
      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      if (newOrderRequest.value.paymentType == "Online") {
        orderView.value = "makePayment";
        return;
      }
      if (newOrderRequest.value.paymentType == "On-Delivery" || newOrderRequest.value.paymentType == "Retainer") {
        await OrderRequest();
        paymentProcess.value = "processed";
        return;
      }

      submitButtonRef.value?.removeAttribute("data-kt-indicator");
      submitButtonRef.value!.disabled = false;
    };

    return {
      newOrderRequest,
      validationSchema,
      submit,
      submitButtonRef,
      modalRef,
      createAPIKeyModalRef,
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      AllCustomers,
      PAYSTACK_PUBLIC_KEY,
      validity,
      onCancelledPayment,
      user,
      constAmount,
      reference,
      onSuccessfulPayment,
      orderView,
      verification,
      paymentProcess,
      verifyCoupon,
      verifyCouponButton,
    };
  },
});
</script>
