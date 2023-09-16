<template>
  <div class="modal fade" id="kt_modal_view_admin" ref="viewAdminModalRef" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_admin_header">
          <h2 class="fw-bold">View Vendor Item</h2>

          <div id="kt_modal_add_admin_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <div class="card-body p-10">
          <div class="d-flex flex-center flex-column mb-5">
            <div class="symbol symbol-100px symbol-circle mb-7">
              <img :src="viewVendorItemData.image
                ? `${ASSETS_URL + viewVendorItemData.image}`
                : getAssetPath('media/avatars/blank.png')
                " alt="image" />
            </div>

            <a href="#" class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">
              {{ viewVendorItemData.name }}
            </a>


          </div>

          <div class="d-flex flex-stack fs-4 py-3">
            <div class="fw-bold rotate collapsible" data-bs-toggle="collapse" href="#kt_customer_view_details"
              role="button" aria-expanded="false" aria-controls="kt_customer_view_details">
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
                  <div class="fw-bold mt-5">Item ID</div>
                  <div class="text-gray-600">{{ viewVendorItemData.id }}</div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Date created</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary">
                      {{ formatDate(viewVendorItemData.created_at) }}</a>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Description</div>
                  <div class="text-gray-600">
                    {{ viewVendorItemData.description }}
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">Price</div>
                  <div class="text-gray-600">
                    {{ viewVendorItemData.price }}
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
import formatDate from "@/core/helpers/formatDate";

import type { AllTypes } from "../../../core/types";
import { defaultTypes } from "../../../core/types/defaultData.js";

export default defineComponent({
  name: "add-admin-modal",
  components: {
    // ErrorMessage, Field, VForm
  },
  props: {
    VendorData: {
      type: Object as PropType<AllTypes.VendorItemType>,
    },
  },
  setup(props) {
    const { API_URL, ASSETS_URL } = __CONSTANTS__;

    const viewVendorItemData = computed<AllTypes.VendorItemType>(() => {
      if (props.VendorData && props.VendorData.id) {
        console.log(props.VendorData);
        return {
          ...props.VendorData
        };
      }
      return {
        ...defaultTypes.VendorDataEmpty,
      };
    });
    return {
      getAssetPath,
      viewVendorItemData,
      ASSETS_URL, formatDate
    };
  },
});
</script>
