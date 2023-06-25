export interface DriverType {
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
  address: "",
  title: "",
  password: "",
  gender: "",
  licenseNumber: "",
  licenseExpiration: "",
  vehicleMake: "",
  vehicleModel: "",
  licensePlate: "",
  insurance: "",
  allowEdit: 1,
};
