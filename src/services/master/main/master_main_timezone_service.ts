// Axios
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { FBR, CUBR, DBR } from '../../../core/BaseResponse';

// Other Models
import { MasterMainTimeZone } from '../../../core/Models';
import { MasterMainTimeZoneQueryDTO, MasterMainTimeZoneDTO } from '../../../core/ZodSchemas';

const URL = 'master/main/time_zone';

const ENDPOINTS = {
  // MasterMainTimeZone APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // Cache APIs
  cache_all: `${URL}/cache_all`,
  find_cache_by_country: (country_id: string): string => `${URL}/find_cache_by_country/${country_id}`,
};

// MasterMainTimeZone APIs
export const findMasterMainTimeZone = async (data: MasterMainTimeZoneQueryDTO): Promise<FBR<MasterMainTimeZone[]>> => {
  return apiPost<FBR<MasterMainTimeZone[]>, MasterMainTimeZoneQueryDTO>(ENDPOINTS.find, data);
};

export const createMasterMainTimeZone = async (data: MasterMainTimeZoneDTO): Promise<CUBR<MasterMainTimeZone>> => {
  return apiPost<CUBR<MasterMainTimeZone>, MasterMainTimeZoneDTO>(ENDPOINTS.create, data);
};

export const updateMasterMainTimeZone = async (id: string, data: MasterMainTimeZoneDTO): Promise<CUBR<MasterMainTimeZone>> => {
  return apiPatch<CUBR<MasterMainTimeZone>, MasterMainTimeZoneDTO>(ENDPOINTS.update(id), data);
};

export const deleteMasterMainTimeZone = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// Cache APIs
export const getCacheAllMasterMainTimeZone = async (): Promise<FBR<MasterMainTimeZone[]>> => {
  return apiGet<FBR<MasterMainTimeZone[]>>(ENDPOINTS.cache_all);
};

export const find_cache_by_country = async (country_id: string): Promise<FBR<MasterMainTimeZone[]>> => {
  return apiGet<FBR<MasterMainTimeZone[]>>(ENDPOINTS.find_cache_by_country(country_id));
};

