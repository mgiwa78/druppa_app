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

    <!--begin::Input group-->
    <div>
      <h3 class="mb-5">Enter Pickup Address</h3>
      <div class="fv-row mb-10">
        <label class="fw-bold required fs-5 fw-semobold mb-2">State</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="state"
          class="form-select form-control form-control-lg form-control-solid"
          as="select"
          :modelValue="PickUpAddress?.state"
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
            <ErrorMessage name="state" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <label class="fw-bold required fs-5 fw-semobold mb-2">City</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="city"
          class="form-select form-control form-control-lg form-control-solid"
          as="select"
          :modelValue="PickUpAddress?.city"
          @change="handlePickUpAddressUpdate"
          ><option v-if="PickUpAddress?.state" selected value="">
            Select a State
          </option>
          <template v-if="PickUpAddress?.state">
            <template v-if="citiesInNigeria[PickUpAddress?.state]">
              <option
                v-for="city in citiesInNigeria[PickUpAddress?.state]"
                :key="city.code"
                :value="city.city"
              >
                {{ city.city }}
              </option>
            </template>
            <option v-else :value="PickUpAddress?.state">
              {{ PickUpAddress?.state }}
            </option>
          </template>
          <option v-else selected value="">Select a State First</option>
        </Field>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="city" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
          >LGA</label
        >
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="LGA"
          class="form-select form-control form-control-lg form-control-solid"
          as="select"
          :modelValue="PickUpAddress?.LGA"
          @change="handlePickUpAddressUpdate"
          ><option v-if="PickUpAddress?.state" selected value="">
            Select a State
          </option>
          <template v-if="PickUpAddress?.state">
            <template v-if="LGAInNigeria[PickUpAddress?.state]">
              <option
                v-for="lga in LGAInNigeria[PickUpAddress?.state]"
                :key="lga.code"
                :value="lga.name"
              >
                {{ lga.name }}
              </option>
            </template>
            <option v-else :value="PickUpAddress?.LGA">
              {{ PickUpAddress?.LGA }}
            </option>
          </template>
          <option v-else selected value="">Select a State First</option>
        </Field>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="lga" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
          >Address</label
        >
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          :modelValue="PickUpAddress?.address"
          @change="handlePickUpAddressUpdate"
          name="address"
          rules="required"
        >
          <textarea
            type="text"
            class="form-control form-control-solid"
            placeholder="Address"
            name="address"
            required
            :modelValue="PickUpAddress?.address"
            @input="$emit('textAreaUpdate', $event)"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="address" />
            </div>
          </div>
        </Field>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="lga" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mb-5">Enter DropOff Address</h3>
      <div class="fv-row mb-10">
        <label class="fw-bold required fs-5 fw-semobold mb-2">State</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="state"
          class="form-select form-control form-control-lg form-control-solid"
          as="select"
          :modelValue="DropOffAddress?.state"
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
            <ErrorMessage name="state" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <label class="fw-bold required fs-5 fw-semobold mb-2">City</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="city"
          class="form-select form-control form-control-lg form-control-solid"
          as="select"
          :modelValue="DropOffAddress?.city"
          @change="handleDropOffAddressUpdate"
          ><option v-if="DropOffAddress?.state" selected value="">
            Select a State
          </option>
          <template v-if="DropOffAddress?.state">
            <template v-if="citiesInNigeria[DropOffAddress?.state]">
              <option
                v-for="city in citiesInNigeria[DropOffAddress?.state]"
                :key="city.code"
                :value="city.city"
              >
                {{ city.city }}
              </option>
            </template>
            <option v-else :value="DropOffAddress?.state">
              {{ DropOffAddress?.state }}
            </option>
          </template>
          <option v-else selected value="">Select a State First</option>
        </Field>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="city" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
          >LGA</label
        >
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="LGA"
          class="form-select form-control form-control-lg form-control-solid"
          as="select"
          :modelValue="DropOffAddress?.LGA"
          @change="handleDropOffAddressUpdate"
          ><option v-if="DropOffAddress?.state" selected value="">
            Select a State
          </option>
          <template v-if="DropOffAddress?.state">
            <template v-if="LGAInNigeria[DropOffAddress?.state]">
              <option
                v-for="lga in LGAInNigeria[DropOffAddress?.state]"
                :key="lga.code"
                :value="lga.name"
              >
                {{ lga.name }}
              </option>
            </template>
            <option v-else :value="DropOffAddress?.LGA">
              {{ DropOffAddress?.LGA }}
            </option>
          </template>
          <option v-else selected value="">Select a State First</option>
        </Field>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="lga" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <label class="fw-bold font-weight-bold required fs-5 fw-semobold mb-2"
          >Address</label
        >
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          :modelValue="DropOffAddress?.address"
          @change="handleDropOffAddressUpdate"
          name="address"
          rules="required"
        >
          <textarea
            type="text"
            class="form-control form-control-solid"
            placeholder="Address"
            name="address"
            required
            :modelValue="DropOffAddress?.address"
            @input="$emit('textAreaUpdate', $event)"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="address" />
            </div>
          </div>
        </Field>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="lga" />
          </div>
        </div>
      </div>
    </div>

    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import statesInNigeria from "@/core/data/nigeriaStates";
import citiesInNigeria from "@/core/data/citiesInNigeria";
import LGAInNigeria from "@/core/data/LGAInNigeria";

export default defineComponent({
  name: "step-3",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    PickUpAddress: {
      type: Object as () => {
        address: string;
        city: string;
        state: string;
        LGA: string;
      },
    },
    DropOffAddress: {
      type: Object as () => {
        address: string;
        city: string;
        state: string;
        LGA: string;
      },
    },
  },
  emits: ["update:PickUpAddress", "update:DropOffAddress", "textAreaUpdate"],

  setup(props, { emit }) {
    console.log(props.PickUpAddress);
    const handlePickUpAddressUpdate = (event) => {
      const { name, value } = event.target;
      const newData = { ...props.PickUpAddress, [name]: value };
      emit("update:PickUpAddress", newData);
    };
    const handleDropOffAddressUpdate = (event) => {
      const { name, value } = event.target;
      const newData = { ...props.DropOffAddress, [name]: value };
      emit("update:DropOffAddress", newData);
    };
    return {
      getAssetPath,
      statesInNigeria,
      citiesInNigeria,
      LGAInNigeria,
      handlePickUpAddressUpdate,
      handleDropOffAddressUpdate,
    };
  },
});
</script>
