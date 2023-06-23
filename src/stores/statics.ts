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
interface Count {
  count: number;
}
console.log(token);
interface AuthUser {
  admin_user: User;
}
interface Counts {
  adminCount: number | null;
  customersCount: number | null;
  driversCount: number | null;
  isSet: boolean;
}
const useStaticsStore = defineStore("statics", () => {
  const counts = ref<Counts>({
    adminCount: 0,
    customersCount: 0,
    driversCount: 0,
    isSet: false,
  });

  const UpdateCounts = async () => {
    const toFetch = ["customers", "admin", "drivers"];
    try {
      const customersData = await fetchCounts("customers");
      const adminData = await fetchCounts("admin");
      const driversData = await fetchCounts("drivers");

      counts.value.customersCount = customersData;
      counts.value.adminCount = adminData;
      counts.value.driversCount = driversData;
      if (
        counts.value.customersCount &&
        counts.value.adminCount &&
        counts.value.driversCount
      )
        return (counts.value.isSet = true);
    } catch (error: any) {
      console.log(token);
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
    UpdateCounts,
    counts,
  };
});

export { useStaticsStore };
