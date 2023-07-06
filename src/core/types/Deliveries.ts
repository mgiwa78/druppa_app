import type { DriverType } from "./Driver";
import { DriverEmpty } from "./Driver";
import { CustomerEmpty } from "./Customer";
import type { CustomerType } from "./Customer";
// import { OrderEmpty } from "./Orders";
import type { OrderType } from "./Orders";
import { OrderEmpty } from "./Orders";

export interface DeliveryType {
  customer: CustomerType;
  id: string;
  customer_order_id: string;
  customer_order: OrderType;
  tracking_number: string;
  status: string;

  pickup_date: string;
  delivery_date: string;
  driver: DriverType;
  image: string;
}

export const DeliveryEmpty = {
  customer: CustomerEmpty,
  id: "",
  customer_order_id: "",
  customer_order: {
    customer: CustomerEmpty,
    id: 0,
    payment_id: "",
    status: "",
    delivery: {},

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
  },
  tracking_number: "0",
  status: "",

  pickup_date: "",
  delivery_date: "",
  driver: DriverEmpty,
  image: "",
};
