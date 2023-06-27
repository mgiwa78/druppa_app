import type { DriverType } from "./Driver";
import type { AdminType } from "./Admin";
import type { CustomerType } from "./Customer";
import type { DeliveryType } from "./Deliveries";
import type { InvoiceType } from "./Invoice";
import type { InventoryType } from "./Inventory";

export interface ActivityType {
  id: number;
  user_id: number;
  user_type: string;
  user: AdminType | CustomerType | DriverType;
  data: AdminType | CustomerType | DriverType | InventoryType | DeliveryType;
  data_id: number;
  data_type: string;
  description: string;
  created_at: string;
}

export const ActivityEmpty = {
  id: 0,
  user_id: 0,
  user_type: "",
  data_id: 0,
  data_type: "",
  description: "",
  created_at: "",
};
