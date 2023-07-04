<template>
  <div class="card pb-8 pt-5 mb-xl-8">
    <div class="card-body pt-9">
      <div class="d-flex flex-center flex-column">
        <div class="symbol symbol-100px symbol-circle mb-7">
          <img
            :src="
              user.profile
                ? `${ASSETS_URL + user.profile}`
                : getAssetPath('media/avatars/blank.png')
            "
            alt="image"
          />
        </div>

        <span class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">
          {{ user.firstName + " " + user.lastName }}
        </span>

        <div class="fs-5 fw-semobold text-muted mb-6">{{ user.type }}</div>
      </div>

      <div class="d-flex flex-stack fs-4">
        <div class="fw-bold rotate collapsible">Details</div>
      </div>

      <div class="separator separator-dashed my-3"></div>

      <div id="kt_customer_view_details" class="collapse show">
        <div class="py-5 fs-6">
          <div class="badge badge-light-info d-inline">
            {{ isActive ? "Active" : "In-Active" }}
          </div>
          <div class="fw-bold mt-5">Account ID</div>
          <div class="text-gray-600">{{ user.id }}</div>
          <div class="d-flex flex-stack">
            <div class="d-flex py-5">
              <div class="d-flex flex-column">
                <span class="fs-5 text-dark text-hover-primary fw-bold"
                  >Update Profile
                  {{ isActive ? "from active" : "to active" }}</span
                >
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <label
                class="form-check form-switch form-switch-sm form-check-custom form-check-solid"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="driveisActive"
                  id="kt_modal_connected_accounts_google"
                />

                <span
                  class="form-check-label fw-semobold text-muted"
                  for="kt_modal_connected_accounts_google"
                ></span>
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
              data-bs-toggle="modal"
              data-bs-target="#kt_update_is_active_modal"
              class="btn btn-icon w-100 btn-warning btn-md me-1"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <UpdateProfileModal :newState="driveisActive"></UpdateProfileModal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getAssetPath } from "@/core/helpers/assets";
import __CONSTANTS__ from "@/constants";
import { useAuthStore } from "@/stores/auth";
import UpdateProfileModal from "@/components/driver/form/UpdateProfileModal.vue";

export default defineComponent({
  name: "driver-dashboard",
  components: { UpdateProfileModal },
  setup() {
    const AuthStore = useAuthStore();
    const { API_URL, ASSETS_URL } = __CONSTANTS__;
    const { user, isActive } = AuthStore;
    const driveisActive = ref<any>(isActive);

    return { getAssetPath, user, isActive, driveisActive, API_URL, ASSETS_URL };
  },
});
</script>
