// Axios
import { MasterMainCountry, MasterMainDateFormat } from '../../core/Models';
import { apiGet } from '../../core/apiCall';
import { BR, SBR } from '../../core/BaseResponse';

const URL = 'master';

const ENDPOINTS = {
  reset_cache: `${URL}/reset_cache`,
  main_cache: (id: string): string => `${URL}/main/cache/${id}`,
};

// MainAllCache Interface
export interface MainAllCache extends Record<string, unknown> {
  MasterMainCountry: MasterMainCountry[];
  MasterMainDateFormat: MasterMainDateFormat[];
}

// Cache APIs
export const reset_cache_master = async (): Promise<SBR> => {
  return apiGet<SBR>(ENDPOINTS.reset_cache);
};

// Main Cache APIs
export const main_cache = async (id: string): Promise<BR<MainAllCache>> => {
  return apiGet<BR<MainAllCache>>(ENDPOINTS.main_cache(id));
};