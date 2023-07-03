<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bold text-dark">Calculate Shipment bill</h2>
      <!--end::Title-->

      <!--begin::Notice-->
      <div class="text-gray-400 fw-semobold fs-6">
        If you need more info, please check out
        <a href="#" class="link-primary fw-bold">Help Page</a>.
      </div>
      <!--end::Notice-->
    </div>
    <!--end::Heading-->
    <!--end::Label-->
    <GoogleMap
      api-key="AIzaSyCq7DHPQ3pSR7uuS4u7-I3m5DGpJFbdqYU"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="15"
    >
      <Pin :options="markerOptions" />
    </GoogleMap>
    <!--begin::Input group-->
    <div>
      <div class="fv-row mb-10">
        <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
          >Shipment description</label
        >
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-text form-control form-control-lg form-control-solid"
          :modelValue="ShipmentOrder?.shipment_description"
          type="text"
          name="shipment_description"
          rules="required"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="shipment_description" />
          </div>
        </div>
      </div>
      <h2 class="my-5">Enter Pickup Address</h2>
      <div class="row">
        <div class="col-6">
          <!--be >gin::Input-->
          <label class="fw-bold required fs-5 fw-semobold mb-2"
            >Expected Delivery Date</label
          >
          <div class="position-relative align-items-center">
            <!--begin::Datepicker-->

            <div class="demo-datetime-pickeqr">
              <el-date-picker
                v-model="value1"
                @change="handleExpectedDeliveryDateAndTime"
                type="datetime"
                placeholder="Select date and time"
              />
            </div>
            <!--end::Datepicker-->
          </div>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="pickupState" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <!--be >gin::Input-->
          <label class="fw-bold required fs-5 fw-semobold mb-2">State</label>
          <Field
            name="pickupState"
            class="form-select form-control form-control-lg form-control-solid"
            as="select"
            :modelValue="ShipmentOrder?.pickUp?.pickupState"
            @change="handlePickUpAddressUpdate"
          >
            <option value="">Select a State...</option>
            <option
              v-for="state in statesInNigeria"
              :key="state.code"
              :value="state.name"
            >
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

      <div class="row">
        <div class="col-6">
          <label class="fw-bold required fs-5 fw-semobold mb-2">City</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="pickupCity"
            class="form-select form-control form-control-lg form-control-solid"
            as="select"
            :modelValue="ShipmentOrder?.pickUp.pickupCity"
            @change="handlePickUpAddressUpdate"
            ><option v-if="ShipmentOrder?.pickUp.pickupState" selected value="">
              Select a State
            </option>
            <template v-if="ShipmentOrder?.pickUp.pickupState">
              <template
                v-if="citiesInNigeria[ShipmentOrder?.pickUp.pickupState]"
              >
                <option
                  v-for="city in citiesInNigeria[
                    ShipmentOrder?.pickUp.pickupState
                  ]"
                  :key="city.code"
                  :value="city.city"
                >
                  {{ city.city }}
                </option>
              </template>
              <option v-else :value="ShipmentOrder?.pickUp.pickupState">
                {{ ShipmentOrder?.pickUp.pickupState }}
              </option>
            </template>
            <option v-else selected value="">Select a State First</option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="pickupCity" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
            >LGA</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="pickupLGA"
            class="form-select form-control form-control-lg form-control-solid"
            as="select"
            :modelValue="ShipmentOrder?.pickUp.pickupLGA"
            @change="handlePickUpAddressUpdate"
            ><option v-if="ShipmentOrder?.pickUp.pickupState" selected value="">
              Select a State
            </option>
            <template v-if="ShipmentOrder?.pickUp.pickupState">
              <template v-if="LGAInNigeria[ShipmentOrder?.pickUp.pickupState]">
                <option
                  v-for="lga in LGAInNigeria[ShipmentOrder?.pickUp.pickupState]"
                  :key="lga.code"
                  :value="lga.name"
                >
                  {{ lga.name }}
                </option>
              </template>
              <option v-else :value="ShipmentOrder?.pickUp.pickupState">
                {{ ShipmentOrder?.pickUp.pickupState }}
              </option>
            </template>
            <option v-else selected value="">Select a State First</option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="pickupLGA" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
            >Address</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            :modelValue="ShipmentOrder?.pickUp.pickupAddress"
            @change="handlePickUpAddressUpdate"
            name="pickupAddress"
            rules="required"
            as="textarea"
            class="form-textarea form-control form-control-lg form-control-solid"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="pickupAddress" />
            </div>
          </div>
        </div>
      </div>
      <h2 class="my-10">Enter DropOff Address</h2>
      <div class="row">
        <div class="col-6">
          <label class="fw-bold required fs-5 fw-semobold mb-2">State</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="dropOffState"
            class="form-select form-control form-control-lg form-control-solid"
            as="select"
            :modelValue="ShipmentOrder?.dropOff.dropOffState"
            @change="handleDropOffAddressUpdate"
          >
            <option value="">Select a State...</option>
            <option
              v-for="state in statesInNigeria"
              :key="state.code"
              :value="state.name"
            >
              {{ state.name }}
            </option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="dropOffState" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <label class="fw-bold required fs-5 fw-semobold mb-2">City</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="dropOffCity"
            class="form-select form-control form-control-lg form-control-solid"
            as="select"
            :modelValue="ShipmentOrder?.dropOff.dropOffCity"
            @change="handleDropOffAddressUpdate"
            ><option
              v-if="ShipmentOrder?.dropOff.dropOffState"
              selected
              value=""
            >
              Select a State
            </option>
            <template v-if="ShipmentOrder?.dropOff.dropOffState">
              <template
                v-if="citiesInNigeria[ShipmentOrder?.dropOff.dropOffState]"
              >
                <option
                  v-for="city in citiesInNigeria[
                    ShipmentOrder?.dropOff.dropOffState
                  ]"
                  :key="city.code"
                  :value="city.city"
                >
                  {{ city.city }}
                </option>
              </template>
              <option v-else :value="ShipmentOrder?.dropOff.dropOffState">
                {{ ShipmentOrder?.dropOff.dropOffState }}
              </option>
            </template>
            <option v-else selected value="">Select a State First</option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="dropOffCity" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
            >LGA</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="dropOffLGA"
            class="form-select form-control form-control-lg form-control-solid"
            as="select"
            :modelValue="ShipmentOrder?.dropOff.dropOffLGA"
            @change="handleDropOffAddressUpdate"
            ><option
              v-if="ShipmentOrder?.dropOff.dropOffState"
              selected
              value=""
            >
              Select a State
            </option>
            <template v-if="ShipmentOrder?.dropOff.dropOffState">
              <template
                v-if="LGAInNigeria[ShipmentOrder?.dropOff.dropOffState]"
              >
                <option
                  v-for="lga in LGAInNigeria[
                    ShipmentOrder?.dropOff.dropOffState
                  ]"
                  :key="lga.code"
                  :value="lga.name"
                >
                  {{ lga.name }}
                </option>
              </template>
              <option v-else :value="ShipmentOrder?.dropOff.dropOffState">
                {{ ShipmentOrder?.dropOff.dropOffState }}
              </option>
            </template>
            <option v-else selected value="">Select a State First</option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="dropOffLGA" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
            >Address</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            :modelValue="ShipmentOrder?.dropOff.dropOffAddress"
            @change="handleDropOffAddressUpdate"
            name="dropOffAddress"
            rules="required"
            as="textarea"
            class="form-textarea form-control form-control-lg form-control-solid"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="dropOffAddress" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
          >Distance</label
        >
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-text form-control form-control-lg form-control-solid"
          :modelValue="ShipmentOrder?.distance"
          type="number"
          name="distance"
          rules="required"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="distance" />
          </div>
        </div>
      </div>
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>
<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, type PropType } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import statesInNigeria from "@/core/data/nigeriaStates";
import citiesInNigeria from "@/core/data/citiesInNigeria";
import LGAInNigeria from "@/core/data/LGAInNigeria";
import { GoogleMap, Marker as Pin } from "vue3-google-map";
import type { MakeShipmentOrder } from "../MakeOrderWizard.vue";

