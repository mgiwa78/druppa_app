import { PermissionEmpty } from "./Permission";
import type { PermissionType } from "./Permission";

export interface AdminType {
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
  city: string;
  state: string;
  created_at: string;
  updated_at: string;
  email_verified_at: null;
  verify_token: null;
  permissions?: Array<PermissionType>;
}

export const AdminEmpty = {
  id: 37,
  email: "",
  firstName: "",
  lastName: "",
  type: "",
  title: "",
  gender: "",
  phone_number: "",
  address: "",
  profile: "",
  city: "",
  state: "",
  created_at: "",
  updated_at: "",
  email_verified_at: null,
  verify_token: null,
  permissions: [PermissionEmpty],
};
