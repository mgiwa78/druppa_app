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
    heading: "Admin Menu",
    pages: [
      {
        sectionTitle: "Vendor",
        route: "vendor/",
        keenthemesIcon: "bi bi-shop",
        bootstrapIcon: "bi bi-shop",
        sub: [
          {
            heading: "View All",
            route: "/admin/vendors/all",
          },
        ],
      },
      {
        sectionTitle: "Customers",
        route: "/customers",
        keenthemesIcon: "bi bi-people",
        bootstrapIcon: "bi bi-people",
        sub: [
          {
            heading: "View All",
            route: "/admin/customersProfiles/all",
          },
        ],
      },
      {
        sectionTitle: "Drivers",
        route: "/drivers",
        keenthemesIcon: "bi bi-person-badge",
        bootstrapIcon: "bi bi-person-badge",
        sub: [
          {
            heading: "View All",
            route: "/admin/driverProfiles/all",
          },
        ],
      },
      {
        sectionTitle: "Deliveries",
        route: "delivery",
        keenthemesIcon: "bi bi-box-seam",
        bootstrapIcon: "bi bi-box-seam",
        sub: [
          {
            heading: "Deliveries",
            route: "/admin/deliveries/all",
          },
        ],
      },

      {
        sectionTitle: "Inventory",
        route: "inventory",
        keenthemesIcon: "bi bi-building",
        bootstrapIcon: "bi bi-building",
        sub: [
          {
            heading: "All",
            route: "/admin/inventory/all",
          },
          {
            heading: "Requests",
            route: "/admin/inventory/requests",
          },
        ],
      },
      {
        sectionTitle: "Coupon",
        route: "coupon",
        keenthemesIcon: "bi bi-building",
        bootstrapIcon: "bi bi-building",
        sub: [
          {
            heading: "All",
            route: "/admin/coupon/all",
          },
          {
            heading: "Create New",
            route: "/admin/coupon/create",
          },
        ],
      },
      {
        sectionTitle: "Retainership",
        route: "retainership",
        keenthemesIcon: "bi bi-building",
        bootstrapIcon: "bi bi-building",
        sub: [
          {
            heading: "All",
            route: "/admin/retainership/all",
          },
          {
            heading: "Create New",
            route: "/admin/retainership/create",
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
