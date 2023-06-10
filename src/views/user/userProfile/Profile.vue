<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img
              :src="
                State.userData.profile
                  ? `${ASSETS_URL + State.userData.profile}`
                  : getAssetPath('media/avatars/blank.png')
              "
              alt="image"
            />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                  >{{
                    State.userData.firstName + " " + State.userData.lastName
                  }}</a
                >

                <span
                  class="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3"
                  >{{ State.userData.type }}</span
                >
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <KTIcon icon-name="profile-circle" icon-class="fs-4 me-1" />
                  {{
                    State.userData.gender
                      ? State.userData.gender
                      : "Gender not set"
                  }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <KTIcon icon-name="geolocation" icon-class="fs-4 me-1" />
                  {{
                    State.userData.address
                      ? State.userData.address
                      : "Set your delivey address"
                  }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                >
                  <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                  {{ State.userData.email ? user.email : "No email" }}
                </a>
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->

            <!--begin::Actions-->

            <!--end::Actions-->
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <!-- <div class="d-flex flex-column flex-grow-1 pe-8">
              <div class="d-flex flex-wrap">
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <div class="d-flex align-items-center">
                    <KTIcon
                      icon-name="arrow-up"
                      icon-class="fs-3 text-success me-2"
                    />
                    <div class="fs-2 fw-bold">0₦‎</div>
                  </div>

                  <div class="fw-semobold fs-6 text-gray-400">Spendings</div>
                </div>

                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <div class="d-flex align-items-center">
                    <KTIcon
                      icon-name="arrow-down"
                      icon-class="fs-3 text-danger me-2"
                    />
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="75"
                    >
                      0
                    </div>
                  </div>

                  <div class="fw-semobold fs-6 text-gray-400">Projects</div>
                </div>

                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <div class="d-flex align-items-center">
                    <KTIcon
                      icon-name="arrow-up"
                      icon-class="fs-3 text-success me-2"
                    />
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      60%
                    </div>
                  </div>

                  <div class="fw-semobold fs-6 text-gray-400">Success Rate</div>
                </div>
              </div>
            </div> -->

            <div
              class="d-flex align-items-center w-200px w-sm-300px flex-column mt-3"
            >
              <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                <span class="fw-semobold fs-6 text-gray-400"
                  >Profile Compleation</span
                >
                <span class="fw-bold fs-6">50%</span>
              </div>

              <div class="h-5px mx-3 w-100 bg-light mb-3">
                <div
                  class="bg-success rounded h-5px"
                  role="progressbar"
                  style="width: 50%"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <!--end::Progress-->
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile/view"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Overview
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile/edit"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Settings
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
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
