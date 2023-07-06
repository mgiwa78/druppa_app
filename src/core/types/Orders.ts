import { CustomerEmpty } from "./Customer";
import type { CustomerType } from "./Customer";
import { DeliveryEmpty } from "./Deliveries";
import type { DeliveryType } from "./Deliveries";

export interface OrderType {
  customer: CustomerType;
  id: number;
  payment_id: string;
  service_rendered: string;
  request_description: string;
  total_payment: string;
  delivery: any;
  payment_method: string;
  expected_delivery_date: string;
  shipment_description: string;
  pickup_address: string;
  pickup_state: string;
  pickup_lga: string;
  status: string;
  pickup_city: string;

  dropOff_LGA: string;
  dropOff_state: string;
  dropOff_city: string;
  dropOff_address: string;
  shipment_weight: string;
  created_at: string;
}

export const OrderEmpty = {
  customer: CustomerEmpty,
  id: 0,
  payment_id: "",
  status: "",
  delivery: DeliveryEmpty,

  service_rendered: "",
  request_description: "",
  total_payment: "",
  payment_method: "",
  expected_delivery_date: "",
  shipment_description: "",
  pickup_address: "",
  pickup_state: "",
  pickup_lga: "",
  pickup_city: "",

  dropOff_LGA: "",
  dropOff_state: "",
  dropOff_city: "",
  dropOff_address: "",
  shipment_weight: "",
  created_at: "",
};
