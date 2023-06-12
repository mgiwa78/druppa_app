<template>
  <div v-if="true">
    <AdminDashboard />
  </div>
  <div v-if="false">
    <CustomerDashboard />
  </div>
  <div v-if="false">
    <DriverDashboard />
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import type { User } from "@/stores/auth";
import AdminDashboard from "@/components/admin/AdminDashboard.vue";
import DriverDashboard from "@/components/driver/DriverDashboard.vue";
import CustomerDashboard from "@/components/customer/CustomerDashboard.vue";

export default defineComponent({
  name: "main-dashboard",
  components: { AdminDashboard, DriverDashboard, CustomerDashboard },

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
