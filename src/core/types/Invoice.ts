import { CustomerEmpty } from "./Customer";
import type { CustomerType } from "./Customer";
import { OrderEmpty } from "./Orders";
import type { OrderType } from "./Orders";
import type { PaymentType } from "./Payment";
import { PaymentEmpty } from "./Payment";

export interface InvoiceType {
  customer: CustomerType;
  customer_order: OrderType;
  payment: PaymentType;
  customer_order_id: number;

  id: number;
  customer_id: number;
  created_at: string;
}

export const InvoiceEmpty = {
  customer: CustomerEmpty,
  customer_order: OrderEmpty,
  payment: PaymentEmpty,
  customer_id: 0,
  created_at: "",
  customer_order_id: 0,
  id: 0,
};
