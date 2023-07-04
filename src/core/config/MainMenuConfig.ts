export interface MenuItemType {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItemType>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItemType>;
}

let MainMenuConfig: Array<MenuItemType>;

const GenerateMenus = (type) => {
  switch (type) {
    case "Customer":
      MainMenuConfig = [
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
              route: "/shipment",
              keenthemesIcon: "bi bi-truck",
              bootstrapIcon: "bi bi-truck",
              sub: [
                {
                  heading: "Make Order",
                  route: "/shipment/makeorder",
                },
                {
                  heading: "Records",
                  route: "/shipment/records",
                },

                {
                  heading: "My Order",
                  route: "/order/myOrder",
                },
                {
                  heading: "Tracking",
                  route: "/shipment/tracking",
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
              heading: "Feedback",
              route: "/customer/feedback ",
              keenthemesIcon: "bi bi-chat-left-text",
              bootstrapIcon: "bi bi-chat-left-text",
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
      return MainMenuConfig;
    case "Driver":
      MainMenuConfig = [
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
          heading: "Driver Menu",
          pages: [
            {
              sectionTitle: "Deliveries",
              route: "/driver/deliveries",
              keenthemesIcon: "bi bi-truck",
              bootstrapIcon: "bi bi-truck",
              sub: [
                {
                  heading: "My Records",
                  route: "/driver/deliveries/record",
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
      return MainMenuConfig;
    case "Admin":
      MainMenuConfig = [
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
              sectionTitle: "Admin",
              route: "/admin/admin",
              keenthemesIcon: "bi bi-person-workspace",
              bootstrapIcon: "bi bi-person-workspace",
              sub: [
                {
                  heading: "View All",
                  route: "/admin",
                },
              ],
            },
            {
              sectionTitle: "Customers",
              route: "/admin/customers",
              keenthemesIcon: "bi bi-people",
              bootstrapIcon: "bi bi-people",
              sub: [
                {
                  heading: "View All",
                  route: "/customers",
                },
              ],
            },
            {
              sectionTitle: "Drivers",
              route: "/admin/drivers",
              keenthemesIcon: "bi bi-person-badge",
              bootstrapIcon: "bi bi-person-badge",
              sub: [
                {
                  heading: "View All",
                  route: "/drivers",
                },
              ],
            },

            {
              sectionTitle: "Deliveries",
              route: "/delivery",
              keenthemesIcon: "bi bi-box-seam",
              bootstrapIcon: "bi bi-box-seam",
              sub: [
                {
                  heading: "Deliveries",
                  route: "/delivery",
                },
              ],
            },

            {
              sectionTitle: "Inventory",
              route: "/inventory",
              keenthemesIcon: "bi bi-building",
              bootstrapIcon: "bi bi-building",
              sub: [
                {
                  heading: "Inventory",
                  route: "/inventory",
                },
              ],
            },

            {
              sectionTitle: "Reports",
              route: "/myprofile",
              keenthemesIcon: "bi bi-file-text",
              bootstrapIcon: "bi bi-file-text",
              sub: [
                {
                  heading: "Delivery",
                  route: "/reports/delivery",
                },

                {
                  heading: "Inventory",
                  route: "/profile/edit",
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
      return MainMenuConfig;
  }
};
export default GenerateMenus;
