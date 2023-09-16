<template>
  <div
    class="modal fade"
    id="kt_modal_view_vendor"
    ref="viewVendorModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_admin_header">
          <h2 class="fw-bold">View Vendor Details</h2>

          <div
            id="kt_modal_add_admin_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <div class="card-body p-10">
          <div class="d-flex flex-center flex-column mb-5">
            <div class="symbol symbol-100px symbol-circle mb-7">
              <img
                :src="
                  viewVendorData.profile
                    ? `${ASSETS_URL + viewVendorData.profile}`
                    : getAssetPath('media/avatars/blank.png')
                "
                alt="image"
              />
            </div>

            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ viewVendorData.vendorName }}
            </a>
          </div>

          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_view_details"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_view_details"
            >
              Details
              <span class="ms-2 rotate-180">
                <KTIcon icon-name="down" icon-class="fs-3" />
              </span>
            </div>
          </div>

          <div class="separator separator-dashed my-3"></div>

          <div id="kt_customer_view_details" class="collapse show">
            <div class="py-5 fs-6">
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Vendor Name</div>
                  <div class="text-gray-600">
                    {{ viewVendorData.vendorName }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Email</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary">
                      {{ viewVendorData.email }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Date Created</div>
                  <div class="text-gray-600">
                    {{ viewVendorData.created_at }}
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">Contact</div>
                  <div class="text-gray-600">
                    {{ viewVendorData.contactInformation }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Adderss</div>
                  <div class="text-gray-600">
                    {{ viewVendorData.address }}
                  </div>
                </div>
              </div>
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

export default defineComponent({
  name: "view-vendor-modal",
  components: {},
  props: {
    VendorData: {
      type: Object as PropType<AllTypes.VendorType>,
    },
  },
  setup(props) {
    const { API_URL, ASSETS_URL } = __CONSTANTS__;

    const viewVendorData = computed<AllTypes.VendorType>(() => {
      console.log(props.VendorData);
      if (props.VendorData && props.VendorData.id) {
        return {
          ...props.VendorData,
        };
      }
      return {
        ...defaultTypes.VendorEmpty,
      };
    });
    return {
      getAssetPath,
      viewVendorData,
      ASSETS_URL,
    };
  },
});
</script>
