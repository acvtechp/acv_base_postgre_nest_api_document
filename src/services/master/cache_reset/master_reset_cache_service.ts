// Axios
import { apiGet } from '../../../core/apiCall';
import { BR, SBR } from '../../../core/BaseResponse';
import { MasterMainCountry } from '../main/master_main_country_service';
import { MasterMainDateFormat } from '../main/master_main_date_format_service';

const URL = 'master';

const ENDPOINTS = {
  reset_cache: `${URL}/reset_cache`,

  // vehicle cache
  vehicle_cache: (id: string): string => `${URL}/vehicle/cache/${id}`,
  vehicle_cache_count: (id: string): string => `${URL}/vehicle/cache_count/${id}`,
  vehicle_cache_child: (id: string): string => `${URL}/vehicle/cache_child/${id}`,

  // user cache
  user_cache: (id: string): string => `${URL}/user/cache/${id}`,
  user_cache_count: (id: string): string => `${URL}/user/cache_count/${id}`,

  // tyre cache
  tyre_cache: (id: string): string => `${URL}/tyre/cache/${id}`,
  tyre_cache_count: (id: string): string => `${URL}/tyre/cache_count/${id}`,

  // trip cache
  trip_cache: (id: string): string => `${URL}/trip/cache/${id}`,

  // spare_part cache
  spare_part_cache: (id: string): string => `${URL}/spare_parts/cache/${id}`,
  spare_part_cache_count: (id: string): string => `${URL}/spare_parts/cache_count/${id}`,

  // organisation cache
  organisation_cache: (id: string): string => `${URL}/organisation/cache/${id}`,
  organisation_cache_count: (id: string): string => `${URL}/organisation/cache_count/${id}`,
  organisation_cache_child: (id: string): string => `${URL}/organisation/cache_child/${id}`,

  // main cache
  main_cache: (id: string): string => `${URL}/main/cache/${id}`,

  // fleet cache
  fleet_cache: (id: string): string => `${URL}/fleet/cache/${id}`,

  // expense cache
  expense_cache: (id: string): string => `${URL}/expense/cache/${id}`,

  // bus cache
  bus_cache: (id: string): string => `${URL}/bus/cache/${id}`,
  bus_cache_count: (id: string): string => `${URL}/bus/cache_count/${id}`,
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