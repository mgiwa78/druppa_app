<template>
  <!--begin::Timeline item-->
  <div class="timeline-item">
    <!--begin::Timeline line-->
    <div class="timeline-line w-40px"></div>
    <!--end::Timeline line-->

    <!--begin::Timeline icon-->
    <div class="timeline-icon symbol symbol-circle symbol-40px me-4">
      <div class="symbol-label bg-light">
        <KTIcon icon-name="message-text-2" icon-class="fs-2 text-gray-500" />
      </div>
    </div>
    <!--end::Timeline icon-->

    <!--begin::Timeline content-->
    <div class="timeline-content mb-10 mt-n1">
      <!--begin::Timeline heading-->
      <div class="pe-3 mb-5">
        <!--begin::Title-->
        <div class="fs-5 fw-bold mb-2">
          {{ data?.description }}
        </div>
        <!--end::Title-->

        <!--begin::Description-->
        <div class="d-flex align-items-center mt-1 fs-6">
          <!--begin::Info-->

          <div class="text-muted me-2 fs-7">
            By
            {{
              !isVendor(data?.user) &&
              data?.user.firstName + " " + data?.user.lastName
            }}
            {{ isVendor(data?.user) && data?.user.vendorName }}
          </div>
          <!--end::Info-->

          <!--begin::User-->
          <div
            class="symbol symbol-circle symbol-25px"
            data-bs-toggle="tooltip"
            data-bs-boundary="window"
            data-bs-placement="top"
            title="Nina Nilson"
          >
            {{
              !isVendor(data?.user) &&
              data?.user.firstName + " " + data?.user.lastName
            }}
            {{ isVendor(data?.user) && data?.user.vendorName }}
            <img
              :src="
                data?.user.profile
                  ? `${ASSETS_URL + data?.user.profile}`
                  : getAssetPath('media/avatars/blank.png')
              "
              alt="image"
            />
          </div>
          <!--end::User-->
        </div>
        <!--end::Description-->
      </div>
      <!--end::Timeline heading-->

      <!--begin::Timeline details-->
      <div class="overflow-auto pb-5">
        <!--begin::Record-->
        <div
          class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5"
        >
          <!--begin::Title-->
          <a
            href="#"
            class="fs-5 text-dark text-hover-primary fw-semobold w-375px min-w-200px"
            >{{ data?.description }}</a
          >
          <!--end::Title-->

          <!--begin::Label-->
          <div class="min-w-175px pe-2">
            <span class="badge badge-light text-muted">{{
              data?.created_at ? formatDate(data?.created_at) : ""
            }}</span>
          </div>
          <!--end::Label-->

          <!--begin::Users-->
          <div
            class="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2"
          >
            <!--begin::User-->

            <!--end::User-->

            <!--begin::User-->
            <div class="symbol symbol-circle symbol-25px">
              <img
                :src="
                  data?.user.profile
                    ? `${ASSETS_URL + data?.user.profile}`
                    : getAssetPath('media/avatars/blank.png')
                "
                alt="img"
              />
            </div>
            <!--end::User-->

            <!--begin::User-->
            <div class="symbol symbol-circle symbol-25px">
              <div
                class="symbol-label fs-8 fw-semobold bg-primary text-inverse-primary"
              >
                {{ !isVendor(data?.user) && data?.user.lastName[0] }}
                {{ isVendor(data?.user) && data?.user.vendorName[0] }}
              </div>
            </div>
            <!--end::User-->
          </div>
          <!--end::Users-->

          <!-- <div class="min-w-125px pe-2">
            <span class="badge badge-light-primary">In Progress</span>
          </div>

          <a href="#" class="btn btn-sm btn-light btn-active-light-primary"
            >View</a
          > -->
          <!--end::Action-->
        </div>
        <!--end::Record-->

        <!--begin::Record-->

        <!--end::Record-->
      </div>
      <!--end::Timeline details-->
    </div>
    <!--end::Timeline content-->
  </div>
  <!--end::Timeline item-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, type PropType } from "vue";
import type { AllTypes } from "../../core/types";
import { defaultTypes } from "../../core/types/defaultData.js";

import formatDate from "@/core/helpers/formatDate";
import __CONSTANTS__ from "@/constants";

export default defineComponent({
  name: "item-1",
  components: {},
  props: {
    data: {
      type: Object as PropType<AllTypes.ActivityType>,
    },
  },
  setup() {
    const { ASSETS_URL } = __CONSTANTS__;

    const isVendor = (user): user is AllTypes.VendorType => {
      return user && user.type === "Vendor";
    };
    return {
      getAssetPath,
      formatDate,
      ASSETS_URL,
      isVendor,
    };
  },
});
</script>
