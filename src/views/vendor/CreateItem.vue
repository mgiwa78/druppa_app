<template>
  <div>
    <CreateVendorItem></CreateVendorItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateVendorItem from "@/components/vendor/forms/CreateVendorItem.vue";

export default defineComponent({
  name: "create_vendor_item_view",
  components: { CreateVendorItem },
  props: {},
  setup() {
    return {};
  },
});
</script>
