<template>
  <div class="app-navbar flex-shrink-0">
    <!-- <div class="app-navbar-item align-items-stretch ms-1 ms-md-3">
      <KTSearch />
    </div> -->
    <div v-if="user.type === 'Admin'" class="app-navbar-item ms-1 ms-md-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
        id="kt_activities_toggle"
      >
        <KTIcon icon-name="chart-simple" icon-class="fs-2 fs-md-1" />
      </div>
    </div>
    <!-- <div class="app-navbar-item ms-1 ms-md-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon icon-name="element-plus" icon-class="fs-2 fs-md-1" />
      </div>
      <KTNotificationMenu />
    </div> -->
    <!-- <div class="app-navbar-item ms-1 ms-md-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px position-relative"
        id="kt_drawer_chat_toggle"
      >
        <KTIcon icon-name="message-text-2" icon-class="fs-2 fs-md-1" />
        <span
          class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"
        ></span>
      </div>
    </div> -->
    <!-- <div class="app-navbar-item ms-1 ms-md-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon icon-name="element-11" icon-class="fs-2 fs-md-1" />
      </div>
      <KTQuickLinksMenu />
    </div> -->
    <div class="app-navbar-item ms-1 ms-md-3">
      <a
        href="#"
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="{default:'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon
          v-if="themeMode === 'light'"
          icon-name="night-day"
          icon-class="theme-light-show fs-2 fs-md-1"
        />
        <KTIcon
          v-else
          icon-name="moon"
          icon-class="theme-dark-show fs-2 fs-md-1"
        />
      </a>
      <KTThemeModeSwitcher />
    </div>
    <div class="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle">
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img
          alt="Logo"
          :src="
            State.userData.profile
              ? `${ASSETS_URL + State.userData.profile}`
              : getAssetPath('media/avatars/blank.png')
          "
        />
      </div>
      <KTUserMenu />
    </div>
    <div
      class="app-navbar-item d-lg-none ms-2 me-n3"
      v-tooltip
      title="Show header menu"
    >
      <div
        class="btn btn-icon btn-active-color-primary w-30px h-30px w-md-35px h-md-35px"
        id="kt_app_header_menu_toggle"
      >
        <KTIcon icon-name="text-align-left" icon-class="fs-2 fs-md-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, reactive } from "vue";

// import KTSearch from "@/layouts/layoutComponents/search/Search.vue";
// import KTNotificationMenu from "@/layouts/layoutComponents/menus/NotificationsMenu.vue";
// import KTQuickLinksMenu from "@/layouts/layoutComponents/menus/QuickLinksMenu.vue";

import KTUserMenu from "@/layouts/layoutComponents/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/layoutComponents/theme-mode/ThemeModeSwitcher.vue";
import { ThemeModeComponent } from "@/assets/ts/layout";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/stores/auth";
import __CONSTANTS__ from "@/constants";

export default defineComponent({
  name: "header-navbar",
  components: {
    // KTSearch,
    // KTNotificationMenu,
    // KTQuickLinksMenu,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    const store = useThemeStore();
    const AuthStore = useAuthStore();
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

    const themeMode = computed(() => {
      if (store.mode === "system") {
        return ThemeModeComponent.getSystemMode();
      }
      return store.mode;
    });

    return {
      themeMode,
      getAssetPath,
      State,
      ASSETS_URL,
      user,
    };
  },
});
</script>
