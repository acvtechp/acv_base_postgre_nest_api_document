// Axios
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { FBR, CUBR, DBR } from '../../../core/BaseResponse';

// Other Models
import { MasterMainDateFormat } from '../../../core/Models';
import { MasterMainDateFormatQueryDTO, MasterMainDateFormatDTO } from '../../../core/ZodSchemas';

const URL = 'master/main/date_format';

const ENDPOINTS = {
  // MasterMainDateFormat APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // Cache APIs
  cache: `${URL}/cache`,
};

// MasterMainDateFormat APIs
export const findMasterMainDateFormat = async (data: MasterMainDateFormatQueryDTO): Promise<FBR<MasterMainDateFormat[]>> => {
  return apiPost<FBR<MasterMainDateFormat[]>, MasterMainDateFormatQueryDTO>(ENDPOINTS.find, data);
};

export const createMasterMainDateFormat = async (data: MasterMainDateFormatDTO): Promise<CUBR<MasterMainDateFormat>> => {
  return apiPost<CUBR<MasterMainDateFormat>, MasterMainDateFormatDTO>(ENDPOINTS.create, data);
};

export const updateMasterMainDateFormat = async (id: string, data: MasterMainDateFormatDTO): Promise<CUBR<MasterMainDateFormat>> => {
  return apiPatch<CUBR<MasterMainDateFormat>, MasterMainDateFormatDTO>(ENDPOINTS.update(id), data);
};

export const deleteMasterMainDateFormat = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// Cache APIs
export const getCacheMasterMainDateFormat = async (): Promise<FBR<MasterMainDateFormat[]>> => {
  return apiGet<FBR<MasterMainDateFormat[]>>(ENDPOINTS.cache);
};

