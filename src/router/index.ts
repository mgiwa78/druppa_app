import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/userLayout/UserLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/user/userDashboard/UserDashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboard"],
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/user/userProfile/Profile.vue"),
        meta: {
          pageTitle: "Profile",
          breadcrumbs: ["Profile"],
        },
        children: [
          {
            path: "edit",
            name: "edit",
            component: () => import("@/views/user/userProfile/Settings.vue"),
            meta: {
              pageTitle: "Edit Profile",
              breadcrumbs: ["Profile", "Edit"],
            },
          },
          {
            path: "view",
            name: "view",
            component: () => import("@/views/user/userProfile/Overview.vue"),
            meta: {
              pageTitle: "View Profile",
              breadcrumbs: ["Profile", "View"],
            },
          },
        ],
      },
      {
        path: "/customer/invoice",
        name: "/customer/invoice",
        meta: {
          pageTitle: "Customer",
          breadcrumbs: ["Customer"],
        },
        children: [
          {
            path: "list",
            name: "Invoice List",
            component: () => import("@/views/customer/InvoiceListView.vue"),
            meta: {
              pageTitle: "Customer Invoice List",
              breadcrumbs: ["Invoice", "All"],
            },
          },
          {
            path: "verify",
            name: "Verify Invoice",
            component: () => import("@/views/customer/InvoiceView.vue"),
            meta: {
              pageTitle: "Customer Invoice",
              breadcrumbs: ["Invoice", "View Receipt"],
            },
          },
        ],
      },

      {
        path: "/shipment",
        name: "shipment",
        meta: {
          pageTitle: "Shipment",
          breadcrumbs: ["Shipment"],
        },
        children: [
          {
            path: "makeorder",
            name: "makeorder",
            component: () => import("@/views/customer/MakeOrder.vue"),
            meta: {
              pageTitle: "Make Order",
              breadcrumbs: ["Shipment", "Make Order"],
            },
          },
          {
            path: "records",
            name: "records",
            component: () => import("@/views/customer/ShipmentRecords.vue"),
            meta: {
              pageTitle: "Shipment Records",
              breadcrumbs: ["Shipment", "Records"],
            },
          },

          {
            path: "tracking",
            name: "Tracking",
            component: () => import("@/views/customer/Tracking.vue"),
            meta: {
              pageTitle: "Shipment Records",
              breadcrumbs: ["Shipment", "Tracking"],
            },
          },
        ],
      },
      {
        path: "/order/myOrder",
        name: "myOrder",
        component: () => import("@/views/customer/MyOrders.vue"),
        meta: {
          pageTitle: "My Orders",
          breadcrumbs: ["My Order"],
        },
      },
      {
        path: "/Verifypickup/:tracking_number",
        name: "Verify pickup",
        component: () => import("@/views/driver/VerifyPickup.vue"),
        meta: {
          pageTitle: "Pick up",
          breadcrumbs: ["My Order"],
        },
      },
      {
        path: "/Verifydropoff/:tracking_number",
        name: "Verify dropoff",
        component: () => import("@/views/driver/VerifyDropOffPage.vue"),
        meta: {
          pageTitle: "Dropoff",
          breadcrumbs: ["My Order"],
        },
      },
      {
        path: "/driver/deliveries",
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
      {
        path: "/admin",
        name: "admin",
        meta: {
          pageTitle: "Admin",
          breadcrumbs: ["Admin"],
        },
        children: [
          {
            path: "/customers",
            name: "Customers",
            component: () => import("@/views/admin/CustomerListings.vue"),
            meta: {
              pageTitle: "Customers",
              breadcrumbs: ["Admin", "Customers"],
            },
          },
          {
            path: "/admin",
            name: "Admin",
            component: () => import("@/views/admin/AdminListings.vue"),
            meta: {
              pageTitle: "Admin",
              breadcrumbs: ["Admin", "Administranive Users"],
            },
          },
          {
            path: "/drivers",
            name: "Drivers",
            component: () => import("@/views/admin/DriverListings.vue"),
            meta: {
              pageTitle: "Admin",
              breadcrumbs: ["Admin", "Administranive Users"],
            },
          },
          {
            path: "/delivery",
            name: "Deliveries",
            component: () => import("@/views/admin/DeliveryRecords.vue"),
            meta: {
              pageTitle: "Admin",
              breadcrumbs: ["Admin", "Deliveries"],
            },
          },
          {
            path: "/inventory",
            name: "Inventory",
            component: () => import("@/views/admin/InventoryRecords.vue"),
            meta: {
              pageTitle: "Admin",
              breadcrumbs: ["Admin", "Inventory"],
            },
          },
          {
            path: "/reports",
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
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/userAuthLayout/AuthUserLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/user/userAuth/UserSignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/user/userAuth/UserSignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () => import("@/views/user/userAuth/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { user } = authStore;
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  // authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (user) {
      if (user.id) {
        next();
      } else {
        next({ name: "sign-in" });
      }
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }
  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
