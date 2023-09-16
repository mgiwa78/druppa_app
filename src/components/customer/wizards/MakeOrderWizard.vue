<template>
  <!--begin::Stepper-->
  <div
    class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
    id="kt_create_account_stepper"
    ref="verticalWizardRef"
  >
    <!--begin::Aside-->
    <div
      class="card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9"
    >
      <!--begin::Wrapper-->
      <div class="card-body px-6 px-lg-10 px-xxl-15 py-20">
        <!--begin::Nav-->
        <div class="stepper-nav">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <div class="stepper-wrapper">
              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">1</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Shipment Type</h3>

                <div class="stepper-desc fw-semobold">
                  Enter Shipment details
                </div>
              </div>
              <!--end::Label-->
            </div>

            <!--begin::Line-->
            <div class="stepper-line h-40px"></div>
            <!--end::Line-->
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <div class="stepper-wrapper">
              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">2</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Delivery Type</h3>
                <div class="stepper-desc fw-semobold">
                  Setup Your Delivery Details
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--begin::Line-->
            <div class="stepper-line h-40px"></div>
            <!--end::Line-->
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <div class="stepper-wrapper">
              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">3</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Pick-up and Drop-off address</h3>
                <div class="stepper-desc fw-semobold">
                  Enter Address Details
                </div>
              </div>
              <!--end::Label-->
            </div>

            <!--begin::Line-->
            <div class="stepper-line h-40px"></div>
            <!--end::Line-->
          </div>
          <!--end::Step 3-->

          <!--begin::Step 4-->

          <!--end::Step 4-->

          <!--begin::Step 5-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <div class="stepper-wrapper">
              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">4</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Completed</h3>
                <div class="stepper-desc fw-semobold">Order Complete</div>
              </div>
              <!--end::Label-->
            </div>
          </div>
          <!--end::Step 5-->
        </div>
        <!--end::Nav-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--begin::Aside-->

    <!--begin::Content-->
    <div class="card d-flex flex-row-fluid flex-center">
      <!--begin::Form-->
      <form
        class="py-20 w-100 px-9"
        novalidate
        id="kt_create_account_form"
        @submit="handleStep"
      >
        <!--begin::Step 1-->
        <div class="current" data-kt-stepper-element="content">
          <Step1 :shipmentType="shipmentOrder.shipmentType"></Step1>
        </div>
        <!--end::Step 1-->

        <!--begin::Step 2-->
        <div data-kt-stepper-element="content">
          <Step2></Step2>
        </div>
        <!--end::Step 2-->

        <!--begin::Step 3-->
        <div data-kt-stepper-element="content">
          <Step3 v-model:ShipmentOrder="shipmentOrder"></Step3>
        </div>
        <!--end::Step 3-->

        <!--begin::Step 4-->
        <!-- <div data-kt-stepper-element="content">
          <Step4></Step4>
        </div> -->
        <!--end::Step 4-->

        <!--begin::Step 5-->
        <div data-kt-stepper-element="content">
          <Step5
            :Verification="verification"
            :handleVerifyPayment="verifyPayment"
          ></Step5>
        </div>
        <!--end::Step 5-->

        <!--begin::Actions-->
        <div class="d-flex flex-stack pt-10">
          <!--begin::Wrapper-->
          <div class="mr-2">
            <button
              type="button"
              class="btn btn-lg btn-light-primary me-3"
              data-kt-stepper-action="previous"
              @click="previousStep"
            >
              <KTIcon icon-name="arrow-left" icon-class="fs-4 me-1" />
              Back
            </button>
          </div>
          <!--end::Wrapper-->

          <!--begin::Wrapper-->
          <div>
            <!-- <button
              type="button"
              class="btn btn-lg btn-primary me-3"
              data-kt-stepper-action="submit"
              v-if="currentStepIndex === totalSteps - 1"
              @click="formSubmit()"
            >
              <span class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-3 ms-2 me-0" />
              </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button> -->
            <paystack
              v-if="currentStepIndex === 2"
              buttonClass="button-class btn btn-success"
              buttonText="Pay via Paystack"
              type="button"
              :publicKey="PAYSTACK_PUBLIC_KEY"
              :email="email"
              :amount="amount"
              :reference="reference"
              :onSuccess="onSuccessfulPayment"
              :onCanel="onCancelledPayment"
              :first_name="user.firstName"
              last_name="user.lastName"
              :metadata="{
                pickupAddress: shipmentOrder.pickUp.pickupAddress,
                pickupState: shipmentOrder.pickUp.pickupState,
                dropOffAddress: shipmentOrder.dropOff.dropOffAddress,
                shipmentDescription: shipmentOrder.shipment_description,
                dropOffState: shipmentOrder.dropOff.dropOffState,
                userID: user.id,
                shipmentType: shipmentOrder.shipmentType,
              }"
            >
              Make Payment
            </paystack>
            <button v-else type="submit" class="btn btn-lg btn-primary">
              Continue
              <KTIcon icon-name="arrow-right" icon-class="fs-4 ms-2 me-0" />
            </button>
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Actions-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Stepper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Step1 from "@/components/customer/wizards/steps/Step1.vue";
import Step2 from "@/components/customer/wizards/steps/Step2.vue";
import Step3 from "@/components/customer/wizards/steps/Step3.vue";
import Step5 from "@/components/customer/wizards/steps/Step5.vue";
import { StepperComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useForm } from "vee-validate";
import __CONSTANTS__ from "@/constants";
import paystack from "vue3-paystack";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

