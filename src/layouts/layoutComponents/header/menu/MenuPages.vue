<template>
  <template v-for="(item, i) in allpages" :key="i">


  </template>
</template>

<script lang="ts">
import type { MenuItemType } from "@/core/config/MainMenuConfig";
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";

import MainMenuConfig from "@/core/config/MainMenuConfig";
import { headerMenuIcons } from "@/core/helpers/config";
import GenerateMenus from "@/core/config/MainMenuConfig";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "KTMenu",
  components: {},
  setup() {
    const route = useRoute();

    const AuthStore = useAuthStore();

    const { user } = AuthStore;

    const hasActiveChildren = (match: string) => {
      return route.path.indexOf(match) !== -1;
    };
    const State = reactive({
      menu: [] as MenuItemType[] | undefined,
    });

    const allpages = computed(() => GenerateMenus(user.type));

    return {
      hasActiveChildren,
      headerMenuIcons,
      MainMenuConfig,
      getAssetPath,
      State,
      allpages,
    };
  },
});
</script>
