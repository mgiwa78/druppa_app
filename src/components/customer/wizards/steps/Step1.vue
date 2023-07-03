<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bold d-flex align-items-center text-dark">
        Choose Account Type
        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          v-tooltip
          title="Billing is issued based on your selected account type"
        ></i>
      </h2>
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
    <div class="fv-row">
      <!--begin::Row-->
      <div class="row">
        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentType"
            value="standardShipments"
            id="kt_select_shipment_type_standard"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
            for="kt_select_shipment_type_standard"
          >
            <KTIcon icon-name="address-book" icon-class="fs-3x me-5" />

            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2">
                Standard Shipments
              </span>
              <span class="text-gray-400 fw-semobold fs-6">
                Regular shipments of general goods without special
                handling.</span
              >
            </span>
            <!--end::Info-->
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentType"
            value="fragileShipments"
            id="kt_select_shipment_type_fragile"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
            for="kt_select_shipment_type_fragile"
          >
            <KTIcon icon-name="briefcase" icon-class="fs-3x me-5" />

            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2"
                >Fragile Shipments
              </span>
              <span class="text-gray-400 fw-semobold fs-6"
                >Shipments with delicate items requiring extra handling and
                care.</span
              >
            </span>
            <!--end::Info-->
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->
      </div>
      <div class="row pt-10">
        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentType"
            value="dropshipShipments"
            id="kt_select_shipment_type_dropship"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
            for="kt_select_shipment_type_dropship"
          >
            <KTIcon icon-name="address-book" icon-class="fs-3x me-5" />

            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2">
                Dropship Shipments
              </span>
              <span class="text-gray-400 fw-semobold fs-6">
                Direct delivery from manufacturer/supplier to end
                customer.</span
              >
            </span>
            <!--end::Info-->
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentType"
            value="oversizedShipments"
            id="kt_select_shipment_type_oversized"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
            for="kt_select_shipment_type_oversized"
          >
            <KTIcon
              icon-name="bi bi-chevron-double-right"
              icon-class="fs-3x me-5"
            />

            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2"
                >Oversized Shipments
              </span>
              <span class="text-gray-400 fw-semobold fs-6">
                Shipments with large or heavy items,or high weight requiring
                special handling.</span
              >
            </span>
            <!--end::Info-->
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->
      </div>
      <div class="row pt-10">
        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentType"
            value="perishableShipments"
            id="kt_select_shipment_type_perishable"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
            for="kt_select_shipment_type_perishable"
          >
            <KTIcon icon-name="address-book" icon-class="fs-3x me-5" />

            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2">
                Perishable Shipments
              </span>
              <span class="text-gray-400 fw-semobold fs-6">
                Shipments of goods with limited shelf life, requiring
                temperature control.</span
              >
            </span>
            <!--end::Info-->
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-lg-6">
          <!--begin::Option-->
          <Field
            type="radio"
            class="btn-check"
            name="shipmentType"
            value="expressShipments"
            id="kt_select_shipment_type_express"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
            for="kt_select_shipment_type_express"
          >
            <KTIcon
              icon-name="bi bi-chevron-double-right"
              icon-class="fs-3x me-5"
            />

            <!--begin::Info-->
            <span class="d-block fw-semobold text-start">
              <span class="text-dark fw-bold d-block fs-4 mb-2"
                >Express Shipments
              </span>
              <span class="text-gray-400 fw-semobold fs-6">
                Shipments requiring urgent delivery within a short
                timeframe.</span
              >
            </span>
            <!--end::Info-->
          </label>
          <!--end::Option-->
        </div>
        <!--end::Col-->

        <ErrorMessage
          name="shipmentType"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Row-->
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import { ErrorMessage, Field } from "vee-validate";

export default defineComponent({
  name: "step-1",
  components: {
    Field,
    ErrorMessage,
  },
  props: { shipmentType: String },
  setup(props) {
    return {
      getAssetPath,
    };
  },
});
</script>
