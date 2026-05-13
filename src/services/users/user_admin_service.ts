// Axios
import { apiPost, apiPatch, apiDelete, apiGet } from "../../core/apiCall";
import { AWSPresignedUrl, BaseCommonFile, BR, CUBR, DBR, FBR, SBR } from "../../core/BaseResponse";

// Zod
import { BaseFileSchema, BaseQuerySchema, FilePresignedUrlDTO } from "../../zod_utils/zod_base_schema";
import {
  stringOptional,
  stringMandatory,
  enumMandatory,
  multi_select_optional,
  enumArrayOptional,
  getAllEnums,
  single_select_optional,
  nestedArrayOfObjectsOptional,
} from "../../zod_utils/zod_utils";
import { z } from "zod";

// Enums
import { AdminRole, Status } from "../../core/EnumsDB";

// Other Models
import { UserAdmin } from "src/models/models";

const URL = "admin";

const ENDPOINTS = {
  // AWS S3 PRESIGNED
  get_admin_image_presigned_url: (fileName: string): string => `${URL}/get_admin_image_presigned_url/${fileName}`,
  get_user_admin_file_presigned_url: `${URL}/get_user_admin_file_presigned_url`,

  // File Uploads
  update_admin_image: (id: string): string => `${URL}/update_admin_image/${id}`,
  remove_admin_image: (id: string): string => `${URL}/remove_admin_image/${id}`,

  create_user_admin_file: `${URL}/create_user_admin_file`,
  remove_user_admin_file: (id: string): string => `${URL}/remove_user_admin_file/${id}`,

  // UserAdmin APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // Profile APIs
  update_admin_profile: (id: string): string => `${URL}/update_admin_profile/${id}`,

  // Cache APIs
  cache: `${URL}/cache`,
};

// UserAdmin File Schema
export const UserAdminFileSchema = BaseFileSchema.extend({
  // Relations - Parent
  admin_id: single_select_optional("UserAdmin"), // Single-Selection -> UserAdmin
});
export type UserAdminFileDTO = z.infer<typeof UserAdminFileSchema>;

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
  mobile: stringOptional("Password", 0, 15),
  admin_role: enumMandatory("Admin Role", AdminRole, AdminRole.MasterAdmin),

  // Metadata
  status: enumMandatory("Status", Status, Status.Active),

  // Files
  UserAdminFileSchema: nestedArrayOfObjectsOptional(
    "UserAdminFileSchema",
    UserAdminFileSchema,
    [],
  ),
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

// UserAdmin Update Profile Schema
export const UserAdminProfileSchema = z.object({
  // Profile Image/Logo
  admin_image_url: stringOptional("Admin Image URL", 0, 300),
  admin_image_key: stringOptional("Admin Image Key", 0, 300),
  admin_image_name: stringOptional("Admin Image Name", 0, 300),

  // Main Field Details
  admin_name: stringMandatory("Admin Name", 3, 100),
  email: stringMandatory("Email", 3, 100),
  mobile: stringOptional("Password", 0, 15),
});
export type UserAdminProfileDTO = z.infer<typeof UserAdminProfileSchema>;

// UserAdmin Query Schema
export const UserAdminQuerySchema = BaseQuerySchema.extend({
  // Self Table
  admin_ids: multi_select_optional("UserAdmin"), // Multi-Selection -> UserAdmin

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

  UserAdminFileSchema:
    row.UserAdminFile?.map((file) => ({
      admin_file_id: file.admin_file_id || "",

      usage_type: file.usage_type,

      file_type: file.file_type,
      file_url: file.file_url || "",
      file_key: file.file_key || "",
      file_name: file.file_name || "",
      file_description: file.file_description || "",
      file_size: file.file_size || 0,
      file_metadata: file.file_metadata || {},

      status: file.status,
      added_date_time: file.added_date_time,
      modified_date_time: file.modified_date_time,

      admin_id: file.admin_id ?? "",
    })) ?? [],
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

  UserAdminFileSchema: [],

  status: Status.Active,
});

// AWS S3 PRESIGNED
export const get_admin_image_presigned_url = async (fileName: string): Promise<BR<AWSPresignedUrl>> => {
  return apiGet<BR<AWSPresignedUrl>>(ENDPOINTS.get_admin_image_presigned_url(fileName));
};

export const get_user_admin_file_presigned_url = async (data: FilePresignedUrlDTO): Promise<BR<AWSPresignedUrl>> => {
  return apiPost<BR<AWSPresignedUrl>, FilePresignedUrlDTO>(ENDPOINTS.get_user_admin_file_presigned_url, data);
};

// File Uploads
export const update_admin_image = async (id: string, data: UserAdminLogoDTO): Promise<SBR> => {
  return apiPatch<SBR, UserAdminLogoDTO>(ENDPOINTS.update_admin_image(id), data);
};

export const remove_admin_image = async (id: string): Promise<SBR> => {
  return apiDelete<SBR>(ENDPOINTS.remove_admin_image(id));
};

export const create_user_admin_file = async (data: UserAdminFileDTO): Promise<SBR> => {
  return apiPost<SBR, UserAdminFileDTO>(ENDPOINTS.create_user_admin_file, data);
};

export const remove_user_admin_file = async (id: string): Promise<SBR> => {
  return apiDelete<SBR>(ENDPOINTS.remove_user_admin_file(id));
};

// UserAdmin APIs
export const findUserAdmin = async (data: UserAdminQueryDTO): Promise<FBR<UserAdmin[]>> => {
  return apiPost<FBR<UserAdmin[]>, UserAdminQueryDTO>(ENDPOINTS.find, data);
};

export const createUserAdmin = async (data: UserAdminDTO): Promise<CUBR<UserAdmin>> => {
  return apiPost<CUBR<UserAdmin>, UserAdminDTO>(ENDPOINTS.create, data);
};

export const updateUserAdmin = async (id: string,data: UserAdminDTO): Promise<CUBR<UserAdmin>> => {
  return apiPatch<CUBR<UserAdmin>, UserAdminDTO>(ENDPOINTS.update(id), data);
};

export const deleteUserAdmin = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// Update Profile
export const update_admin_profile = async (id: string,data: UserAdminProfileDTO): Promise<SBR> => {
  return apiPatch<SBR, UserAdminProfileDTO>(ENDPOINTS.update_admin_profile(id), data);
};

// Cache APIs
export const getCacheUserAdmin = async (): Promise<FBR<UserAdmin[]>> => {
  return apiGet<FBR<UserAdmin[]>>(ENDPOINTS.cache);
};
