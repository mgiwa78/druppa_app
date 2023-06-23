export interface DriverType {
  id: number;
  created_at: string;
  updated_at: string;
  firstName: string;
  phone_number: string;
  lastName: string;
  email: string;
  profile: null;
  city: string;
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
}
interface User {
  id?: number;
  profile?: string;
  username?: string;
  password?: string;
  lastName: string;
  firstName: string;
  type?: string;
  phone_number?: string;
  address?: string;
  gender?: string;
  state?: string;
  created_at?: string;
  email?: string;
  email_verified_at?: boolean;
}

export const DriverEmpty = {
  id: 0,
  created_at: "",
  updated_at: "",
  firstName: "",
  phone_number: "",
  lastName: "",
  email: "",
  profile: null,
  city: "",
  state: "",
  type: "",
  title: "",
  gender: "",
  licenseNumber: "",
  licenseExpiration: "",
  vehicleMake: "",
  vehicleModel: "",
  licensePlate: "",
  insurance: "",
};
