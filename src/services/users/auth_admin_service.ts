// Axios
import { apiPost } from '../../core/apiCall';
import { SBR } from "../../core/BaseResponse";

// Zod
import { z } from "zod";
import {
  stringUUIDMandatory,
  stringMandatory,
  stringOptional,
  enumOptional,
} from "../../zod_utils/zod_utils";

// Enums
import { LoginFrom } from "../../core/EnumsBase";

const URL = "auth_admin";

const ENDPOINTS = {
  admin_change_password: `${URL}/admin_change_password`,
  admin_login: `${URL}/admin_login`,
  admin_logout: `${URL}/admin_logout`,
};

// AdminChangePassword Schema
export const AdminChangePasswordSchema = z.object({
  // Self Table
  admin_id: stringUUIDMandatory('admin_id'),

  // Main Field Details
  old_password: stringMandatory('Old Password', 3, 20),
  new_password: stringMandatory('New Password Size', 3, 20),
  confirm_new_password: stringMandatory('New Password Size', 3, 20),
});
export type AdminChangePasswordDTO = z.infer<typeof AdminChangePasswordSchema>;

// AdminLogin Schema
export const AdminLoginSchema = z.object({
  identifier: stringMandatory('Identifier', 3, 100),
  password: stringMandatory('Password', 3, 20),

  fcm_token: stringOptional('fcm_token', 0, 10000),

  platform: enumOptional('Login From', LoginFrom, LoginFrom.Web),

  user_agent: stringOptional('user_agent', 0, 500),
  ip_address: stringOptional('ip_address', 0, 45),

  device_id: stringOptional('device_id', 0, 120),

  device_model: stringOptional('device_model', 0, 120),
  os_name: stringOptional('os_name', 0, 80),
  os_version: stringOptional('os_version', 0, 60),
  browser_name: stringOptional('browser_name', 0, 80),
  browser_version: stringOptional('browser_version', 0, 60),
  app_version: stringOptional('app_version', 0, 40),
});
export type AdminLoginDTO = z.infer<typeof AdminLoginSchema>;

// AdminLogout Schema
export const AdminLogoutSchema = z.object({
  fcm_token: stringOptional('fcm_token', 0, 10000),
  device_id: stringOptional('device_id', 0, 120),
});
export type AdminLogoutDTO = z.infer<typeof AdminLogoutSchema>;

// Admin Change Password
export const adminChangePassword = async (data: AdminChangePasswordDTO): Promise<SBR> => {
  return apiPost<SBR, AdminChangePasswordDTO>(ENDPOINTS.admin_change_password,data);
};

// Admin Login
export const adminLogin = async (data: AdminLoginDTO): Promise<SBR> => {
  return apiPost<SBR, AdminLoginDTO>(ENDPOINTS.admin_login, data);
};

// Admin Logout
export const adminLogout = async (data: AdminLogoutDTO): Promise<SBR> => {
  return apiPost<SBR, AdminLogoutDTO>(ENDPOINTS.admin_logout, data);
};
