// Axios
import { apiPost, apiPatch, apiDelete } from "../../core/apiCall";
import { CUBR, DBR, FBR } from "../../core/BaseResponse";

// Zod
import { z } from "zod";
import {
  stringMandatory,
  stringOptional,
  enumOptional,
  numberMandatory,
  stringArrayMandatory,
  enumMandatory,
  multi_select_optional,
  enumArrayOptional,
  dateMandatory,
  getAllEnums,
} from "../../zod_utils/zod_utils";
import { BaseQuerySchema } from "../../zod_utils/zod_base_schema";

// Enums
import { YesNo, Status, APIAuthType } from "../../core/EnumsDB";

const URL = "external_api";

const ENDPOINTS = {
  // ApiDataShareManagement APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  data_share_log_find: `${URL}/data_share_log/search`,

  // Reports
  daily_report: `${URL}/report/daily`,
  monthly_report: `${URL}/report/monthly`,
};

// APIDataShare Interface
export interface APIDataShare extends Record<string, unknown> {
  // Primary Field
  api_data_share_id: string;

  // Main Field Details
  api_name: string;
  vendor_name: string;
  purpose?: string;
  description?: string;

  // Control
  is_enabled: YesNo;

  // Authentication
  auth_type: APIAuthType;

  api_key?: string;

  username?: string;
  password?: string;

  // Rate limit
  rate_limit_rpm: number;

  allowed_ips: string[];

  // Metadata
  status: Status;
  added_date_time: string;
  modified_date_time: string;

  // Relations - Parent

  // Relations - Child
  APIDataShareLog?: APIDataShareLog[];

  // Relations - Child Count
  _count?: {
    APIDataShareLog?: number;
  };
}

// APIDataShareLog Interface
export interface APIDataShareLog extends Record<string, unknown> {
  // Primary Field
  api_data_share_log_id: string;

  // Request info
  request_date_time: string;
  request_id?: string;
  ip_address?: string;
  user_agent?: string;

  is_auth_success: YesNo;
  failed_message?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  modified_date_time: string;

  // Relations - Parent
  api_data_share_id: string;
  APIDataShare?: APIDataShare;
  api_name?: string;
  vendor_name?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {

  };
}

// APIDataShare Create/Update Schema
export const APIDataShareSchema = z.object({
  // Main Field Details
  api_name: stringMandatory('API Name', 3, 100),
  vendor_name: stringMandatory('Vendor Name', 3, 100),
  purpose: stringOptional('Purpose', 0, 200),
  description: stringOptional('Description', 0, 500),

  // Control
  is_enabled: enumOptional('Is Enabled', YesNo, YesNo.Yes),

  // Authentication
  auth_type: enumOptional('Auth Type', APIAuthType, APIAuthType.API_KEY),

  api_key: stringOptional('API Key', 0, 100),

  username: stringOptional('Username', 0, 100),
  password: stringOptional('Password', 0, 255),

  // Rate limit
  rate_limit_rpm: numberMandatory('Rate Limit rpm'),
  allowed_ips: stringArrayMandatory('Allowed IPs', 0, 100),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type APIDataShareDTO = z.infer<typeof APIDataShareSchema>;

// APIDataShare Query Schema
export const APIDataShareQuerySchema = BaseQuerySchema.extend({
  // Self Table
  api_data_share_ids: multi_select_optional('APIDataShare'), // Multi-selection -> APIDataShare

  // Enums
  is_enabled: enumArrayOptional('Is Enabled', YesNo, getAllEnums(YesNo)),
  auth_type: enumArrayOptional(
    'Auth Type',
    APIAuthType,
    getAllEnums(APIAuthType),
  ),
});
export type APIDataShareQueryDTO = z.infer<typeof APIDataShareQuerySchema>;

// APIDataShareLog Query Schema
export const APIDataShareLogQuerySchema = BaseQuerySchema.extend({
  // Self Table
  api_data_share_log_ids: multi_select_optional('APIDataShareLog'), // Multi-selection -> APIDataShareLog

  // Relations - Parent
  api_data_share_ids: multi_select_optional('APIDataShare'), // Multi-selection -> APIDataShare

  // Enums
  is_auth_success: enumArrayOptional(
    'Is Auth Success',
    YesNo,
    getAllEnums(YesNo),
  ),
});
export type APIDataShareLogQueryDTO = z.infer<
  typeof APIDataShareLogQuerySchema
>;

// APIDataShare Report Schema
export const APIDataShareReportSchema = z.object({
  date: dateMandatory('Date'),
});
export type APIDataShareReportDTO = z.infer<typeof APIDataShareReportSchema>;

// Convert ApiDataShare Data to API Payload
export const toApiDataShareManagementPayload = (row: APIDataShare): APIDataShareDTO => ({
  api_name: row.api_name || "",
  vendor_name: row.vendor_name || "",
  purpose: row.purpose || "",
  description: row.description || "",

  is_enabled: row.is_enabled || YesNo.Yes,
  auth_type: row.auth_type || APIAuthType.API_KEY,

  api_key: row.api_key || "",
  username: row.username || "",
  password: row.password || "",

  rate_limit_rpm: row.rate_limit_rpm || 0,
  allowed_ips: row.allowed_ips || [],

  status: row.status || Status.Active,
});

// Create New ApiDataSharePayload
export const newApiDataSharePayload =(): APIDataShareDTO => ({
    api_name: "",
    vendor_name: "",
    purpose: "",
    description: "",

    is_enabled: YesNo.Yes,
    auth_type: APIAuthType.API_KEY,

    api_key: "",
    username: "",
    password: "",

    rate_limit_rpm: 10,
    allowed_ips: [],

    status: Status.Active,
  });

// ApiDataShare APIs
export const findApiDataShareManagement = async (data: APIDataShareQueryDTO): Promise<FBR<APIDataShare[]>> => {
  return apiPost<FBR<APIDataShare[]>, APIDataShareQueryDTO>(ENDPOINTS.find,data);
};

export const createApiDataShareManagement = async (data: APIDataShareDTO): Promise<CUBR<APIDataShare>> => {
  return apiPost<CUBR<APIDataShare>, APIDataShareDTO>(ENDPOINTS.create, data);
};

export const updateApiDataShareManagement = async (id: string,data: APIDataShareDTO): Promise<CUBR<APIDataShare>> => {
  return apiPatch<CUBR<APIDataShare>, APIDataShareDTO>(ENDPOINTS.update(id), data);
};

export const deleteApiDataShareManagement = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// Hit Log APIs
export const findApiDataShareLog = async (data: APIDataShareLogQueryDTO): Promise<FBR<APIDataShareLog[]>> => {
  return apiPost<FBR<APIDataShareLog[]>, APIDataShareLogQueryDTO>(ENDPOINTS.data_share_log_find,data);
};

// Reports
export const getExternalApiDailyReport = async (data: APIDataShareReportDTO): Promise<FBR<APIDataShare[]>> => {
  return apiPost<FBR<APIDataShare[]>, APIDataShareReportDTO>(ENDPOINTS.daily_report,data);
};

export const getExternalApiMonthlyReport = async (data: APIDataShareReportDTO): Promise<FBR<APIDataShare[]>> => {
  return apiPost<FBR<APIDataShare[]>, APIDataShareReportDTO>(ENDPOINTS.monthly_report,data);
};
