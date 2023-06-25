import { computed, ref } from "vue";
import { defineStore, skipHydrate } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
import Swal from "sweetalert2";
import router from "@/router";
import type { ErrorTypes } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const AuthStore = useAuthStore();
const { logout, token } = AuthStore;

const { API_URL } = __CONSTANTS__;
interface User {
  id?: number;
  profile?: string;
  username?: string;
  password?: string;
  lastName: string;
  firstName: string;
  type?: string;
  phone_number?: Number;
  address?: string;
  gender?: string;
  state?: string;
  created_at?: string;
  email?: string;
  email_verified_at?: boolean;
}

interface driverStats {
  total_deliveries: string;
  total_distance: string;
  performance: number;
  isSet: boolean;
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
  const driverStats = ref<driverStats>({
    total_deliveries: "0",
    total_distance: "0",
    performance: 0,
    isSet: false,
  });
  const adminStats = ref<adminStats>({
    admin: "0",
    driver: "0",
    customer: "0",
    inActiveDrivers: "0",
    activeDrivers: "0",
    pendingCustomerOrders: "0",
    transitCustomerOrders: "0",
    customerOrders: "0",
    isSet: false,
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

    console.log(adminStatics);

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
      console.log(driverStatics);

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
        logout();
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

  const fetchCounts = async (profile) => {
    const alll: any = await axios
      .get(API_URL + `${profile}/count/getCount`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data.count)
      .catch((error) => {
        throw error;
      });
    return alll;
  };

  const fetch = async (route) => {
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
          logout();
          router.push({ name: "sign-in" });
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
  };
});

export { useStaticsStore };
