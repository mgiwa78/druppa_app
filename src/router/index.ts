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
        path: "/shipment",
        name: "shipment",
        meta: {
          pageTitle: "Shipment",
          breadcrumbs: ["Shipment"],
        },
        children: [
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
            path: "makeOrder",
            name: "Make Order",
            component: () => import("@/views/customer/MakeOrder.vue"),
            meta: {
              pageTitle: "Shipment Records",
              breadcrumbs: ["Shipment", "Make Order"],
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
        path: "/deliveries",
        name: "Deliveries",
        meta: {
          pageTitle: "Deliveries",
          breadcrumbs: ["Deliveries"],
        },
        children: [
          {
            path: "myRecords",
            name: "My Records",
            component: () => import("@/views/driver/DriverRecord.vue"),
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
