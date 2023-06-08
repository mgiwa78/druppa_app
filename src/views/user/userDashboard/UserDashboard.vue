<template>
  <div v-if="true">
    <AdminDashboard />
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import type { User } from "@/stores/auth";
import AdminDashboard from "@/components/admin/AdminDashboard.vue";

export default defineComponent({
  name: "main-dashboard",
  components: { AdminDashboard },

  setup() {
    const AuthStore = useAuthStore();
    const { user }: { user: User } = AuthStore;

    onMounted(() => {
      if (!user.email) {
        return router.push({ name: "dashboard" });
      }
    });
    return {
      getAssetPath,
      user,
    };
  },
});
</script>