interface IStep1 {
  shipmentType: string;
}

interface IStep2 {
  shipmentWeight: string;
}
interface PickUp {
  pickupAddress: string;
  pickupCity: string;
  pickupState: string;
  pickupLGA: string;
}
interface DropOff {
  dropOffAddress: string;
  dropOffCity: string;
  dropOffState: string;
  dropOffLGA: string;
}

interface IStep3 {
  pickUp: PickUp;
  dropOff: DropOff;
  expectedDeliveryDateAndTime: string;
  shipment_description: string;
  distance: number;
}
export interface VerificationData {
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
      pickupLGA: string;
      pickupCity: string;
      dropOffAddress: string;
      dropOffCity: string;
      dropOffLGA: string;
      dropOffState: string;
      distance: string;
      userID: string;
      expectedDeliveryDate: string;
      shipmentType: string;
      shipmentWeight: string;
      shipmentDescription: string;
    };
  };
}
export interface VerificationType {
  isVerifying: boolean;
  verificationData: VerificationData | null;
}
interface IStep4 {
  success: boolean;
}

export interface MakeShipmentOrder extends IStep1, IStep2, IStep3 {}

export default defineComponent({
  name: "kt-vertical-wizard",
  components: {
    Step1,
    Step2,
    Step3,
    Step5,
    paystack,
  },
  setup() {
    const AuthStore = useAuthStore();
    const isVerifying = ref<Boolean>(false);
    const { user, token } = AuthStore;
    const _stepperObj = ref<StepperComponent | null>(null);
    const verticalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    const verification = ref<VerificationType>({
      isVerifying: false,
      verificationData: null,
    });
    const PickUpAddressData = {
      pickupAddress: "Anything",
      pickupCity: "Umuahia",
      pickupState: "Abia",
      pickupLGA: "Aba North",
    };
    const DropOffAddressData = {
      dropOffAddress: "Anything",
      dropOffCity: "Umuahia",
      dropOffState: "Abia",
      dropOffLGA: "Aba North",
    };

    const shipmentOrder = ref<MakeShipmentOrder>({
      shipmentType: "standardShipments",
      shipmentWeight: "2-10",
      pickUp: PickUpAddressData,
      dropOff: DropOffAddressData,
      expectedDeliveryDateAndTime: "",
      shipment_description: "shipment description",
      distance: 47,
    });

    const amount = shipmentOrder.value.distance * 50000;
    const success = ref<boolean>(false);

    const email = "mgiwa78@gmail.com";

    const reference = computed(() => {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    });

    const { PAYSTACK_PUBLIC_KEY, API_URL, PAYSTACK_SECRETE_KEY } =
      __CONSTANTS__;

    const onSuccessfulPayment = () => {
      currentStepIndex.value++;

      _stepperObj.value?.goNext();
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
    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        verticalWizardRef.value as HTMLElement
      );
    });

    const selectShipmentTypeSchema = [
      Yup.object({
        shipmentType: Yup.string().required().label("Shipment Type"),
      }),
      Yup.object({
        shipmentWeight: Yup.string().required().label("Shipment Weight"),
      }),
      Yup.object({
        businessName: Yup.string().required().label("Business Name"),
        businessDescriptor: Yup.string()
          .required()
          .label("Shortened Descriptor"),
        businessType: Yup.string().required().label("Corporation Type"),
        businessEmail: Yup.string().required().label("Contact Email"),
      }),
    ];

    const currentSchema = computed(() => {
      return selectShipmentTypeSchema[currentStepIndex.value];
    });
    const { resetForm, handleSubmit } = useForm<
      IStep1 | IStep2 | IStep3 | IStep4
    >({
      validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (_stepperObj.value) {
        return _stepperObj.value.totalStepsNumber;
      } else {
        return 1;
      }
    });

    watch(currentStepIndex, async (newPage) => {
      console.log(newPage);
      if (currentStepIndex.value === 3) {
        isVerifying.value = true;
        try {
          await verifyPayment();
          await updatePaymentAndInvoice();
          verification.value.isVerifying = false;
        } catch (error) {
          error;
        }
      }
    });

    const verifyPayment = async () => {
      if (reference.value && currentStepIndex.value === 3) {
        verification.value.isVerifying = true;
        try {
          const transactionRef = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference.value}`,
            {
              headers: { Authorization: `Bearer ${PAYSTACK_SECRETE_KEY}` },
            }
          );
          console.log(transactionRef);
          verification.value.isVerifying = false;

          verification.value.verificationData = transactionRef.data;
        } catch (error) {
          verification.value.isVerifying = false;

          console.log(error);
        }
      }
    };

    const updatePaymentAndInvoice = async () => {
      const verificationData = verification.value.verificationData;
      console.log(verificationData);

      if (!verificationData) return;
      const {
        data: {
          reference,
          amount,
          currency,
          channel,
          metadata: {
            pickupAddress,
            pickupState,
            pickupLGA,
            pickupCity,
            dropOffAddress,
            dropOffCity,
            dropOffLGA,
            dropOffState,
            distance,
            userID,
            expectedDeliveryDate,
            shipmentType,
            shipmentWeight,
            shipmentDescription,
          },
        },
      } = verificationData;

      const formDateCustomerOrder = new FormData();
      const formDataPayment = new FormData();
      const formDataInvoice = new FormData();

      formDataPayment.append("paystack_refrence_id", reference);
      formDataPayment.append("customer_id", `${userID}`);
      formDataPayment.append("amount", amount);
      formDataPayment.append("currency", currency);
      formDataPayment.append("payment_method", channel);
      formDataPayment.append(
        "status",
        `${verification.value.verificationData?.status ? 1 : 0}`
      );
      // 2023-07-02 18:31:48
      formDateCustomerOrder.append("customer_id", `${userID}`);
      formDateCustomerOrder.append("payment_method", "Card");
      formDateCustomerOrder.append("pickup_address", pickupAddress);
      formDateCustomerOrder.append("pickup_state", pickupState);
      formDateCustomerOrder.append("pickup_lga", pickupLGA);
      formDateCustomerOrder.append("pickup_city", pickupCity);
      formDateCustomerOrder.append("distance", distance);
      formDateCustomerOrder.append("shipment_description", shipmentDescription);
      formDateCustomerOrder.append("dropOff_address", dropOffAddress);
      formDateCustomerOrder.append("total_payment", amount);
      formDateCustomerOrder.append("dropOff_city", dropOffCity);
      formDateCustomerOrder.append("dropOff_LGA", dropOffLGA);
      formDateCustomerOrder.append("dropOff_state", dropOffState);

      formDateCustomerOrder.append(
        "expected_delivery_date",
        expectedDeliveryDate
      );

      formDateCustomerOrder.append("service_rendered", shipmentType);
      formDateCustomerOrder.append("shipment_weight", shipmentWeight);

      try {
        await axios
          .post(API_URL + `payment`, formDataPayment, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(async (res) => {
            console.log(res.data);
            formDateCustomerOrder.append("payment_id", res.data.data.id);

            await axios
              .post(API_URL + `customerorders`, formDateCustomerOrder, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(async (Orderres) => {
                console.log(Orderres);
                formDataInvoice.append(
                  "customer_order_id",
                  Orderres.data.data.id
                );
                formDataInvoice.append("customer_id", userID);

                await axios.post(API_URL + `invoice`, formDataInvoice, {
                  headers: { Authorization: `Bearer ${token}` },
                });
              });
          });
        // await axios
        //   .post(API_URL + `customerorders`, formDateCustomerOrder, {
        //     headers: { Authorization: `Bearer ${token}` },
        //   })
        //   .then(async (res) => {
        //     console.log(res);
        //     formDataInvoice.append("customer_order_id", res.data.id);

        //     await axios.post(API_URL + `invoice`, formDataInvoice, {
        //       headers: { Authorization: `Bearer ${token}` },
        //     });
        //   });
      } catch (error) {
        console.log(error);
      }
    };

    const handleStep = handleSubmit((values) => {
      resetForm({
        values: {
          ...shipmentOrder.value,
        },
      });

      shipmentOrder.value = {
        ...shipmentOrder.value,
        ...values,
      };

      currentStepIndex.value++;

      // if (currentStepIndex.value === 3) {
      //   verifyPayments();
      // }

      if (!_stepperObj.value) {
        return;
      }
      _stepperObj.value.goNext();
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = () => {
      Swal.fire({
        text: "All is cool! Now you submit this form",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semobold btn-light-primary",
        },
      }).then(() => {
        window.location.reload();
      });
    };

    return {
      verticalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getAssetPath,
      onSuccessfulPayment,
      onCancelledPayment,
      amount,
      success,
      email,
      reference,
      PAYSTACK_PUBLIC_KEY,
      shipmentOrder,
      user,
      verifyPayment,
      verification,
    };
  },
});
</script>
