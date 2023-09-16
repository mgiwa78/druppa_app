<template>
  <div v-if="user.type === 'Admin'">
    <AdminDashboard />
  </div>
  <div v-if="user.type === 'Customer'">
    <CustomerDashboard />
  </div>
  <div v-if="user.type === 'Driver'">
    <DriverDashboard />
  </div>
  <div v-if="user.type === 'Vendor'">
    <VendorDashboard />
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
import VendorDashboard from "@/components/vendor/VendorDashboard.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    AdminDashboard,
    DriverDashboard,
    CustomerDashboard,
    VendorDashboard,
  },

  setup() {
    const AuthStore = useAuthStore();
    const { user }: { user: User } = AuthStore;

    onMounted(() => {
      if (!user) {
        return router.push({ name: "sign-in" });
      }
    });
    return {
      getAssetPath,
      user,
    };
  },
});
</script>
