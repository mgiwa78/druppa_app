export interface PaymentType {
  customer_id: string;
  id: string;
  amount: string;
  currency: string;
  payment_method: string;
  status: string;
  paystack_refrence_id: string;
  created_at: string;
}

export const PaymentEmpty = {
  customer_id: "",
  id: "",
  amount: "",
  currency: "",
  payment_method: "",
  status: "",
  paystack_refrence_id: "",
  created_at: "",
};
