import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import Swal from "sweetalert2";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import ErrorHandler from "@/core/helpers/errorHandler";

import type { AllTypes } from "@/core/types";

const AuthStore = useAuthStore();
const { token } = AuthStore;

const { API_URL } = __CONSTANTS__;

interface driverStats {
  total_deliveries: string;
  total_distance: string;
  performance: number;
  isSet: boolean;
}

interface UserActivity {
  isSet: boolean;
  activities: Array<AllTypes.ActivityType>;
}

interface adminStats {
  admin: string;
  customer: string;
  inActiveDrivers: string;
  activeDrivers: string;
  pendingCustomerOrders: string;
  customerOrders: string;
  transitCustomerOrders: string;
  driver: string;
  isSet: boolean;
}

const useStaticsStore = defineStore("statics", () => {
  const adminStatsPersist = useLocalStorage("adminStatsPersist", "");
  const userActivityPersist = useLocalStorage("userActivityPersist", "");
  const allUserActivityPersist = useLocalStorage("allUserActivityPersist", "");

  const driverStats = ref<driverStats>({
    total_deliveries: "0",
    total_distance: "0",
    performance: 0,
    isSet: false,
  });

  const adminStats = computed<adminStats>(() =>
    adminStatsPersist.value
      ? JSON.parse(adminStatsPersist.value)
      : {
          admin: "0",
          driver: "0",
          customer: "0",
          inActiveDrivers: "0",
          activeDrivers: "0",
          pendingCustomerOrders: "0",
          transitCustomerOrders: "0",
          customerOrders: "0",
          isSet: false,
        }
  );
  const userActivity = computed<UserActivity>(() =>
    userActivityPersist.value
      ? JSON.parse(userActivityPersist.value)
      : { isSet: false, activities: [] }
  );

  const allUserActivity = computed<UserActivity>(() =>
    allUserActivityPersist.value
      ? JSON.parse(allUserActivityPersist.value)
      : { isSet: false, activities: [] }
  );

  watch(adminStats, () => {
    adminStatsPersist.value = JSON.stringify(
      adminStats.value
        ? adminStats.value
        : {
            admin: "0",
            driver: "0",
            customer: "0",
            inActiveDrivers: "0",
            activeDrivers: "0",
            pendingCustomerOrders: "0",
            transitCustomerOrders: "0",
            customerOrders: "0",
            isSet: false,
          }
    );
  });
  function resetStore() {
    adminStatsPersist.value = "";
    userActivityPersist.value = "";
    allUserActivityPersist.value = "";
  }

  watch(userActivity, () => {
    userActivityPersist.value = JSON.stringify(
      userActivity.value ? userActivity.value : { isSet: false, activities: [] }
    );
  });
  watch(allUserActivity, () => {
    allUserActivityPersist.value = JSON.stringify(
      allUserActivity.value
        ? allUserActivity.value
        : { isSet: false, activities: [] }
    );
  });

  const UpdateAdminStats = async () => {
    const adminStatics = await fetch("adminStatics");

    adminStats.value.customer = adminStatics.customer;
    adminStats.value.admin = adminStatics.admin;
    adminStats.value.driver = adminStatics.driver;
    adminStats.value.inActiveDrivers = adminStatics.inActiveDrivers;
    adminStats.value.activeDrivers = adminStatics.activeDrivers;
    adminStats.value.customerOrders = adminStatics.customerOrders;
    adminStats.value.pendingCustomerOrders = adminStatics.pendingCustomerOrders;
    adminStats.value.transitCustomerOrders = adminStatics.transitCustomerOrders;

    adminStatsPersist.value = JSON.stringify(adminStatics);

    if (
      adminStats.value.customer &&
      adminStats.value.admin &&
      adminStats.value.driver &&
      adminStats.value.inActiveDrivers &&
      adminStats.value.activeDrivers &&
      adminStats.value.customerOrders &&
      adminStats.value.pendingCustomerOrders &&
      adminStats.value.transitCustomerOrders
    )
      return (adminStats.value.isSet = true);
  };

  const UpdateDriverStats = async () => {
    try {
      const driverStatics = await fetch("driverStatics");

      driverStats.value.total_deliveries = driverStatics.total_deliveries;
      driverStats.value.total_distance = driverStatics.total_distance;
      driverStats.value.performance = driverStatics.performance;
      if (
        driverStats.value.total_deliveries &&
        driverStats.value.total_distance &&
        driverStats.value.performance
      )
        return (driverStats.value.isSet = true);
    } catch (error: any) {
      if (error.response.data.message === "Unauthenticated.") {
        Swal.fire({
          text: "Unauthenticated",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Close",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
        // router.push({ name: "sign-in" });
      } else if (error.response.data.message) {
        return Swal.fire({
          text: error.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Error Fetching Data!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      } else {
        return Swal.fire({
          text: error.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Error Fetching Data!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }
    }
  };

  const UpdateUserActivity = async () => {
    try {
      const RESPONSE = await fetch("activity");

      userActivity.value.activities = RESPONSE;
      userActivityPersist.value = JSON.stringify(
        userActivity.value
          ? userActivity.value
          : { isSet: false, activities: [] }
      );
      if (userActivity.value.activities)
        return (userActivity.value.isSet = true);
    } catch (error: any) {
      ErrorHandler(error);
    }
  };
  const UpdateAllActivity = async () => {
    try {
      const RESPONSE = await fetch("activity/all");

      allUserActivity.value.activities = RESPONSE;
      allUserActivityPersist.value = JSON.stringify(
        allUserActivity.value
          ? allUserActivity.value
          : { isSet: false, activities: [] }
      );
      console.log(RESPONSE);
      if (allUserActivity.value.activities)
        return (allUserActivity.value.isSet = true);
    } catch (error: any) {
      ErrorHandler(error);
    }
  };

  const fetch = async (route: string) => {
    const RESPONSE: any = await axios
      .get(API_URL + `${route}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated.") {
          Swal.fire({
            text: "Unauthenticated",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Close",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
          document.location.reload();
        } else if (error.response.data.message) {
          return Swal.fire({
            text: error.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Error Fetching Data!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        } else {
          return Swal.fire({
            text: error.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Error Fetching Data!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        }
      });
    console.log(RESPONSE.data);
    return RESPONSE.data;
  };
  // function verifyAuth() {
  //   if (JwtService.getToken()) {
  //     ApiService.setHeader();
  //     ApiService.post("verify_token", { api_token: JwtService.getToken() })
  //       .then(({ data }) => {
  //         setAuth(data);
  //       })
  //       .catch(({ response }) => {
  //         setError(response.data.errors);
  //         purgeAuth();
  //       });
  //   } else {
  //     purgeAuth();
  //   }
  // }

  return {
    UpdateAdminStats,
    UpdateDriverStats,
    driverStats,
    adminStats,
    userActivity,
    UpdateUserActivity,
    UpdateAllActivity,
    allUserActivity,
    resetStore,
  };
});

export { useStaticsStore };
