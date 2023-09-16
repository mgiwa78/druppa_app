export default [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",

        keenthemesIcon: "bi-app-indicator",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "Customer Menu",
    pages: [
      {
        sectionTitle: "Shipment",
        route: "/customer/shipment",
        keenthemesIcon: "bi bi-truck",
        bootstrapIcon: "bi bi-truck",
        sub: [
          {
            heading: "Make Order",
            route: "/customer/shipment/makeorder",
          },

          {
            heading: "Records",
            route: "/customer/shipment/records",
          },

          {
            heading: "My Order",
            route: "/customer/order/myOrder",
          },
          // {
          //   heading: "Tracking",
          //   route: "/customer/shipment/tracking",
          // },
        ],
      },
      {
        sectionTitle: "Resturant",
        route: "/customer/resturant",
        keenthemesIcon: "bi bi-shop",
        bootstrapIcon: "bi bi-shop",
        sub: [
          {
            heading: "Dishes",
            route: "/customer/resturant/all",
          },
        ],
      },

      {
        heading: "Invoice List",
        route: "/customer/invoice/list",
        keenthemesIcon: "bi bi-receipt",
        bootstrapIcon: "bi bi-receipt",
      },
      {
        heading: "My wallet",
        route: "/customer/wallet",
        keenthemesIcon: "bi bi-receipt",
        bootstrapIcon: "bi bi-receipt",
      },

      {
        sectionTitle: "Inventory",
        route: "/customer/inventory",
        keenthemesIcon: "bi bi-box",
        bootstrapIcon: "bi bi-box",
        sub: [
          {
            heading: "All",
            route: "/customer/inventory/all",
          },
          {
            heading: "Storage Requests",
            route: "/customer/inventory/requests",
          },
          {
            heading: "Delivery Requests",
            route: "/customer/inventory/DeliveryRequests",
          },
        ],
      },
      {
        sectionTitle: "My Profile",
        route: "/myprofile",
        keenthemesIcon: "bi bi-person-circle",
        bootstrapIcon: "bi bi-person-circle",
        sub: [
          {
            heading: "View",
            route: "/profile/view",
          },
          {
            heading: "Edit",
            route: "/profile/edit",
          },
        ],
      },
    ],
  },
];
