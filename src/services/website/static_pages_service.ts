// Axios
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { FBR, CUBR, DBR } from '../../core/BaseResponse';

// Zod
import { z } from 'zod';
import {
  stringOptional,
  enumMandatory,
  multi_select_optional,
} from '../../zod_utils/zod_utils';
import { BaseQuerySchema } from '../../zod_utils/zod_base_schema';

// Enums
import { Status } from '../../core/EnumsDB';

// Other Models
import { StaticPage } from '../../models/models';

// URL and Endpoints
const URL = 'website/static_page';

const ENDPOINTS = {
  // StaticPage APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// StaticPage Create/Update Schema
export const StaticPageSchema = z.object({
  // Main Field Details
  page_name: stringOptional('Page Name', 0, 100),
  page_code: stringOptional('Page Code', 0, 100),
  page_url: stringOptional('Page URL', 0, 300),
  page_content: stringOptional('Page Content', 0, 5000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type StaticPageDTO = z.infer<typeof StaticPageSchema>;

// StaticPage Query Schema
export const StaticPageQuerySchema = BaseQuerySchema.extend({
  // Self Table
  page_ids: multi_select_optional('StaticPage'), // Multi-selection -> StaticPage
});
export type StaticPageQueryDTO = z.infer<typeof StaticPageQuerySchema>;

// Convert existing data to a payload structure
export const toStaticPagePayload = (page: StaticPage): StaticPageDTO => ({
  page_name: page.page_name ?? '',
  page_code: page.page_code ?? '',
  page_url: page.page_url ?? '',
  page_content: page.page_content ?? '',
  status: page.status,
});

// Generate a new payload with default values
export const newStaticPagePayload = (): StaticPageDTO => ({
  page_name: '',
  page_code: '',
  page_url: '',
  page_content: '',
  status: Status.Active,
});

// StaticPage APIs
export const findStaticPage = async (data: StaticPageQueryDTO): Promise<FBR<StaticPage[]>> => {
  return apiPost<FBR<StaticPage[]>, StaticPageQueryDTO>(ENDPOINTS.find, data);
};

export const createStaticPage = async (data: StaticPageDTO): Promise<CUBR<StaticPage>> => {
  return apiPost<CUBR<StaticPage>, StaticPageDTO>(ENDPOINTS.create, data);
};

export const updateStaticPage = async (id: string,data: StaticPageDTO): Promise<CUBR<StaticPage>> => {
  return apiPatch<CUBR<StaticPage>, StaticPageDTO>(ENDPOINTS.update(id), data);
};

export const deleteStaticPage = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};
