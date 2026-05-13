// Axios
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { FBR, CUBR, DBR } from '../../../core/BaseResponse';

// Zod
import { z } from 'zod';
import {
  stringMandatory,
  enumMandatory,
  multi_select_optional,
} from '../../../zod_utils/zod_utils';
import { BaseQuerySchema } from '../../../zod_utils/zod_base_schema';

// Enums
import { Status } from '../../../core/EnumsDB';

// Other Models
import { MasterMainDateFormat } from 'src/models/models';

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

// MasterMainDateFormat Create/Update Schema
export const MasterMainDateFormatSchema = z.object({
  // Main Field Details
  date_format_date: stringMandatory('Date Format Date', 3, 50),
  date_format_time: stringMandatory('Date Format Time', 3, 50),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterMainDateFormatDTO = z.infer<
  typeof MasterMainDateFormatSchema
>;

// MasterMainDateFormat Query Schema
export const MasterMainDateFormatQuerySchema = BaseQuerySchema.extend({
  // Self Table
  date_format_ids: multi_select_optional('Date Format'), // Multi-selection -> MasterMainDateFormat
});
export type MasterMainDateFormatQueryDTO = z.infer<
  typeof MasterMainDateFormatQuerySchema
>;

// Convert MasterMainDateFormat Data to API Payload
export const toMasterMainDateFormatPayload = (row: MasterMainDateFormat): MasterMainDateFormatDTO => ({
  date_format_date: row.date_format_date || '',
  date_format_time: row.date_format_time || '',

  status: row.status || Status.Active,
});

// Create New MasterMainDateFormat Payload
export const newMasterMainDateFormatPayload = (): MasterMainDateFormatDTO => ({
  date_format_date: '',
  date_format_time: '',

  status: Status.Active,
});

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

