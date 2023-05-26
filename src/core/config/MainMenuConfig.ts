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
    case "user":
      MainMenuConfig = [
        {
          pages: [
            {
              heading: "Dashboard",
              route: "/dashboard",
              keenthemesIcon: "element-11",
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
              bootstrapIcon: "bi-person-circle",
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
    case "admin":
      MainMenuConfig = [
        {
          pages: [
            {
              heading: "Dashboard",
              route: "/dashboard",
              bootstrapIcon: "bi-app-indicator",
            },
            {
              heading: "All users",
              route: "/dashboard",
              bootstrapIcon: "bi bi-person-circle",
            },
          ],
        },
      ];
      return MainMenuConfig;
  }
};
export default GenerateMenus;
