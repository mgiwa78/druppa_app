export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

let MainMenuConfig: Array<MenuItem>;

const GenerateMenus = (type) => {
  switch (type) {
    case "user":
      return [
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
    case "admin":
      return [
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
  }
};
export default GenerateMenus;
