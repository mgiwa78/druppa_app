<template>
  <!--begin::Navbar-->
  <div class="">
    <!--begin::Card-->
    <div class="card mb-5 mb-xl-8">
      <!--begin::Card body-->
      <div class="card-body pt-9">
        <!--begin::Summary-->
        <div class="d-flex flex-center flex-column">
          <!--begin::Avatar-->
          <div class="symbol symbol-100px symbol-circle mb-7">
            <img :src="getAssetPath('media/avatars/300-1.jpg')" alt="image" />
          </div>
          <!--end::Avatar-->

          <!--begin::Name-->
          <a
            href="#"
            class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
          >
            Max Smith
          </a>
          <!--end::Name-->

          <!--begin::Position-->
          <div class="fs-5 fw-semobold text-muted mb-6">Software Enginer</div>
          <!--end::Position-->

          <!--begin::Info-->

          <!--end::Info-->
        </div>
        <!--end::Summary-->

        <!--begin::Details toggle-->
        <div class="d-flex flex-stack fs-4">
          <div class="fw-bold rotate collapsible">Details</div>
        </div>
        <!--end::Details toggle-->

        <div class="separator separator-dashed my-3"></div>

        <!--begin::Details content-->
        <div id="kt_customer_view_details" class="collapse show">
          <div class="py-5 fs-6">
            <!--begin::Badge-->
            <div class="badge badge-light-info d-inline">Active</div>
            <!--begin::Badge-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Account ID</div>
            <div class="text-gray-600">ID-45453423</div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="d-flex flex-stack">
              <div class="d-flex py-5">
                <div class="d-flex flex-column">
                  <a href="#" class="fs-5 text-dark text-hover-primary fw-bold"
                    >Update Profile to Active</a
                  >
                </div>
              </div>

              <div class="d-flex justify-content-end">
                <!--begin::Switch-->
                <label
                  class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
                >
                  <!--begin::Input-->
                  <input
                    class="form-check-input"
                    name="google"
                    type="checkbox"
                    value="1"
                    id="kt_modal_connected_accounts_google"
                  />
                  <!--end::Input-->

                  <!--begin::Label-->
                  <span
                    class="form-check-label fw-semobold text-muted"
                    for="kt_modal_connected_accounts_google"
                  ></span>
                  <!--end::Label-->
                </label>
                <!--end::Switch-->
              </div>
            </div>
          </div>
        </div>
        <!--end::Details content-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Card-->

    <!--begin::Connected Accounts-->

    <!--end::Connected Accounts-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAssetPath } from "@/core/helpers/assets.ts";
export default defineComponent({
  name: "driver-dashboard",
  components: {},
  setup() {
    type Metric = {
      icon: string;
      title: string;
      number: number;
    };

    type Metrics = {
      title: string;
      colour: string;
      metrics: Array<Metric>;
    };

    return { getAssetPath };
  },
});
</script>
