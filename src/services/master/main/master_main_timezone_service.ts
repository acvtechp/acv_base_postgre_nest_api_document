// Axios
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { FBR, CUBR, DBR } from '../../../core/BaseResponse';

// Zod
import { z } from 'zod';
import {
  stringMandatory,
  enumMandatory,
  single_select_mandatory,
  multi_select_optional,
  numberMandatory,
} from '../../../zod_utils/zod_utils';
import { BaseQuerySchema } from '../../../zod_utils/zod_base_schema';

// Enums
import { Status } from '../../../core/EnumsDB';

// Other Models
import { MasterMainTimeZone } from 'src/models/models';

const URL = 'master/main/time_zone';

const ENDPOINTS = {
  // MasterMainTimeZone APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // Cache APIs
  cache_all: `${URL}/cache_all`,
  cache: (country_id: string): string => `${URL}/cache?country_id=${country_id}`,
};

// MasterMainTimeZone Create/Update Schema
export const MasterMainTimeZoneSchema = z.object({
  // Relations - Parent
  country_id: single_select_mandatory('MasterMainCountry'), // Single-Selection -> MasterMainCountry

  // Main Field Details
  time_zone_code: stringMandatory('Time Zone Code', 2, 50),
  time_zone_identifier: stringMandatory('Time Zone Identifier', 2, 100),
  time_zone_abbrevation: stringMandatory('Time Zone Abbreviation', 2, 100),
  time_zone_offset: stringMandatory('Time Zone Offset', 2, 100),
  time_zone_offset_seconds: numberMandatory(
    'Time Zone Offset Seconds',
    0,
    1000000,
  ),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterMainTimeZoneDTO = z.infer<typeof MasterMainTimeZoneSchema>;

// MasterMainTimeZone Query Schema
export const MasterMainTimeZoneQuerySchema = BaseQuerySchema.extend({
  // Self Table
  time_zone_ids: multi_select_optional('MasterMainTimeZone'), // Multi-selection -> MasterMainTimeZone

  // Relations - Parent
  country_ids: multi_select_optional('MasterMainCountry'), // Multi-selection -> MasterMainCountry
});
export type MasterMainTimeZoneQueryDTO = z.infer<
  typeof MasterMainTimeZoneQuerySchema
>;

// Convert MasterMainTimeZone Data to API Payload
export const toMasterMainTimeZonePayload = (row: MasterMainTimeZone): MasterMainTimeZoneDTO => ({
  country_id: row.country_id || '',

  time_zone_identifier: row.time_zone_identifier || '',
  time_zone_code: row.time_zone_code || '',
  time_zone_abbrevation: row.time_zone_abbrevation || '',
  time_zone_offset: row.time_zone_offset || '',
  time_zone_offset_seconds: row.time_zone_offset_seconds || 0,

  status: row.status || Status.Active,
});

// Create New MasterMainTimeZone Payload
export const newMasterMainTimeZonePayload = (): MasterMainTimeZoneDTO => ({
  country_id: '',

  time_zone_identifier: '',
  time_zone_code: '',
  time_zone_abbrevation: '',
  time_zone_offset: '',
  time_zone_offset_seconds: 0,

  status: Status.Active,
});

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

export const getCacheMasterMainTimeZone = async (country_id: string): Promise<FBR<MasterMainTimeZone[]>> => {
  return apiGet<FBR<MasterMainTimeZone[]>>(ENDPOINTS.cache(country_id));
};

