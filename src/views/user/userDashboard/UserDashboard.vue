<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10"></div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

export default defineComponent({
  name: "main-dashboard",
  components: {},

  setup() {
    const AuthStore = useAuthStore();
    const { user } = AuthStore;

    onMounted(() => {
      if (!user.email) {
        return router.push({ name: "dashboard" });
      }
    });
    return {
      getAssetPath,
    };
  },
});
</script>
