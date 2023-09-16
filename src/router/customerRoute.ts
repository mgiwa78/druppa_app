export default {
  path: "/customer",
  name: "customer",
  meta: {
    pageTitle: "Customer",
    breadcrumbs: ["Customer"],
  },
  children: [
    {
      path: "invoice",
      name: "invoice",
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
      path: "shipment",
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
      path: "order/myOrder",
      name: "myOrder",
      component: () => import("@/views/customer/MyOrders.vue"),
      meta: {
        pageTitle: "My Orders",
        breadcrumbs: ["My Order"],
      },
    },

    {
      path: "wallet",
      name: "myWallet",
      component: () => import("@/views/customer/Wallet.vue"),
      meta: {
        pageTitle: "My Wallet",
        breadcrumbs: ["My Wallet"],
      },
    },
    {
      path: "inventory",
      name: "customerInventory",
      meta: {
        pageTitle: "Inventory",
        breadcrumbs: ["Inventory"],
      },
      children: [
        {
          path: "all",
          name: "allcustomerInventory",
          component: () => import("@/views/customer/MyInventories.vue"),
          meta: {
            pageTitle: "All customer Inventory",
            breadcrumbs: ["Inventory", "All customer Inventory"],
          },
        },
        {
          path: "requests",
          name: "customerInventoryRequest",
          component: () => import("@/views/customer/MyInventoryRequests.vue"),
          meta: {
            pageTitle: "Customer Request",
            breadcrumbs: ["Inventory", "customer Inventory Request"],
          },
        },
        {
          path: "deliveryRequests",
          name: "deliveryRequests",
          component: () =>
            import("@/views/customer/MyInventoryDeliveryRequests.vue"),
          meta: {
            pageTitle: "All Requests",
            breadcrumbs: ["Requests", "Delivery Requests"],
          },
        },
      ],
    },
    {
      path: "resturant",
      name: "customerResturant",
      meta: {
        pageTitle: "Resturant",
        breadcrumbs: ["Customer", "Resturant"],
      },
      children: [
        {
          path: "all",
          name: "allResturantDishes",
          component: () => import("@/views/customer/ResturantDishes.vue"),
          meta: {
            pageTitle: "All Resturant Dishes",
            breadcrumbs: ["Resturant", "Dishes"],
          },
        },
      ],
    },
  ],
};
