<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold text-dark">Account Info</h2>
      <!--end::Title-->

      <!--begin::Notice-->
      <div class="text-gray-400 fw-semobold fs-6">
        If you need more info, please check out
        <a href="#" class="link-primary fw-bold">Help Page</a>.
      </div>
      <!--end::Notice-->
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="mb-10 fv-row">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label mb-3">
        Specify Shipment Weight
        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          v-tooltip
          title="Provide your team size to help us setup your billing"
        ></i>
      </label>
      <!--end::Label-->

      <!--begin::Row-->
      <div class="row mb-2" data-kt-buttons="true">
        <!--begin::Col-->
        <div class="col">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            id="shipmentWeight1"
            name="shipmentWeight"
            value="1-1"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4"
            for="shipmentWeight1"
          >
            <span class="fw-bold fs-3">1-3 Kg</span>
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentWeight"
            id="shipmentWeight2"
            value="2-10"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4"
            for="shipmentWeight2"
          >
            <span class="fw-bold fs-3">4-10 Kg</span>
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentWeight"
            id="shipmentWeight3"
            value="10-50"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4"
            for="shipmentWeight3"
          >
            <span class="fw-bold fs-3">10-50 kg</span>
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentWeight"
            id="shipmentWeight4"
            checked
            value="50+"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4"
            for="shipmentWeight4"
          >
            <span class="fw-bold fs-3">50+</span>
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Hint-->
      <div class="form-text">
        Pick the weight range the best fits your shipment
      </div>
      <!--end::Hint-->
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import { Field } from "vee-validate";

export default defineComponent({
  name: "step-2",
  components: {
    Field,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
