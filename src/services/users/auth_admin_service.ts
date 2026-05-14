// Axios
import { apiPost } from '../../core/apiCall';
import { SBR } from "../../core/BaseResponse";

import { AdminChangePasswordDTO, AdminLoginDTO, AdminLogoutDTO } from '../../core/ZodSchemasCustom';

const URL = "auth_admin";

const ENDPOINTS = {
  admin_change_password: `${URL}/admin_change_password`,
  admin_login: `${URL}/admin_login`,
  admin_logout: `${URL}/admin_logout`,
};

// Admin Change Password
export const admin_change_password = async (data: AdminChangePasswordDTO): Promise<SBR> => {
  return apiPost<SBR, AdminChangePasswordDTO>(ENDPOINTS.admin_change_password,data);
};

// Admin Login
export const admin_login = async (data: AdminLoginDTO): Promise<SBR> => {
  return apiPost<SBR, AdminLoginDTO>(ENDPOINTS.admin_login, data);
};

// Admin Logout
export const admin_logout = async (data: AdminLogoutDTO): Promise<SBR> => {
  return apiPost<SBR, AdminLogoutDTO>(ENDPOINTS.admin_logout, data);
};
