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
        class="py-20 w-100 w-xl-700px px-9"
        novalidate
        id="kt_create_account_form"
        @submit="handleStep"
      >
        <!--begin::Step 1-->
        <div class="current" data-kt-stepper-element="content">
          <Step1 :shipmentType="formData.shipmentType"></Step1>
        </div>
        <!--end::Step 1-->

        <!--begin::Step 2-->
        <div data-kt-stepper-element="content">
          <Step2></Step2>
        </div>
        <!--end::Step 2-->

        <!--begin::Step 3-->
        <div data-kt-stepper-element="content">
          <Step3
            @update:pick-up-address="handleAddressUpdate"
            v-model:PickUpAddress="formData.pickUp"
            v-model:DropOffAddress="formData.dropOff"
          ></Step3>
        </div>
        <!--end::Step 3-->

        <!--begin::Step 4-->
        <!-- <div data-kt-stepper-element="content">
          <Step4></Step4>
        </div> -->
        <!--end::Step 4-->

        <!--begin::Step 5-->
        <div data-kt-stepper-element="content">
          <Step5></Step5>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Step1 from "@/components/customer/wizards/steps/Step1.vue";
import Step2 from "@/components/customer/wizards/steps/Step2.vue";
import Step3 from "@/components/customer/wizards/steps/Step3.vue";
import Step4 from "@/components/customer/wizards/steps/Step4.vue";
import Step5 from "@/components/customer/wizards/steps/Step5.vue";
import { StepperComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useForm } from "vee-validate";
import __CONSTANTS__ from "@/constants";
import paystack from "vue3-paystack";

interface IStep1 {
  shipmentType: string;
}

interface IStep2 {
  shipmentWeight: string;
}
interface PickUp {
  address: string;
  city: string;
  state: string;
  LGA: string;
}
interface DropOff {
  address: string;
  city: string;
  state: string;
  LGA: string;
}

interface IStep3 {
  pickUp: PickUp;
  dropOff: DropOff;
}

interface IStep4 {
  success: boolean;
}

interface MakeShipmentOrder extends IStep1, IStep2, IStep3 {}

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
    const _stepperObj = ref<StepperComponent | null>(null);
    const verticalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    const PickUpAddress = {
      address: "sdfdsfsdffdsfs",
      city: "",
      state: "",
      LGA: "",
    };
    const DropOffAddress = {
      address: "",
      city: "",
      state: "",
      LGA: "",
    };

    const formData = ref<MakeShipmentOrder>({
      shipmentType: "personal",
      shipmentWeight: "50+",
      pickUp: PickUpAddress,
      dropOff: DropOffAddress,
    });
    const amount = 20000000;
    const success = ref<boolean>(false);

    const email = "mail@mail.com";

    const handleAddressUpdate = (add: string) => {
      console.log(add);
    };
    const reference = computed(() => {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    });

    const { PAYSTACK_PUBLIC_KEY } = __CONSTANTS__;

    const onSuccessfulPayment = () => {
      window.alert("Payment recieved");
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

    const handleStep = handleSubmit((values) => {
      resetForm({
        values: {
          ...formData.value,
        },
      });

      formData.value = {
        ...formData.value,
        ...values,
      };
      // if (_stepperObj.value.passedStepIndex === 3 && !values.success) {
      //   Swal.fire({
      //     text: `Make Payment First`,
      //     icon: "error",
      //     buttonsStyling: false,
      //     confirmButtonText: "Try again!",
      //     heightAuto: false,
      //     customClass: {
      //       confirmButton: "btn fw-semobold btn-light-danger",
      //     },
      //   });
      //   return;
      // }

      currentStepIndex.value++;
      console.log(currentStepIndex.value);
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
      formData,
      PickUpAddress,
      DropOffAddress,
      handleAddressUpdate,
    };
  },
});
</script>
