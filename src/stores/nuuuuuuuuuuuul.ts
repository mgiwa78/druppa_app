import { useLocalStorage } from "@vueuse/core";
import { defineStore, skipHydrate } from "pinia";
import axios from "axios";
import __CONSTANTS__ from "../constants";
import { computed, ref } from "vue";

const { API_URL, badInternetAlert, errorAlert, successAlert } = __CONSTANTS__;

const useUserStore = defineStore("user", () => {
  const userState = useLocalStorage("userState", "");
  const token = useLocalStorage("token", "");
  const emailForVerification = ref("");
  const userIdForVerification = ref(0);

  const loggedIn = computed(() => !!token.value);

  const user = computed(() =>
    userState.value ? JSON.parse(userState.value) : null
  );

  const userIsAdmin = computed(() => user.value.role_id === 2);
  const userIsActivated = computed(() => user.value.active === 1);

  /** API ROUTES */
  const saveLogoutAPI = async () => {
    try {
      await axios.get(`${API_URL}logout`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
    } catch (ERROR: any) {
      //
    }
    saveLogout();
  };

  const refreshUserAPI = async () => {
    try {
      const RESPONSE = await axios.get(
        `${API_URL}fetchauser/${user.value.id}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      saveRefresh(RESPONSE.data.user);
    } catch (ERROR: any) {
      //
    }
  };
  /** API ROUTES */

  const saveRefresh = (userParam: any) => {
    const stringifiedData = JSON.stringify(userParam);
    userState.value = stringifiedData;
  };

  const saveLogin = (userParam: any, tokenParam: string) => {
    const stringifiedData = JSON.stringify(userParam);
    userState.value = stringifiedData;
    token.value = tokenParam;
    console.log(loggedIn.value);
  };

  const saveInfoForVerification = (id: number, email: string) => {
    userIdForVerification.value = id;
    emailForVerification.value = email;
  };

  const removeInfoForVerification = () => {
    userIdForVerification.value = 0;
    emailForVerification.value = "";
  };
  const saveLogout = async () => {
    token.value = "";
  };

  return {
    userState: skipHydrate(userState),
    token: skipHydrate(token),
    userIsAdmin: skipHydrate(userIsAdmin),
    userIsActivated: skipHydrate(userIsActivated),
    userIdForVerification,
    emailForVerification,
    loggedIn,
    user,
    saveLogin,
    refreshUserAPI,
    saveInfoForVerification,
    removeInfoForVerification,
    saveLogoutAPI,
  };
});

export default useUserStore;