export default defineComponent({
  name: "step-3",
  components: {
    Field,
    ErrorMessage,
    GoogleMap,
    Pin,
  },
  props: {
    ShipmentOrder: {
      type: Object as PropType<MakeShipmentOrder>,
    },
  },
  emits: ["update:ShipmentOrder", "update:Value"],

  setup(props, { emit }) {
    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

    const shortcuts = [
      {
        text: "Today",
        value: new Date(),
      },
      {
        text: "Yesterday",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        },
      },
      {
        text: "A week ago",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
    ];
    const center = { lat: 40.689247, lng: -74.044502 };
    const markerOptions = {
      position: center,
      label: "L",
      title: "LADY LIBERTY",
    };

    const handlePickUpAddressUpdate = (event) => {
      const { name, value } = event.target;
      const newData = {
        ...props.ShipmentOrder,
        pickUp: { ...props.ShipmentOrder?.pickUp, [name]: value },
      };
      emit("update:ShipmentOrder", newData);
    };

    const handleDropOffAddressUpdate = (event) => {
      const { name, value } = event.target;
      const newData = {
        ...props.ShipmentOrder,
        dropOff: { ...props.ShipmentOrder?.dropOff, [name]: value },
      };
      emit("update:ShipmentOrder", newData);
    };

    const handleExpectedDeliveryDateAndTime = (value) => {
      const date = new Date(value);
      const formattedDate = date.toISOString().replace("T", " ").slice(0, -5);

      emit("update:ShipmentOrder", {
        ...props.ShipmentOrder,
        expectedDeliveryDateAndTime: formattedDate,
      });
    };

    return {
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      LGAInNigeria,
      handlePickUpAddressUpdate,
      handleDropOffAddressUpdate,
      center,
      markerOptions,
      handleExpectedDeliveryDateAndTime,
      value1,
      value2,
      value3,
      shortcuts,
      defaultTime,
    };
  },
});
</script>
<style lang="scss">
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>
<style scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
