<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-8 pb-lg-10">
      <!--begin::Title-->
      <h2 class="fw-bold text-dark">Your Are Done!</h2>
      <!--end::Title-->

      <!--begin::Notice-->

      <!--end::Notice-->
    </div>
    <!--end::Heading-->

    <!--begin::Body-->
    <div class="mb-0" v-if="Verification?.isVerifying">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="mb-0" v-else>
      <!--begin::Text-->
      <div class="fs-6 text-gray-600 mb-5">
        Your payment has been verified and sent to our driver, your will be call
        shortly through your registered line.
      </div>
      <!--end::Text-->

      <!--begin::Alert-->
      <div
        :class="`notice d-flex bg-light-${
          Verification?.verificationData?.status ? 'success' : 'danger'
        } rounded border-${
          Verification?.verificationData?.status ? 'success' : 'danger'
        } border border-dashed p-6`"
      >
        <KTIcon
          icon-name="information-5"
          :icon-class="`fs-2tx text-${
            Verification?.verificationData?.status ? 'success' : 'danger'
          } me-4`"
        />
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="fw-semobold">
            <h4 class="text-gray-800 fw-bold">Payment Success</h4>
            <div class="fs-6 text-gray-600">
              Your Paymeny has wass successfull and your invoice has been
              generated
              <a href="#" class="fw-bold">View your delivey status</a>
            </div>
          </div>
          <!--end::Content-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Alert-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, type PropType } from "vue";
import type { VerificationType } from "../MakeOrderWizard.vue";


export default defineComponent({
  name: "step-5",
  components: {},
  props: {
    handleVerifyPayment: Function,
    Verification: {
      type: Object as PropType<VerificationType>,
    },
  },
  setup(props) {
    onMounted(() => {
      if (props.handleVerifyPayment) {
        props.handleVerifyPayment();
      }
    });
    return {
      getAssetPath,
    };
  },
});
</script>
