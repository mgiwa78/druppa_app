import type { DriverType } from "./Driver";
import { DriverEmpty } from "./Driver";
import { CustomerEmpty } from "./Customer";
import type { CustomerType } from "./Customer";

export interface InvoiceType {
  customer: CustomerType;
  customer_id: number;
  service_rendered: string;
  delivery_address: string;
  pickup_address: number;
  payment_method: string;
  currency: string;
  expected_delivery_date: string;
  expected_delivery_time: string;
  payment_id: string;
  paystack_refrence_id: string;
  total_payment: string;
  created_at: string;
  updated_at: string;
}

export const InvoiceEmpty = {
  customer: CustomerEmpty,
  customer_id: 0,
  service_rendered: "",
  delivery_address: "",
  pickup_address: 0,
  payment_method: "",
  currency: "",
  expected_delivery_date: "",
  expected_delivery_time: "",
  payment_id: "",
  paystack_refrence_id: "",
  total_payment: "",
  created_at: "",
  updated_at: "",
};
