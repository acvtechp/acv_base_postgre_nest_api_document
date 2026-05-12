// Axios
import { apiPost, apiPatch, apiDelete, apiGet } from "src/core/apiCall";
import { FBR, SBR } from "src/core/BaseResponse";

// Zod
import { BaseQuerySchema } from "src/zod_utils/zod_base_schema";
import {
  stringOptional,
  stringMandatory,
  enumMandatory,
  multi_select_optional,
  enumArrayOptional,
  getAllEnums,
} from "src/zod_utils/zod_utils";
import { z } from "zod";

// Enums
import { AdminRole, Status } from "src/core/Enums";

const URL = "admin";

const ENDPOINTS = {
  // UserAdmin APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // Profile APIs
  update_profile: (id: string): string => `${URL}/update_profile/${id}`,

  // Admin Image APIs
  admin_image_presigned_url: (file_name: string): string =>
    `${URL}/admin_image_presigned_url/${file_name}`,
  update_admin_image: (id: string): string => `${URL}/update_admin_image/${id}`,

  remove_admin_image: (id: string): string => `${URL}/remove_admin_image/${id}`,

  // Cache APIs
  cache: `${URL}/cache`,
};

// UserAdmin Interface
export interface UserAdmin extends Record<string, unknown> {
  // Primary Fields
  admin_id: string;

  // Profile Image/Logo
  admin_image_url?: string;
  admin_image_key?: string;
  admin_image_name?: string;

  // Main Field Details
  admin_name: string;
  email: string;
  mobile?: string;
  password?: string;
  admin_role: AdminRole;

  admin_details?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  modified_date_time: string;

  // Relations - Child
  UserAdminLoginPush?: UserAdminLoginPush[];

  // Relations - Child Count
  _count?: {
    UserAdminLoginPush?: number;
  };
}

// UserAdminLoginPush Interface
export interface UserAdminLoginPush extends Record<string, unknown> {
  // Primary Fields
  admin_login_push_id: string;

  // Relations - Parent
  admin_id: string;
  UserAdmin?: UserAdmin;

  admin_details?: string;
  admin_image_url?: string;

  // Main Fields
  fcm_token: string;

  platform: string;

  user_agent?: string;
  ip_address?: string;

  device_id?: string;
  device_model?: string;

  os_name?: string;
  os_version?: string;

  browser_name?: string;
  browser_version?: string;

  app_version?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  modified_date_time: string;
}

// UserAdmin Create/Update Schema
export const UserAdminSchema = z.object({
  // Profile Image/Logo
  admin_image_url: stringOptional("Admin Image URL", 0, 300),
  admin_image_key: stringOptional("Admin Image Key", 0, 300),
  admin_image_name: stringOptional("Admin Image Name", 0, 300),

  // Main Field Details
  admin_name: stringMandatory("Admin Name", 3, 100),
  email: stringMandatory("Email", 3, 100),
  password: stringOptional("Password", 0, 20),
  mobile: stringOptional("Mobile", 0, 15),

  admin_role: enumMandatory("Admin Role", AdminRole, AdminRole.MasterAdmin),

  // Metadata
  status: enumMandatory("Status", Status, Status.Active),
});
export type UserAdminDTO = z.infer<typeof UserAdminSchema>;

// UserAdmin Logo Schema
export const UserAdminLogoSchema = z.object({
  // Profile Image/Logo
  admin_image_url: stringMandatory("Admin Image URL", 0, 300),
  admin_image_key: stringMandatory("Admin Image Key", 0, 300),
  admin_image_name: stringMandatory("Admin Image Name", 0, 300),
});
export type UserAdminLogoDTO = z.infer<typeof UserAdminLogoSchema>;

// UserAdmin Profile Schema
export const UserAdminProfileSchema = z.object({
  // Profile Image/Logo
  admin_image_url: stringOptional("Admin Image URL", 0, 300),
  admin_image_key: stringOptional("Admin Image Key", 0, 300),
  admin_image_name: stringOptional("Admin Image Name", 0, 300),

  // Main Field Details
  admin_name: stringMandatory("Admin Name", 3, 100),
  email: stringMandatory("Email", 3, 100),
  mobile: stringOptional("Mobile", 0, 15),
});
export type UserAdminProfileDTO = z.infer<typeof UserAdminProfileSchema>;

// UserAdmin Query Schema
export const UserAdminQuerySchema = BaseQuerySchema.extend({
  // Self Table
  admin_ids: multi_select_optional("UserAdmin"),

  // Enums
  admin_role: enumArrayOptional(
    "Admin Role",
    AdminRole,
    getAllEnums(AdminRole),
  ),
});
export type UserAdminQueryDTO = z.infer<typeof UserAdminQuerySchema>;

// Convert UserAdmin Data to API Payload
export const toUserAdminPayload = (row: UserAdmin): UserAdminDTO => ({
  admin_image_url: row.admin_image_url || "",
  admin_image_key: row.admin_image_key || "",
  admin_image_name: row.admin_image_name || "",

  admin_name: row.admin_name || "",
  email: row.email || "",
  password: row.password || "",
  mobile: row.mobile || "",

  admin_role: row.admin_role || AdminRole.MasterAdmin,

  status: row.status || Status.Active,
});

// Create New UserAdmin Payload
export const newUserAdminPayload = (): UserAdminDTO => ({
  admin_image_url: "",
  admin_image_key: "",
  admin_image_name: "",

  admin_name: "",
  email: "",
  password: "",
  mobile: "",

  admin_role: AdminRole.MasterAdmin,

  status: Status.Active,
});

// UserAdmin APIs
export const findUserAdmins = async (
  data: UserAdminQueryDTO,
): Promise<FBR<UserAdmin[]>> => {
  return apiPost<FBR<UserAdmin[]>, UserAdminQueryDTO>(ENDPOINTS.find, data);
};

export const createUserAdmin = async (data: UserAdminDTO): Promise<SBR> => {
  return apiPost<SBR, UserAdminDTO>(ENDPOINTS.create, data);
};

export const updateUserAdmin = async (
  id: string,
  data: UserAdminDTO,
): Promise<SBR> => {
  return apiPatch<SBR, UserAdminDTO>(ENDPOINTS.update(id), data);
};

export const deleteUserAdmin = async (id: string): Promise<SBR> => {
  return apiDelete<SBR>(ENDPOINTS.delete(id));
};

// Update Profile
export const updateUserAdminProfile = async (
  id: string,
  data: UserAdminProfileDTO,
): Promise<SBR> => {
  return apiPatch<SBR, UserAdminProfileDTO>(ENDPOINTS.update_profile(id), data);
};

// Admin Image APIs
export const getAdminImagePresignedUrl = async (
  file_name: string,
): Promise<FBR<any>> => {
  return apiGet<FBR<any>>(ENDPOINTS.admin_image_presigned_url(file_name));
};

export const updateAdminImage = async (
  id: string,
  data: UserAdminLogoDTO,
): Promise<SBR> => {
  return apiPatch<SBR, UserAdminLogoDTO>(
    ENDPOINTS.update_admin_image(id),
    data,
  );
};

export const removeAdminImage = async (id: string): Promise<SBR> => {
  return apiDelete<SBR>(ENDPOINTS.remove_admin_image(id));
};

// Cache APIs
export const getUserAdminCache = async (): Promise<FBR<UserAdmin[]>> => {
  return apiGet<FBR<UserAdmin[]>>(ENDPOINTS.cache);
};
