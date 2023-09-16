<template>
  <div
    class="modal fade"
    id="kt_modal_view_admin"
    ref="viewAdminModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_admin_header">
          <h2 class="fw-bold">View Admin Profile</h2>

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
                  viewAdminData.profile
                    ? `${ASSETS_URL + viewAdminData.profile}`
                    : getAssetPath('media/avatars/blank.png')
                "
                alt="image"
              />
            </div>

            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
            >
              {{ viewAdminData.firstName + " " + viewAdminData.lastName }}
            </a>

            <div class="fs-5 fw-semobold text-muted mb-6">
              {{ viewAdminData.type }}
            </div>
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
                  <div class="fw-bold mt-5">Account ID</div>
                  <div class="text-gray-600">{{ viewAdminData.id }}</div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Email</div>
                  <div class="text-gray-600">
                    <a href="#" class="text-gray-600 text-hover-primary">
                      {{ viewAdminData.created_at }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Address</div>
                  <div class="text-gray-600">
                    {{ viewAdminData.address }}
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">State</div>
                  <div class="text-gray-600">
                    {{ viewAdminData.state }}
                  </div>
                </div>
                <div class="col-3">
                  <div class="fw-bold mt-5">City</div>
                  <div class="text-gray-600">
                    {{ viewAdminData.city }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Gender</div>
                  <div class="text-gray-600">
                    {{ viewAdminData.gender }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="fw-bold mt-5">Phone Number</div>
                  <div class="text-gray-600">
                    {{ viewAdminData.phone_number }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="fw-bold mt-5">Permissions</div>
                  <div class="text-gray-600">
                    {{
                      viewAdminData.permissions?.length
                        ? viewAdminData.permissions.forEach((perm) => perm)
                        : "No Permissions"
                    }}
                    <ul v-if="viewAdminData.permissions.length">
                      <li
                        v-for="perm in viewAdminData.permissions"
                        :key="perm.id"
                      >
                        {{ perm.permission }}
                      </li>
                    </ul>
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
  name: "add-admin-modal",
  components: {
    // ErrorMessage, Field, VForm
  },
  props: {
    ProfileData: {
      type: Object as PropType<AllTypes.AdminType>,
    },
  },
  setup(props) {
    const { API_URL, ASSETS_URL } = __CONSTANTS__;

    const viewAdminData = computed(() => {
      if (props.ProfileData && props.ProfileData.id) {
        console.log(props.ProfileData);
        return {
          firstName: props.ProfileData.firstName || "",
          lastName: props.ProfileData.lastName || "",
          email: props.ProfileData.email || "",
          created_at: props.ProfileData.created_at || "",
          title: props.ProfileData.title || "",
          city: props.ProfileData.city || "",
          profile: props.ProfileData.profile || "",
          gender: props.ProfileData.gender || "",
          type: props.ProfileData.type || "",
          state: props.ProfileData.state || "",
          phone_number: props.ProfileData.phone_number || "",
          address: props.ProfileData.address || "",
          id: props.ProfileData.id || "",
          permissions: props.ProfileData.permissions || [
            defaultTypes.PermissionEmpty,
          ],
        };
      }
      return {
        ...defaultTypes.AdminEmpty,
      };
    });
    return {
      getAssetPath,
      viewAdminData,
      ASSETS_URL,
    };
  },
});
</script>
