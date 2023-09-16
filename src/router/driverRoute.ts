export default {
  path: "/driver",
  name: "Driver",
  meta: {
    pageTitle: "Driver",
    breadcrumbs: ["Driver"],
  },
  children: [
    {
      path: "deliveries",
      name: "Driver",
      meta: {
        pageTitle: "Deliveries",
        breadcrumbs: ["Deliveries"],
      },
      children: [
        {
          path: "record",
          name: "My Records",
          component: () => import("@/views/driver/DriverDeliveryRecord.vue"),
          meta: {
            pageTitle: "Delivery Records",
            breadcrumbs: ["Deliveries", "Records"],
          },
        },
      ],
    },
  ],
};
