<template>
  <div class="card card-flush" :class="className">
    <div class="card-body py-9">
      <div class="row gx-9 h-100">
        <div class="col-sm-6 mb-10 mb-sm-0">
          <div
            class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-400px min-h-sm-100 h-100"
            :style="{
              backgroundSize: '100% 100%',
              backgroundImage: `url(${image})`,
            }"
          ></div>
        </div>

        <div class="col-sm-6">
          <div class="d-flex flex-column h-100">
            <div class="mb-7">
              <div class="d-flex flex-stack mb-6">
                <div class="flex-shrink-0 me-5">
                  <span
                    class="text-gray-400 fs-7 fw-bold me-2 d-block lh-1 pb-1"
                    >Current Delivery</span
                  >
                  <span class="text-gray-400 fs-1 fw-bold">ID : </span>
                  <span class="text-gray-800 fs-1 fw-bold">{{
                    PendingDelivery?.id
                  }}</span>
                </div>

                <span
                  class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                  >{{ PendingDelivery?.status }}</span
                >
              </div>

              <div class="d-flex align-items-center flex-wrap d-grid gap-2">
                <div class="d-flex align-items-center me-5 me-xl-13">
                  <div class="symbol symbol-30px symbol-circle me-3">
                    <img
                      :src="
                        PendingDelivery?.customer.profile
                          ? `${ASSETS_URL + PendingDelivery?.customer.profile}`
                          : getAssetPath('media/avatars/blank.png')
                      "
                      alt="image"
                    />
                  </div>

                  <div class="m-0">
                    <span class="fw-semibold text-gray-400 d-block fs-8">{{
                      PendingDelivery?.customer.type
                    }}</span>
                    <span
                      class="fw-bold text-gray-800 text-hover-primary fs-7"
                      >{{
                        PendingDelivery?.customer.lastName +
                        " " +
                        PendingDelivery?.customer.firstName
                      }}</span
                    >
                  </div>
                </div>
                <div class="d-flex align-items-center me-5 me-xl-13">
                  <div class="symbol symbol-30px symbol-circle me-3">
                    <span class="menu-icon"
                      ><i class="bi bi-phone bi fs-1"></i
                    ></span>
                  </div>

                  <div class="m-0">
                    <span class="fw-semibold text-gray-400 d-block fs-8"
                      >Phone Number</span
                    >
                    <span
                      class="fw-bold text-gray-800 text-hover-primary fs-7"
                      >{{ PendingDelivery?.customer.phone_number }}</span
                    >
                  </div>
                </div>

                <div class="d-flex align-items-center">
                  <div class="symbol symbol-30px symbol-circle me-3">
                    <span class="symbol-label bg-success">
                      <KTIcon
                        icon-name="abstract-41"
                        icon-class="fs-5 text-white"
                      />
                    </span>
                  </div>

                  <div class="m-0">
                    <span class="fw-semibold text-gray-400 d-block fs-8"
                      >Price</span
                    >
                    <span class="fw-bold text-gray-800 fs-7">
                      ₦{{
                        PendingDelivery?.customer_order.total_payment
                          ? new Intl.NumberFormat().format(
                              Number(
                                PendingDelivery?.customer_order.total_payment
                              )
                            )
                          : ""
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <span class="fw-semibold text-gray-600 fs-6 mb-8 d-block">
                {{ PendingDelivery?.customer_order.shipment_description }}
              </span>

              <div class="d-flex">
                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 me-6 mb-3"
                >
                  <span class="fs-6 text-gray-700 fw-bold">{{
                    PendingDelivery?.customer_order.created_at
                      ? formatDate(PendingDelivery?.customer_order.created_at)
                      : ""
                  }}</span>

                  <div class="fw-semibold text-gray-400">Order Placed At</div>
                </div>

                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 mb-3"
                >
                  <span class="fs-6 text-gray-700 fw-bold"> </span>

                  <div class="fw-semibold text-gray-400">Expected By</div>
                </div>
              </div>
              <div class="d-flex">
                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 me-6 mb-3"
                >
                  <span class="fs-6 text-gray-700 fw-bold">{{
                    PendingDelivery?.customer_order.pickup_address
                  }}</span>

                  <div class="fw-semibold text-gray-400">Pickup</div>
                </div>

                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 mb-3"
                >
                  <span class="fs-6 text-gray-700 fw-bold">
                    {{ PendingDelivery?.customer_order.dropoff_address }}
                  </span>

                  <div class="fw-semibold text-gray-400">Expected By</div>
                </div>
              </div>
            </div>

            <!-- <div class="d-flex flex-stack mt-auto bd-highlight">
              <div class="symbol-group symbol-hover flex-nowrap">
                <div class="symbol-group symbol-hover flex-nowrap">
                  <div class="symbol symbol-35px symbol-circle">
                    <img
                      alt="Pic"
                      :src="getAssetPath('media/avatars/300-2.jpg')"
                    />
                  </div>
                  <div class="symbol symbol-35px symbol-circle">
                    <img
                      alt="Pic"
                      :src="getAssetPath('media/avatars/300-3.jpg')"
                    />
                  </div>
                  <div class="symbol symbol-35px symbol-circle">
                    <span
                      class="symbol-label bg-primary text-inverse-primary fw-bold"
                      >S</span
                    >
                  </div>
                </div>
              </div>

              <a
                href="#"
                class="d-flex align-items-center text-primary opacity-75-hover fs-6 fw-semibold"
              >
                View Project
                <KTIcon icon-name="exit-right-corner" icon-class="fs-4 ms-1" />
              </a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

import { defineComponent, type PropType } from "vue";
import __CONSTANTS__ from "@/constants";
import formatDate from "@/core/helpers/formatDate";

export default defineComponent({
  name: "default-dashboard-widget-8",
  components: {},
  props: {
    PendingDelivery: {
      type: Object as PropType<AllTypes.DeliveryType>,
    },
    className: { type: String, required: false },
    image: { type: String, required: true },
  },
  setup() {
    const { ASSETS_URL } = __CONSTANTS__;
    return {
      getAssetPath,
      ASSETS_URL,
      formatDate,
    };
  },
});
</script>
