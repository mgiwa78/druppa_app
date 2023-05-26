import { ref } from "vue";
import { defineStore, skipHydrate } from "pinia";
import ApiService from "@/core/services/ApiService";

interface User {
  id?: Number;
  avatar?: string;
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
}

const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User | null>({} as User);
  const jwt_token = ref(null);
  const isAuthenticated = ref(user.value ? true : null);

  function setAuth(authUser: User, token) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    jwt_token.value = token;
    console.log(authUser);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = null;
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
  };
});

export { useAuthStore, type User };
