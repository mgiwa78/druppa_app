<template>
  <div>
    <CreateRetainershipForm widget-classes="mb-5 mb-xl-8"></CreateRetainershipForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateRetainershipForm from "@/components/admin/forms/CreateRetainershipForm.vue";

export default defineComponent({
  name: "delivery_records",
  components: { CreateRetainershipForm },
  props: {},
  setup() {
    return {};
  },
});
</script>
