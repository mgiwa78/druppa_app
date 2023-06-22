import type { CustomerType } from "./Customer";
import { CustomerEmpty } from "./Customer";

export interface InventoryType {
  customer: CustomerType;
  id: string;
  warehouse: WarehouseType;
  product_description: string;
  quantity: string;
  created_at: string;
  image: string;
}
export interface WarehouseType {
  id: number;
  name: string;
  location: string;
  capacity: number;
  created_at: string;
  updated_at: string;
}

export const InventoryEmpty = {
  customer: CustomerEmpty,
  id: "",
  image: "",
  warehouse: {
    id: 0,
    name: "",
    location: "",
    capacity: 0,
    created_at: "",
    updated_at: "",
  },
  product_description: "",
  quantity: "",
  created_at: "",
};
