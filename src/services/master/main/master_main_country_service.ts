// Axios
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { FBR, CUBR, DBR } from '../../../core/BaseResponse';

// Other Models
import { MasterMainCountry } from '../../../core/Models';
import { MasterMainCountryQueryDTO, MasterMainCountryDTO } from '../../../core/ZodSchemas';

const URL = 'master/main/country';

const ENDPOINTS = {
  // MasterMainCountry APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // Cache APIs
  cache: `${URL}/cache`,
  cache_child: `${URL}/cache_child`,
};

// MasterMainCountry APIs
export const findMasterMainCountry = async (data: MasterMainCountryQueryDTO): Promise<FBR<MasterMainCountry[]>> => {
  return apiPost<FBR<MasterMainCountry[]>, MasterMainCountryQueryDTO>(ENDPOINTS.find, data);
};

export const createMasterMainCountry = async (data: MasterMainCountryDTO): Promise<CUBR<MasterMainCountry>> => {
  return apiPost<CUBR<MasterMainCountry>, MasterMainCountryDTO>(ENDPOINTS.create, data);
};

export const updateMasterMainCountry = async (id: string, data: MasterMainCountryDTO): Promise<CUBR<MasterMainCountry>> => {
  return apiPatch<CUBR<MasterMainCountry>, MasterMainCountryDTO>(ENDPOINTS.update(id), data);
};

export const deleteMasterMainCountry = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// Cache APIs
export const getCacheMasterMainCountry = async (): Promise<FBR<MasterMainCountry[]>> => {
  return apiGet<FBR<MasterMainCountry[]>>(ENDPOINTS.cache);
};

export const getCacheChildMasterMainCountry = async (): Promise<FBR<MasterMainCountry[]>> => {
  return apiGet<FBR<MasterMainCountry[]>>(ENDPOINTS.cache_child);
};

