export default {
  path: "/admin",
  name: "admin",
  meta: {
    pageTitle: "Admin",
    breadcrumbs: ["Admin"],
  },
  children: [
    {
      path: "customersProfiles",
      name: "Customers",
      children: [
        {
          path: "all",
          name: "allCustomers",
          component: () => import("@/views/admin/CustomerListings.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Customers", "All Customers"],
          },
        },
      ],
    },
    {
      path: "vendors",
      name: "Vendor",
      children: [
        {
          path: "all",
          name: "allVendor",
          component: () => import("@/views/admin/VendorListings.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Vendors", "All Vendors"],
          },
        },
      ],
    },
    {
      path: "coupon",
      name: "coupon",
      children: [
        {
          path: "all",
          name: "allCoupon",
          component: () => import("@/views/admin/AllCoupons.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Coupon", "All Coupon"],
          },
        },
        {
          path: "create",
          name: "createCoupon",
          component: () => import("@/views/admin/CreateCoupon.vue"),
          meta: {
            pageTitle: "Create Coupon",
            breadcrumbs: ["Coupon", "Create Coupon"],
          },
        },
        {
          path: "edit/:couponId",
          name: "editCoupon",
          component: () => import("@/views/admin/ModifyCoupon.vue"),

          meta: {
            pageTitle: "edit Coupon",
            breadcrumbs: ["Coupon", "edit Coupon"],
          },
        },
      ],
    },
    {
      path: "retainership",
      name: "retainership",
      children: [
        {
          path: "all",
          name: "allRetainership",
          component: () => import("@/views/admin/AllRetainerships.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Retainership", "All Retainership"],
          },
        },
        {
          path: "create",
          name: "createRetainership",
          component: () => import("@/views/admin/CreateRetainership.vue"),
          meta: {
            pageTitle: "Create Retainership",
            breadcrumbs: ["Retainership", "Create Retainership"],
          },
        },
        {
          path: "edit/:retainershipId",
          name: "editRetainership",
          component: () => import("@/views/admin/ModifyCoupon.vue"),

          meta: {
            pageTitle: "edit Retainership",
            breadcrumbs: ["Retainership", "edit Retainership"],
          },
        },
      ],
    },
    {
      path: "adminProfiles",
      name: "adminProfiles",
      component: () => import("@/views/admin/AdminListings.vue"),
      children: [
        {
          path: "all",
          name: "allAdminProfiles",
          component: () => import("@/views/admin/AdminListings.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Admin", "All Admin Profiles"],
          },
        },
      ],
    },
    {
      path: "driverProfiles",
      name: "driverProfiles",
      children: [
        {
          path: "all",
          name: "alldriverProfiles",
          component: () => import("@/views/admin/DriverListings.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Drivers", "All Drivers"],
          },
        },
      ],
    },
    {
      path: "deliveries",
      name: "Deliveries",
      children: [
        {
          path: "all",
          name: "allDeliveries",
          component: () => import("@/views/admin/DeliveryRecords.vue"),
          meta: {
            pageTitle: "All",
            breadcrumbs: ["Deliveries", "All Deliveries"],
          },
        },
      ],
    },
    {
      path: "inventory",
      name: "AdminInventory",
      children: [
        {
          path: "requests",
          name: "requestsInventory",
          component: () => import("@/views/admin/AllInventoryRequests.vue"),

          meta: {
            pageTitle: "All Inventory",
            breadcrumbs: ["Inventory", "All Inventory"],
          },
        },
        {
          path: "all",
          name: "allInventory",
          component: () => import("@/views/admin/InventoryRecords.vue"),
          meta: {
            pageTitle: "All Requests",
            breadcrumbs: ["inventory", "Requests"],
          },
        },
      ],
    },
    {
      path: "reports",
      name: "reports",
      meta: {
        pageTitle: "Reports",
        breadcrumbs: ["Reports"],
      },
      children: [
        {
          path: "delivery",
          name: "delivery",
          component: () => import("@/views/admin/DeliveryReports.vue"),
          meta: {
            pageTitle: "Delivery Reports",
            breadcrumbs: ["Reports", "Delivery"],
          },
        },
        {
          path: "customer",
          name: "customer",
          component: () => import("@/views/admin/CustomerReports.vue"),
          meta: {
            pageTitle: "Customer Reports",
            breadcrumbs: ["Reports", "Customer"],
          },
        },
      ],
    },
  ],
};
