<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <div class="me-7 mb-4">
          <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
            <img :src="State.userData.profile
              ? `${ASSETS_URL + State.userData.profile}`
              : getAssetPath('media/avatars/blank.png')
              " alt="image" />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px">
            </div>
          </div>
        </div>

        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start flex-wrap">
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center" v-if="user.type !== 'Vendor'">
                <span class="text-gray-800 text-hover-primary fs-2 fw-bold me-1">{{
                  State.userData.firstName + " " + State.userData.lastName
                }}</span>

                <span class="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3">{{ State.userData.type }}</span>
              </div>
              <div class="d-flex align-items-center" v-if="user.type === 'Vendor'">
                <span class="text-gray-800 text-hover-primary fs-2 fw-bold me-1">{{
                  State.userData.vendorName
                }}</span>

                <span class="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3">{{ State.userData.type }}</span>
              </div>

              <div class="d-flex flex-wrap fw-semobold fs-6">
                <span class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                  <KTIcon icon-name="geolocation" icon-class="fs-4 me-1" />
                  {{
                    State.userData.address
                    ? State.userData.address
                    : "Set your delivey address"
                  }}
                </span>
                <span class="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                  <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                  {{ State.userData.email ? user.email : "No email" }}
                </span>
              </div>
              <div class="d-flex flex-wrap fw-semobold">
                <span class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                  <KTIcon icon-name="profile-circle" icon-class="fs-4 me-1" />
                  {{
                    State.userData.gender
                    ? State.userData.gender
                    : "Gender not set"
                  }}
                </span>
              </div>
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <span class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                  <KTIcon icon-name="phone" icon-class="fs-4 me-1" />
                  {{
                    State.userData.phone_number
                    ? State.userData.phone_number
                    : "Phone number not set"
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex overflow-auto h-55px">
        <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap">
          <li class="nav-item">
            <router-link to="/profile/view" class="nav-link text-active-primary me-6" active-class="active">
              Overview
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile/edit" class="nav-link text-active-primary me-6" active-class="active">
              Settings
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/stores/auth";
import __CONSTANTS__ from "@/constants";

export default defineComponent({
  name: "kt-account",
  components: {},
  setup() {
    const AuthStore = useAuthStore();
    const { user } = AuthStore;
    const { ASSETS_URL } = __CONSTANTS__;

    const State = reactive({
      userDataSet: false,
      userData: {} as User,
      setUserData(res: User) {
        this.userData = { ...res };
      },
    });

    onMounted(() => {
      if (user) {
        State.userDataSet = true;
        State.setUserData(user);
      }
    });

    return {
      getAssetPath,
      user,
      State,
      ASSETS_URL,
    };
  },
});
</script>
