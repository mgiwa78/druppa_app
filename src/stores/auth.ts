import { computed, ref, watch } from "vue";
import { defineStore, skipHydrate } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import __CONSTANTS__ from "@/constants";
// import { purgeAuth } from "./logout";

const { API_URL } = __CONSTANTS__;

interface User {
  id?: number;
  profile?: string;
  vendorName?: string;
  balance?: string;
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

  licenseNumber?: string;
  licenseExpiration?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  licensePlate?: string;
  insurance?: string;
}

interface AuthUser {
  user: User;
}

const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const userPersist = useLocalStorage("userPersist", "");
  const token = useLocalStorage("token", "");

  const authUser = ref<AuthUser | null>(null);

  function setAuth(authUser: User, authToken: string) {
    isAuthenticated.value = true;
    userPersist.value = JSON.stringify(authUser);
    errors.value = {};
    token.value = authToken;
  }
  function resetStore() {
    authUser.value = null;
    userPersist.value = "";
    token.value = "";
  }

  const refreshProfile = async () => {
    const auth = await axios
      .get(API_URL + `profile`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        return response.data;
      });

    console.log(auth.user);
    authUser.value = auth.user;

    isAuthenticated.value = true;
    userPersist.value = JSON.stringify(authUser.value);
  };

  watch(authUser, () => {
    userPersist.value = JSON.stringify(authUser.value ? authUser.value : null);
  });

  const user = computed<User>(() =>
    userPersist.value ? JSON.parse(userPersist.value) : null
  );

  const isActive = computed(() =>
    userPersist.value
      ? JSON.parse(userPersist.value).isActive === 1
        ? true
        : false
      : null
  );

  const isAuthenticated = ref(user.value ? true : null);
  function setError(error: any) {
    errors.value = { ...error };
  }

  function userIsAdmin() {
    if (user.value) {
      console.log(user.value);
    } else {
      return false;
    }
  }

  // function logout() {
  //   // purgeAuth();
  //   // const staticsStore = useStaticsStore();
  //   // staticsStore.$reset();
  // }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

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
    errors,
    user: skipHydrate(user),
    token: skipHydrate(token),
    isAuthenticated: skipHydrate(isAuthenticated),
    userIsAdmin: skipHydrate(userIsAdmin),
    forgotPassword,
    // verifyAuth,
    setAuth,
    isActive,
    refreshProfile,
    resetStore,
  };
});

export { useAuthStore, type User };
