<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true">
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->
        <div class="symbol symbol-50px me-5">
          <img alt="Logo" :src="State.userData.profile
            ? `${ASSETS_URL + State.userData.profile}`
            : getAssetPath('media/avatars/blank.png')
            " />
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5">
            {{
              State.userData?.type !== "Vendor"
              ? State.userData.firstName + " " + State.userData.lastName
              : State.userData.vendorName
            }}
          </div>
          <span
            class="btn btn-sm btn-light-success fw-semobold text-muted text-hover-primary fs-7 fw-bold ms-2 fs-8 py-1 px-3">{{
              State.userData.type }}</span>
          <span class="fw-semobold text-muted text-hover-primary fs-7">{{
            State.userData.email
          }}</span>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <div class="menu-item px-5">
      <router-link to="/profile/view" class="menu-link px-5">
        My Profile
      </router-link>
    </div>

    <!-- 
    <div class="menu-item px-5">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        <span class="menu-text">My Projects</span>
        <span class="menu-badge">
          <span class="badge badge-light-danger badge-circle fw-bold fs-7"
            >3</span
          >
        </span>
      </router-link>
    </div>

    <div
      class="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
    >
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        <span class="menu-title">My Subscription</span>
        <span class="menu-arrow"></span>
      </router-link>

      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <div class="menu-item px-3">
          <router-link to="/pages/profile/overview" class="menu-link px-5">
            Referrals
          </router-link>
        </div>

        <div class="menu-item px-3">
          <router-link to="/pages/profile/overview" class="menu-link px-5">
            Billing
          </router-link>
        </div>

        <div class="menu-item px-3">
          <router-link to="/pages/profile/overview" class="menu-link px-5">
            Payments
          </router-link>
        </div>

        <div class="menu-item px-3">
          <router-link
            to="/pages/profile/overview"
            class="menu-link d-flex flex-stack px-5"
          >
            Statements

            <i
              class="fas fa-exclamation-circle ms-2 fs-7"
              data-bs-toggle="tooltip"
              title="View your statements"
            ></i>
          </router-link>
        </div>

        <div class="separator my-2"></div>

        <div class="menu-item px-3">
          <div class="menu-content px-3">
            <label
              class="form-check form-switch form-check-custom form-check-solid"
            >
              <input
                class="form-check-input w-30px h-20px"
                type="checkbox"
                value="1"
                checked
                name="notifications"
              />
              <span class="form-check-label text-muted fs-7">
                Notifications
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="menu-item px-5">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        My Statements
      </router-link>
    </div>

    <div class="separator my-2"></div>



    <div class="menu-item px-5 my-1">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        Account Settings
      </router-link>
    </div> -->

    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import type { User } from "@/stores/auth";
import __CONSTANTS__ from "@/constants";
import { useStaticsStore } from "@/stores/statics";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const AuthStore = useAuthStore();
    const StaticsStore = useStaticsStore();
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
    const router = useRouter();

    const signOut = () => {
      AuthStore.resetStore()
      StaticsStore.resetStore()

      router.push({ name: "sign-in" });
    };




    return {
      signOut,
      getAssetPath,
      State,
      ASSETS_URL,
    };
  },
});
</script>
