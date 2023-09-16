<template>
  <div
    class="modal fade"
    id="kt_modal_view_inventory"
    ref="viewInventoryModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_inventory_header">
          <h2 class="fw-bold">View Inventory Profile</h2>

          <div
            id="kt_modal_add_inventory_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <div class="card-body p-10">
          <div class="d-flex flex-center flex-column mb-5">
            <div class="symbol symbol-100px mb-7">
              <img
                :src="
                  viewInventoryData.image
                    ? `${ASSETS_URL + viewInventoryData.image}`
                    : getAssetPath('media/avatars/blank.png')
                "
                alt="image"
              />
            </div>
            <div class="fw-bold mt-5">Freight ID</div>

            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ viewInventoryData.id }}
            </a>

            <!-- <div class="fs-5 fw-semobold text-muted mb-6">
              {{ viewInventoryData.type }}
            </div> -->
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
                  <div class="fw-bold mt-5">Warehouse Name</div>
                  <div class="text-gray-600">
                    {{ viewInventoryData.warehouse?.name }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Warehouse Name</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary">
                      {{ viewInventoryData.warehouse?.location }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Product description</div>
                  <div class="text-gray-600">
                    {{ viewInventoryData.product_description }}
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">Quantity</div>
                  <div class="text-gray-600">
                    {{ viewInventoryData.quantity }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Date Added</div>
                  <div class="text-gray-600">
                    {{ viewInventoryData.created_at }}
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
  name: "add-inventory-modal",
  components: {
    // ErrorMessage, Field, VForm
  },
  props: {
    InventoryData: {
      type: Object as PropType<AllTypes.InventoryType>,
    },
  },
  setup(props) {
    const { API_URL, ASSETS_URL } = __CONSTANTS__;

    const viewInventoryData = computed(() => {
      console.log(props.InventoryData);

      if (props.InventoryData && props.InventoryData.id) {
        return {
          customer: props.InventoryData.customer || "",
          warehouse: defaultTypes.WarehouseEmpty,
          id: props.InventoryData.id || "",
          product_description: props.InventoryData.product_description || "",
          quantity: props.InventoryData.quantity || "",
          created_at: props.InventoryData.created_at || "",
          image: props.InventoryData.image || "",
        };
      }
      return {
        ...defaultTypes.InventoryEmpty,
      };
    });
    return {
      getAssetPath,
      viewInventoryData,
      ASSETS_URL,
    };
  },
});
</script>
