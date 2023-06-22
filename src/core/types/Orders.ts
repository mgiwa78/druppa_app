import type { DriverType } from "./Driver";
import { DriverEmpty } from "./Driver";
import { CustomerEmpty } from "./Customer";
import type { CustomerType } from "./Customer";

export interface OrderType {
  customer: CustomerType;
  id: number;
  payment_id: string;
  request_title: string;
  request_description: string;
  total_amount: string;
  payment_method: string;
  payment_status: string;
  shipment_type: string;
  status: string;
  drop_off: string;
  pick_up: string;
  shipment_details: string;
  created_at: string;
}

export const OrderEmpty = {
  customer: CustomerEmpty,
  id: 0,
  payment_id: "",
  request_title: "",
  request_description: "",
  total_amount: "",
  payment_method: "",
  payment_status: "",
  shipment_type: "",
  status: "",
  drop_off: "",
  pick_up: "",
  shipment_details: "",
  created_at: "",
};
