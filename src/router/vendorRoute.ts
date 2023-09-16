export default {
  path: "/vendor",
  name: "vendor",
  meta: {
    pageTitle: "Vendor",
    breadcrumbs: ["Vendor"],
  },
  children: [
    {
      path: "vendorItems",
      name: "vendorItems",
      children: [
        {
          path: "all",
          name: "allVendorItems",
          component: () => import("@/views/vendor/VendorItems.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Items", "All Items"],
          },
        },
        {
          path: "create",
          name: "createVendorItems",
          component: () => import("@/views/vendor/CreateItem.vue"),
          meta: {
            pageTitle: "Create Vendor Item",
            breadcrumbs: ["Dishes", "Create Item"],
          },
        },
      ],
    },
    {
      path: "vendororders",
      name: "vendororders",
      children: [
        {
          path: "all",
          name: "allVendororders",
          component: () => import("@/views/vendor/VendorOrders.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Orders", "All Orders"],
          },
        },
      ],
    },
  ],
};
