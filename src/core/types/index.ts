import type { string } from "yup";

export declare namespace AllTypes {
  interface DeliveryType {
    customer: CustomerType;
    customer_id: number | null;
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

  interface inventoryDeliveryRequest {
    avilableQuantity: number;
    customer: CustomerType;
    id: number;
    inventory: InventoryType;
    inventory_id: number | null;
    requestQuantity: number;
    status: string;
    deliveryAddress: string;
    requestDescription: string;
  }
  interface vendorCategoryType {
    name: string;
    id: number;
  }
  interface WalletTransaction {
    amount: string;
    created_at: string;
    customer_id: number;
    customer_order_id: number | null;
    id: number;
    paymentType: string;
    updated_at: string;
  }

  interface VendorType {
    id: number | null;
    profile: string;
    type: string;
    created_at: number | null;
    email: string;
    password: string;
    vendorName: string;
    contactInformation: string;
    address: string;
  }

  interface VendorItemType {
    id: number | null;
    image: FileList;
    name: string;
    description: string;
    created_at: string;
    price: string;
    vendor_item_category_id: string;
    category: vendorCategoryType;
    vendor_id: string;
    vendor: VendorType;
  }

  interface CouponType {
    id: string;
    validFrom: string;
    validUntill: string;
    forUseBy: string;
    status: string;
    couponType: string;
    percentageDiscount: string;
    reductionAmount: string;
    code: string;
    createdAt: string;
    maxUses: string;
    currentUses: string;
  }
  interface Location {
    id: string;
    name: string;
    address: string;
  }

  interface CustomerType {
    id: number | null;
    email: string;
    firstName: string;
    lastName: string;
    type: string;
    title: string;
    gender: string;
    phone_number: string;
    address: string;
    profile: string;
    city: string;
    state: Location;
    created_at: string;
    updated_at: string;
    email_verified_at: null;
    verify_token: null;
  }

  interface InventoryType {
    customer: CustomerType;
    id: string;
    warehouse?: WarehouseType;
    warehouse_id: number;
    product_description: string;
    quantity: string;
    created_at: string;
    image: string;
  }

  interface WarehouseType {
    id: number;
    name: string;
    location: string;
    capacity: number;
    created_at: string;
    updated_at: string;
  }

  interface AdminType {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    type: string;
    title: string;
    gender: string;
    phone_number: string;
    address: string;
    profile: string;
    location: Location;
    city: string;
    state: string;
    created_at: string;
    updated_at: string;
    email_verified_at: null;
    verify_token: null;
    permissions?: Array<PermissionType>;
  }

  interface ActivityType {
    id: number;
    user_id: number;
    user_type: string;
    user: AdminType | CustomerType | DriverType | VendorType;
    data: AdminType | CustomerType | DriverType | InventoryType | DeliveryType;
    data_id: number;
    data_type: string;
    description: string;
    created_at: string;
  }

  interface InvoiceType {
    customer: CustomerType;
    customer_order: OrderType;
    payment: PaymentType;
    customer_order_id: number;
    warehouse: WarehouseType;
    id: number;
    customer_id: number;
    created_at: string;
  }
  interface MakeShipmentOrder {
    packageType: string;
    deliveryInstructions: string;
    locationType: "Inter-State" | "Within-State";
    customerID: string;
    origin: string;
    amount: string;
    vendorItemID?: string;
    vendor_id?: string;
    orderType: "Logistics" | "Resturant";
    pickUp: PickUpAddressData;
    dropOff: DropOffAddressData;
    shipmentDescription: string;
    couponCode: string;
    paymentType: "Online" | "On-Delivery" | "Retainer";
  }
  interface PickUpAddressData {
    pickupAddress: string;
    pickupState: string;
  }
  interface DropOffAddressData {
    dropOffAddress: string;
    dropOffState: string;
  }
  interface Retainership {
    id: string;
    assignedTo: string;
    customer_id: string;
    customer: string;
    set_num_of_orders: string;
    current_num_of_orders: string;
    created_at: string;
  }
  interface RetainershipInstance {
    payment_id: string;
    retainership_id: string;
    customer_order_id: string;
    customer_id: number;
    updated_at: string;
    created_at: string;
    id: string;
  }

  interface OrderType {
    customer: CustomerType;
    id: number;
    payment_id: string;
    location_type: "Inter-State" | "Within-State";
    delivery_instructions: string;
    order_type: "Logistics" | "Resturant";
    vendor_item_id: number;
    package_type: string;
    origin: string;
    request_description: string;
    payment_type: "On-Delivery" | "Online";
    total_payment: string;
    delivery: DeliveryType;
    shipment_description: string;
    pickup_address: string;
    pickup_state: string;
    status: string;
    dropoff_state: string;
    dropoff_address: string;
    created_at: string;
  }

  interface PaymentType {
    customer_id: string;
    id: string;
    amount: string;
    currency: string;
    payment_method: string;
    status: string;
    paystack_refrence_id: string;
    created_at: string;
  }

  interface PermissionType {
    id: number;
    admin_id: number;
    permission: string;
    status: string;
  }

  interface DriverType {
    id: number;
    created_at: string;
    updated_at: string;
    firstName: string;
    phone_number: string;
    lastName: string;
    email: string;
    profile: null;
    address: string;
    city: string;
    password?: string;
    state: string;
    type: string;
    title: string;

    gender: string;
    licenseNumber: string;
    licenseExpiration: string;
    vehicleMake: string;
    vehicleModel: string;
    licensePlate: string;
    insurance: string;
    allowEdit: number;
  }
}
