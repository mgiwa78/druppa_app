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
      <router-link to="/profile/edit" class="btn btn-primary align-self-center"
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
            State.userData.firstName + " " + State.userData.lastName
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
            State.userData.phone_number
              ? State.userData.phone_number
              : "No Phone Number"
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
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">
          Address
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            v-tooltip
            title="Address must be valid"
          ></i>
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{
            State.userData.address ? State.userData.address : "No Address"
          }}</span>

          <!-- <span class="badge badge-success">Verified</span> -->
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> Gender </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2 capitalize">{{
            State.userData.gender ? State.userData.gender : "No Gender"
          }}</span>

          <!-- <span class="badge badge-success">Verified</span> -->
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> State </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{
            State.userData.state ? State.userData.state : "No State"
          }}</span>

          <!-- <span class="badge badge-success">Verified</span> -->
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
import type { User } from "@/stores/auth";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "account-overview",
  components: {},

  setup() {
    const AuthStore = useAuthStore();
    const { user } = AuthStore;

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
      user,
      State,
      getAssetPath,
    };
  },
});
</script>
