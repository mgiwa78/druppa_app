export interface PermissionType {
  id: number;
  admin_id: number;
  permission: string;
  status: string;
}

export const PermissionEmpty = {
  id: 0,
  admin_id: 0,
  permission: "",
  status: "",
};
