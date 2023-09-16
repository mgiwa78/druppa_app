<template>
  <div
    class="modal fade"
    id="kt_modal_view_customer_order"
    ref="viewDeliveryModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_delivery_header">
          <h2 class="fw-bold">QR Code</h2>

          <div
            id="kt_modal_add_delivery_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <div class="card-body p-10">
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_view_details"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_view_details"
            >
              PickUp
              <span class="ms-2 rotate-180">
                <KTIcon icon-name="down" icon-class="fs-3" />
              </span>
            </div>
          </div>

          <div id="kt_customer_view_details" class="collapse show">
            <div class="py-5 fs-6">
              <qrcode-vue
                :value="
                  'http://localhost:5173/#/verifyPickup/' +
                  CustomerOrderData?.delivery.tracking_number
                "
                :size="300"
                level="H"
              />
            </div>
          </div>
          <ShareNetwork
            network="whatsapp"
            key="whatsapp"
            :style="{ backgroundColor: '#25d366' }"
            url="url"
            title="title"
            description="description"
            quote="quote"
            hashtags="hashtags"
            twitterUser="twitterUser"
          >
            <i class="fab fah fa-lg fa-wordpress"></i>
            <span>Whatsapp</span>
          </ShareNetwork>
        </div>
        <div class="card-body p-10">
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_order_drop_off"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_order_drop_off"
            >
              DropOff
              <span class="ms-2 rotate-180">
                <KTIcon icon-name="down" icon-class="fs-3" />
              </span>
            </div>
          </div>

          <div id="kt_customer_order_drop_off" class="collapse show">
            <div class="py-5 fs-6">
              <qrcode-vue
                :value="
                  'http://localhost:5173/#/Verifydropoff/' +
                  CustomerOrderData?.delivery.tracking_number
                "
                :size="300"
                level="H"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref, type PropType } from "vue";
import __CONSTANTS__ from "@/constants";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";
import formatDate from "@/core/helpers/formatDate";
import QrcodeVue from "qrcode.vue";

export default defineComponent({
  name: "add-delivery-modal",
  components: {
    // ErrorMessage, Field, VForm
    QrcodeVue,
  },
  props: {
    CustomerOrderData: {
      type: Object as PropType<AllTypes.OrderType>,
    },
  },
  setup(props) {
    console.log(props.CustomerOrderData);
    const { ASSETS_URL } = __CONSTANTS__;
    const QrValue = ref<string>("https://example.com");

    const CustomerViewDeliveryData = computed(() => {
      console.log(props.CustomerOrderData);

      if (props.CustomerOrderData && props.CustomerOrderData.id) {
        return {
          ...props.CustomerOrderData,
        };
      }
      return {
        ...defaultTypes.OrderEmpty,
      };
    });
    return {
      getAssetPath,
      CustomerViewDeliveryData,
      ASSETS_URL,
      formatDate,
      QrValue,
    };
  },
});
</script>
