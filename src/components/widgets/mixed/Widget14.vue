<template>
  <!--begin::Mixed Widget 14-->
  <div
    :class="widgetClasses"
    class="card theme-dark-bg-body"
    :style="`background-color: ${data?.colour}`"
  >
    <!--begin::Body-->
    <div class="card-body d-flex flex-column">
      <!--begin::Wrapper-->
      <div class="d-flex flex-column mb-7">
        <!--begin::Title-->
        <span class="text-dark text-hover-primary fw-bold fs-3">{{
          data?.title
        }}</span>
        <!--end::Title-->
      </div>
      <!--end::Wrapper-->

      <!--begin::Row-->
      <div class="row g-0">
        <!--begin::Col-->
        <div class="col-6" v-for="(metric, i) in data?.metrics" :key="i">
          <div class="d-flex align-items-center mb-9 me-2">
            <!--begin::Symbol-->
            <div class="symbol symbol-40px me-3">
              <div class="symbol-label bg-body bg-opacity-50">
                <KTIcon :icon-name="metric.icon" icon-class="fs-1 text-dark" />
              </div>
            </div>
            <!--end::Symbol-->

            <!--begin::Title-->
            <div>
              <div class="fs-5 text-dark fw-bold lh-1">{{ metric.number }}</div>
              <div class="fs-7 text-gray-600 fw-semobold">
                {{ metric.title }}
              </div>
            </div>
            <!--end::Title-->
          </div>
        </div>
        <!--end::Col-->

        <!--begin::Col-->

        <!--end::Col-->
      </div>
      <!--end::Row-->
    </div>
  </div>
  <!--end::Mixed Widget 14-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "widget-14",
  props: {
    widgetClasses: String,
    widgetColor: String,
    data: Object,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
