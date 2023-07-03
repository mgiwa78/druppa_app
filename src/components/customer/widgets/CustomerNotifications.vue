<template>
  <div class="card card-flush">
    <div class="card-header py-6 border-0">
      <div>
        <h3 class="card-title fw-bold text-dark">Notifications</h3>
        <span class="text-gray-400 mt-1 fw-semibold fs-6"
          >Updated 37 minutes ago</span
        >
      </div>
      <div class="card-toolbar">
        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <KTIcon icon-name="category" icon-class="fs-2" />
        </button>
        <Dropdown3></Dropdown3>
      </div>
    </div>

    <div
      class="card-body pt-0"
      style="max-height: 410.66px; overflow-x: scroll"
    >
      <div v-if="userActivity.activities.length > 1">
        <template
          v-for="(item, index) in userActivity.activities"
          :key="item.id"
        >
          <div
            :class="[
              'mb-7' && list.length - 1 !== index,
              `bg-light-${
                item.data_type !== null
                  ? ACTIVITY_COLOUR_MAP[item.data_type]?.color
                  : 'secondary'
              }`,
            ]"
            class="d-flex align-items-center rounded p-5 mb-7"
          >
            <KTIcon
              icon-name="abstract-26"
              :icon-class="`text-${
                item.data_type !== null
                  ? ACTIVITY_COLOUR_MAP[item.data_type]?.color
                  : 'gray-900'
              } fs-1 me-5`"
            />

            <div class="flex-grow-1 me-2">
              <a
                href="#"
                class="fw-bold text-gray-800 text-hover-primary fs-6"
                >{{ item.description }}</a
              >
            </div>

            <span
              :class="`text-${
                item.data_type !== null
                  ? ACTIVITY_COLOUR_MAP[item.data_type]?.color
                  : 'gray-900'
              }`"
              class="fw-bold py-1"
              >{{ formatDate(item.created_at) }}</span
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import { useStaticsStore } from "@/stores/statics";
import { ACTIVITY_COLOUR_MAP } from "@/core/helpers/colourMaps";
import formatDate from "@/core/helpers/formatDate";

export default defineComponent({
  name: "customer-notifications",
  components: {
    Dropdown3,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const staticStore = useStaticsStore();
    const { userActivity, UpdateUserActivity } = staticStore;

    const activityData = ref(userActivity);
    const list = ref([
      {
        color: "warning",
        icon: getAssetPath("media/icons/duotune/abstract/abs027.svg"),
        title: "Account Created",
        text: "Due in 2 Days",
        number: "5th May 2023  06:30 PM",
      },
      {
        color: "success",
        icon: getAssetPath("media/icons/duotune/art/art005.svg"),
        title: "Email Verified",
        text: "Due in 2 Days",
        number: "6th May 2023  06:14 PM",
      },
      {
        color: "danger",
        icon: getAssetPath("media/icons/duotune/communication/com012.svg"),
        title: "Shipment Order Placed",
        text: "Due in 5 Days",
        number: "11th May 2023  10:30 AM",
      },
      {
        color: "info",
        icon: getAssetPath("media/icons/duotune/communication/com012.svg"),
        title: "Shipment Dilivered",
        text: "Due in 7 Days",
        number: "12th May 2023  02:33 PM",
      },
    ]);

    onMounted(async () => {
      UpdateUserActivity();
      activityData.value = userActivity;
    });
    return {
      list,
      getAssetPath,
      userActivity,
      ACTIVITY_COLOUR_MAP,
      formatDate,
      staticStore,
    };
  },
});
</script>
