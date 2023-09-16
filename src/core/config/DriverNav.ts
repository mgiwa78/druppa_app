export default[
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