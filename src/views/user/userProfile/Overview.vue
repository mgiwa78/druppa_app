<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <router-link
        to="/account/settings"
        class="btn btn-primary align-self-center"
        >Edit Profile</router-link
      >
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Full Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            State.userData.first_name + " " + State.userData.last_name
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->

      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">
          Contact Phone
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            v-tooltip
            title="Phone number must be active"
          ></i>
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{
            State.userData.phone ? State.userData.phone : "No Phone Number"
          }}</span>

          <!-- <span class="badge badge-success">Verified</span> -->
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Email</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{ State.userData.email }}</span>
          <span class="badge badge-danger mx-3">
            {{
              State.userData.email_verified_at ? "Verified" : "Not Verified"
            }}</span
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->

      <!--end::Input group-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->

  <!--begin::Row-->

  <!--end::Row-->

  <!--end::Row-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, reactive } from "vue";

import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "account-overview",
  components: {},

  setup() {
    const AuthStore = useAuthStore();
    const { user } = AuthStore;
    type UserData = {
      first_name?: string;
      last_name?: string;
      phone?: Number;
      bio?: Number;
      address?: string;
      gender?: string;
      state?: string;
      institure?: string;
      edu_role?: string;
      faculty?: string;
      dept?: string;
      lawclinic?: string;
      affiliate?: string;
      created_at?: string;
      email?: string;
      email_verified_at?: boolean;
    };

    const State = reactive({
      userDataSet: false,
      userData: {} as UserData,
      setUserData(res: UserData) {
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
      user,
      State,
      getAssetPath,
    };
  },
});
</script>
