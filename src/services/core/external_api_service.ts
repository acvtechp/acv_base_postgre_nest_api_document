// Axios
import { APIDataShareDTO, APIDataShareLogQueryDTO, APIDataShareQueryDTO } from "../../core/ZodSchemas";
import { apiPost, apiPatch, apiDelete } from "../../core/apiCall";
import { CUBR, DBR, FBR } from "../../core/BaseResponse";

import { APIDataShare, APIDataShareLog } from '../../core/Models';
import { APIDataShareReportDTO } from "../../core/ZodSchemasCustom";

const URL = "external_api";

const ENDPOINTS = {
  // ApiDataShareManagement APIs
  find: `${URL}/data_share/search`,
  create: `${URL}/data_share`,
  update: (id: string): string => `${URL}/data_share/${id}`,
  delete: (id: string): string => `${URL}/data_share/${id}`,

  data_share_log_find: `${URL}/data_share_log/search`,

  // Reports
  get_external_apis_daily_report: `${URL}/get_external_apis_daily_report`,
  get_external_apis_monthly_report: `${URL}/get_external_apis_monthly_report`,
};

// ApiDataShare APIs
export const findApiDataShare = async (data: APIDataShareQueryDTO): Promise<FBR<APIDataShare[]>> => {
  return apiPost<FBR<APIDataShare[]>, APIDataShareQueryDTO>(ENDPOINTS.find, data);
};

export const createApiDataShare = async (data: APIDataShareDTO): Promise<CUBR<APIDataShare>> => {
  return apiPost<CUBR<APIDataShare>, APIDataShareDTO>(ENDPOINTS.create, data);
};

export const updateApiDataShare = async (id: string, data: APIDataShareDTO): Promise<CUBR<APIDataShare>> => {
  return apiPatch<CUBR<APIDataShare>, APIDataShareDTO>(ENDPOINTS.update(id), data);
};

export const deleteApiDataShare = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// Hit Log APIs
export const findApiDataShareLog = async (data: APIDataShareLogQueryDTO): Promise<FBR<APIDataShareLog[]>> => {
  return apiPost<FBR<APIDataShareLog[]>, APIDataShareLogQueryDTO>(ENDPOINTS.data_share_log_find, data);
};

// Reports
export const get_external_apis_daily_report = async (data: APIDataShareReportDTO): Promise<FBR<APIDataShare[]>> => {
  return apiPost<FBR<APIDataShare[]>, APIDataShareReportDTO>(ENDPOINTS.get_external_apis_daily_report, data);
};

export const get_external_apis_monthly_report = async (data: APIDataShareReportDTO): Promise<FBR<APIDataShare[]>> => {
  return apiPost<FBR<APIDataShare[]>, APIDataShareReportDTO>(ENDPOINTS.get_external_apis_monthly_report, data);
};
