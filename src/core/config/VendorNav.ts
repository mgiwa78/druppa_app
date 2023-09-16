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
    heading: "Vendor Menu",
    pages: [
      {
        sectionTitle: "Dishes",
        route: "/vendor/vendorItems",
        keenthemesIcon: "bi bi-basket",
        bootstrapIcon: "bi bi-basket",
        sub: [
          {
            heading: "All",
            route: "/vendor/vendorItems/all",
          },
          {
            heading: "Create",
            route: "/vendor/vendorItems/create",
          },
        ],
      },
      {
        sectionTitle: "Orders",
        route: "/vendor/vendororders/",
        keenthemesIcon: "bi bi-bag-check",
        bootstrapIcon: "bi bi-bag-check",
        sub: [
          {
            heading: "All",
            route: "/vendor/vendororders/all",
          },
        ],
      },

      {
        sectionTitle: "My Profile",
        route: "/myprofile",
        keenthemesIcon: "bi bi-buildings",
        bootstrapIcon: "bi bi-buildings",
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
