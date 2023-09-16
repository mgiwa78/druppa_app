<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold text-dark">Billing Details</h2>
      <!--end::Title-->

      <!--begin::Notice-->
      <div class="text-gray-400 fw-semobold fs-6">
        If you need more info, please check out
        <a href="#" class="text-primary fw-bold">Help Page</a>.
      </div>
      <!--end::Notice-->
    </div>
    <!--end::Heading-->

    <div class="w-100">
      <paystack
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
      <input type="hidden" name="success" v-model="success" />
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref } from "vue";
import { ErrorMessage, Field } from "vee-validate";

import paystack from "vue3-paystack";

import __CONSTANTS__ from "@/constants";

export default defineComponent({
  name: "step-4",
  components: {
    paystack,
  },

  setup() {
    const amount = 20000000;
    const success = ref<boolean>(false);

    const email = "mail@mail.com";

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
      success.value = true;
    };

    const onCancelledPayment = () => {
      console.log("You closed checkout page");
    };
    return {
      getAssetPath,
      onSuccessfulPayment,
      onCancelledPayment,
      amount,
      success,
      email,
      reference,
      PAYSTACK_PUBLIC_KEY,
    };
  },
});
</script>
