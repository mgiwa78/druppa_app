<template>
  <!--begin::Footer-->
  <div class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6" id="kt_app_sidebar_footer">
    <a @click="signOut()"
      class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
      data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click">
      <span class="btn-label">Sign Out</span>
      <KTIcon icon-name="document" icon-class="btn-icon fs-2 m-0" />
    </a>
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useStaticsStore } from "@/stores/statics";

export default defineComponent({
  name: "sidebar-footer",
  components: {},
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const StaticsStore = useStaticsStore();

    const signOut = () => {
      store.resetStore()
      StaticsStore.resetStore()

      router.push({ name: "sign-in" });
    };
    return {
      getAssetPath,
      signOut,
    };
  },
});
</script>
