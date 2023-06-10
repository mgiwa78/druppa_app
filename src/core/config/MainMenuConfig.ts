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
          heading: "Menu",
          pages: [
            {
              sectionTitle: "My Profile",
              route: "/myprofile",

              keenthemesIcon: "profile-circle",
              bootstrapIcon: "profile-circle",

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
              route: "/admin",
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
              route: "/customers",
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
              route: "/drivers",
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
              route: "/myprofile",
              keenthemesIcon: "bi bi-box-seam",
              bootstrapIcon: "bi bi-box-seam",
              sub: [
                {
                  heading: "View All",
                  route: "/profile/view",
                },
              ],
            },

            {
              sectionTitle: "Inventory",
              route: "/myprofile",
              keenthemesIcon: "bi bi-box-seam",
              bootstrapIcon: "bi bi-box-seam",
              sub: [
                {
                  heading: "View All",
                  route: "/profile/view",
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
                  route: "/profile/view",
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
