<template>
  <div
    class="modal fade"
    id="kt_modal_view_delivery"
    ref="viewDeliveryModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_delivery_header">
          <h2 class="fw-bold">View Delivery Profile</h2>

          <div
            id="kt_modal_add_delivery_close"
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
                  CustomerViewDeliveryData.image
                    ? `${ASSETS_URL + CustomerViewDeliveryData.image}`
                    : getAssetPath('media/avatars/blank.png')
                "
                alt="image"
              />
            </div>

            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ CustomerViewDeliveryData.tracking_number }}
            </a>

            <!-- <div class="fs-5 fw-semobold text-muted mb-6">
              {{ CustomerViewDeliveryData.type }}
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
                  <div class="fw-bold mt-5">Driver Name</div>
                  <div class="text-gray-600">
                    {{
                      CustomerViewDeliveryData.driver?.firstName +
                      " " +
                      CustomerViewDeliveryData.driver?.lastName
                    }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Driver Name</div>
                  <div class="text-gray-600">
                    {{
                      CustomerViewDeliveryData.driver?.firstName +
                      " " +
                      CustomerViewDeliveryData.driver?.lastName
                    }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Origin</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary">
                      {{ CustomerViewDeliveryData.origin }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Destination</div>
                  <div class="text-gray-600">
                    {{ CustomerViewDeliveryData.destination }}
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">Pickup date</div>
                  <div class="text-gray-600">
                    {{ formatDate(CustomerViewDeliveryData.pickup_date) }}
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">Delivery date</div>
                  <div class="text-gray-600">
                    {{ formatDate(CustomerViewDeliveryData.delivery_date) }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">status</div>
                  <div class="text-gray-600">
                    {{ CustomerViewDeliveryData.status }}
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
import { computed, defineComponent, ref } from "vue";
import __CONSTANTS__ from "@/constants";
import type { DeliveryType } from "@/core/types/Deliveries";
import { DeliveryEmpty } from "@/core/types/Deliveries";
import formatDate from "@/core/helpers/formatDate";

export default defineComponent({
  name: "add-delivery-modal",
  components: {
    // ErrorMessage, Field, VForm
  },
  props: {
    CustomerDeliveryData: {
      type: Object as () => {
        customer: {
          firstName: string;
          lastName: string;
        };
        id: string;
        customer_order_id: string;
        tracking_number: number;
        status: string;
        state: string;
        city: string;
        origin: string;
        destination: string;
        pickup_date: string;
        delivery_date: string;
        driver: {
          id: number;
          created_at: string;
          updated_at: string;
          firstName: string;
          phone_number: string;
          lastName: string;
          email: string;
          profile: null;
          city: string;
          state: string;
          type: string;
          title: string;
          gender: string;
          licenseNumber: string;
          licenseExpiration: string;
          vehicleMake: string;
          vehicleModel: string;
          licensePlate: string;
          insurance: string;
        };
        image: string;
      },
    },
  },
  setup(props) {
    const { API_URL, ASSETS_URL } = __CONSTANTS__;

    const CustomerViewDeliveryData = computed(() => {
      console.log(props.CustomerDeliveryData);

      if (props.CustomerDeliveryData && props.CustomerDeliveryData.id) {
        return {
          customer: props.CustomerDeliveryData.customer,
          id: props.CustomerDeliveryData.id || "",
          customer_order_id: props.CustomerDeliveryData.customer_order_id || "",
          tracking_number: props.CustomerDeliveryData.tracking_number || "",
          status: props.CustomerDeliveryData.status || "",
          state: props.CustomerDeliveryData.state || "",
          destination: props.CustomerDeliveryData.destination || "",
          city: props.CustomerDeliveryData.city || "",
          origin: props.CustomerDeliveryData.origin || "",
          pickup_date: props.CustomerDeliveryData.pickup_date || "",
          delivery_date: props.CustomerDeliveryData.delivery_date || "",
          driver: {
            id: props.CustomerDeliveryData.id || "",
            created_at: props.CustomerDeliveryData.driver.created_at || "",
            updated_at: props.CustomerDeliveryData.driver.updated_at || "",
            firstName: props.CustomerDeliveryData.driver.firstName || "",
            lastName: props.CustomerDeliveryData.driver.lastName || "",
            phone_number: props.CustomerDeliveryData.driver.phone_number || "",
            email: props.CustomerDeliveryData.driver.email || "",
            profile: props.CustomerDeliveryData.driver.profile || "",
            city: props.CustomerDeliveryData.driver.city || "",
            state: props.CustomerDeliveryData.driver.state || "",
            type: props.CustomerDeliveryData.driver.type || "",
            title: props.CustomerDeliveryData.driver.title || "",
            gender: props.CustomerDeliveryData.driver.gender || "",
            licenseNumber:
              props.CustomerDeliveryData.driver.licenseNumber || "",
            licenseExpiration:
              props.CustomerDeliveryData.driver.licenseExpiration || "",
            vehicleMake: props.CustomerDeliveryData.driver.vehicleMake || "",
            vehicleModel: props.CustomerDeliveryData.driver.vehicleModel || "",
            licensePlate: props.CustomerDeliveryData.driver.licensePlate || "",
            insurance: props.CustomerDeliveryData.driver.insurance || "",
          },
          image: props.CustomerDeliveryData.image || "",
        };
      }
      return {
        ...DeliveryEmpty,
      };
    });
    return {
      getAssetPath,
      CustomerViewDeliveryData,
      ASSETS_URL,
      formatDate,
    };
  },
});
</script>
