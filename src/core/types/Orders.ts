import type { PaymentType } from "./Payment";
import { PaymentEmpty } from "./Payment";
import { CustomerEmpty } from "./Customer";
import type { CustomerType } from "./Customer";

export interface OrderType {
  customer: CustomerType;
  id: number;
  payment_id: string;
  service_rendered: string;
  request_description: string;
  total_payment: string;
  payment_method: string;
  expected_delivery_date: string;

  shipment_description: string;
  pickup_address: string;
  pickup_state: string;
  pickup_lga: string;
  pickup_city: string;

  dropOff_LGA: string;
  dropOff_state: string;
  dropOff_city: string;
  dropOff_address: string;
  shipment_weight: string;
}

export const OrderEmpty = {
  customer: CustomerEmpty,
  id: 0,
  payment_id: "",

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
};
