import { computed, ref } from "vue";
import { defineStore, skipHydrate } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import __CONSTANTS__ from "@/constants";

const { API_URL } = __CONSTANTS__;
interface User {
  id?: number;
  profile?: string;
  name: string;
  type?: string;
  phone_number?: Number;
  address?: string;
  gender?: string;
  state?: string;
  created_at?: string;
  email?: string;
  email_verified_at?: boolean;
}

const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const userPersist = useLocalStorage("userPersist", "");
  const jwt_token = ref(null);

  function setAuth(authUser: User, token) {
    isAuthenticated.value = true;
    userPersist.value = JSON.stringify(authUser);
    errors.value = {};
    jwt_token.value = token;
  }

  const refreshProfile = async (id: number | string | undefined) => {
    const authUser = await axios
      .get(API_URL + `customer/fetchProfile/${id}`)
      .then((response) => {
        return response.data;
      });

    user.effect;
    isAuthenticated.value = true;
    userPersist.value = JSON.stringify(authUser.user);
  };

  const user = computed(() =>
    userPersist.value ? JSON.parse(userPersist.value) : null
  );

  const isAuthenticated = ref(user.value ? true : null);
  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    userPersist.value = null;
    errors.value = [];
    jwt_token.value = null;
  }
  function userIsAdmin() {
    if (user.value) {
      console.log(user.value);
    } else {
      return false;
    }
  }

  // function login(credentials: User) {
  //   return ApiService.post("login", credentials)
  //     .then(({ data }) => {
  //       setAuth(data);
  //     })
  //     .catch(({ response }) => {
  //       setError(response.data.errors);
  //     });
  // }

  function logout() {
    purgeAuth();
  }

  // function register(credentials: User) {
  //   return ApiService.post("register", credentials)
  //     .then(({ data }) => {
  //       setAuth(data);
  //     })
  //     .catch(({ response }) => {
  //       setError(response.data.errors);
  //     });
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
    isAuthenticated: skipHydrate(isAuthenticated),
    userIsAdmin: skipHydrate(userIsAdmin),
    // login,
    logout,
    // register,/
    forgotPassword,
    // verifyAuth,
    setAuth,
    refreshProfile,
  };
});

export { useAuthStore, type User };
