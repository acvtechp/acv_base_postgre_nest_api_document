import { YesNo, RunType, ExecutionStatus, LoginFrom } from './EnumsDB';
import { BaseQuerySchema } from '../zod_utils/zod_base_schema';
import {
  dateMandatory,
  enumArrayOptional,
  enumOptional,
  stringMandatory,
  stringOptional,
  stringUUIDMandatory,
} from '../zod_utils/zod_utils';
import z from 'zod';

// Cronjob Monitor Query
export const CronMonitorQuerySchema = BaseQuerySchema.extend({
  // Enums
  is_enabled: enumArrayOptional('Is Enabled', YesNo),
  run_type: enumArrayOptional('Run Type', RunType),
  execution_status: enumArrayOptional('Execution Status', ExecutionStatus),
});
export type CronMonitorQueryDTO = z.infer<typeof CronMonitorQuerySchema>;

// APIDataShare Report Schema
export const APIDataShareReportSchema = z.object({
  date: dateMandatory('Date'),
});
export type APIDataShareReportDTO = z.infer<typeof APIDataShareReportSchema>;

// UserAdmin Change Password Schema
export const AdminChangePasswordSchema = z.object({
  // Self Table
  admin_id: stringUUIDMandatory('admin_id'),

  // Main Field Details
  old_password: stringMandatory('Old Password', 3, 20),
  new_password: stringMandatory('New Password Size', 3, 20),
  confirm_new_password: stringMandatory('New Password Size', 3, 20),
});
export type AdminChangePasswordDTO = z.infer<typeof AdminChangePasswordSchema>;

// UserAdmin Login Schema
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

// UserAdmin Logout Schema
export const AdminLogoutSchema = z.object({
  fcm_token: stringOptional('fcm_token', 0, 10000),
  device_id: stringOptional('device_id', 0, 120),
});
export type AdminLogoutDTO = z.infer<typeof AdminLogoutSchema>;

// UserAdmin Update Profile Schema
export const UserAdminProfileSchema = z.object({
  // Profile Image/Logo
  admin_image_url: stringOptional('Admin Image URL', 0, 300),
  admin_image_key: stringOptional('Admin Image Key', 0, 300),
  admin_image_name: stringOptional('Admin Image Name', 0, 300),

  // Main Field Details
  admin_name: stringMandatory('Admin Name', 3, 100),
  email: stringMandatory('Email', 3, 100),
  mobile: stringOptional('Password', 0, 15),
});
export type UserAdminProfileDTO = z.infer<typeof UserAdminProfileSchema>;
