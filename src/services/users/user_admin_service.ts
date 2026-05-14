// Axios
import { apiPost, apiPatch, apiDelete, apiGet } from "../../core/apiCall";
import { AWSPresignedUrl, BR, CUBR, DBR, FBR, SBR } from "../../core/BaseResponse";

// Other Models
import { UserAdminDTO, UserAdminFileDTO, UserAdminProfileImageDTO, UserAdminQueryDTO } from "../../core/ZodSchemas";
import { UserAdminProfileDTO } from "../../core/ZodSchemasCustom";
import { UserAdmin } from "../../core/Models";
import { FilePresignedUrlDTO } from "../../zod_utils/zod_base_schema";

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

// AWS S3 PRESIGNED
export const get_admin_image_presigned_url = async (fileName: string): Promise<BR<AWSPresignedUrl>> => {
  return apiGet<BR<AWSPresignedUrl>>(ENDPOINTS.get_admin_image_presigned_url(fileName));
};

export const get_user_admin_file_presigned_url = async (data: FilePresignedUrlDTO): Promise<BR<AWSPresignedUrl>> => {
  return apiPost<BR<AWSPresignedUrl>, FilePresignedUrlDTO>(ENDPOINTS.get_user_admin_file_presigned_url, data);
};

// File Uploads
export const update_admin_image = async (id: string, data: UserAdminProfileImageDTO): Promise<SBR> => {
  return apiPatch<SBR, UserAdminProfileImageDTO>(ENDPOINTS.update_admin_image(id), data);
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
