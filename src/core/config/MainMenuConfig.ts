import DriverNav from "./DriverNav";
import CustomerNav from "./CustomerNav";
import AdminNav from "./AdminNav";
import VendorNav from "./VendorNav";
import SuperAdmin from "./SuperAdmin";

export interface MenuItemType {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItemType>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItemType>;
}

const GenerateMenus = (user): Array<MenuItemType> | undefined => {
  switch (user.type) {
    case "Customer":
      return CustomerNav;
    case "Driver":
      return DriverNav;
    case "Vendor":
      return VendorNav;
    case "Admin":
      console.log(user);
      if (user.super) {
        console.log("Super");
        return SuperAdmin;
      }
      return AdminNav;
  }
};
export default GenerateMenus;
