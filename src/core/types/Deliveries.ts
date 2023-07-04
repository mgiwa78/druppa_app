import type { DriverType } from "./Driver";
import { DriverEmpty } from "./Driver";
import { CustomerEmpty } from "./Customer";
import type { CustomerType } from "./Customer";

export interface DeliveryType {
  customer: CustomerType;
  id: string;
  customer_order_id: string;
  tracking_number: string;
  status: string;
  state: string;
  city: string;
  origin: string;
  destination: string;
  pickup_date: string;
  delivery_date: string;
  driver: DriverType;
  image: string;
}

export const DeliveryEmpty = {
  customer: CustomerEmpty,
  id: "",
  customer_order_id: "",
  tracking_number: "0",
  status: "",
  state: "",
  city: "",
  origin: "",
  destination: "",
  pickup_date: "",
  delivery_date: "",
  driver: DriverEmpty,
  image: "",
};
