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
import { FAQ } from '../../models/models';

// URL and Endpoints
const URL = 'website/faq';

const ENDPOINTS = {
  // FAQ APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// FAQ Create/Update Schema
export const FAQSchema = z.object({
  // Main Field Details
  faq_section: stringOptional('FAQ Section', 0, 100),
  faq_header: stringOptional('FAQ Header', 0, 100),
  faq_content: stringOptional('FAQ Content', 0, 2000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type FAQDTO = z.infer<typeof FAQSchema>;

// FAQ Query Schema
export const FAQQuerySchema = BaseQuerySchema.extend({
  // Self Table
  faq_ids: multi_select_optional('FAQ'), // Multi-selection -> FAQ
});
export type FAQQueryDTO = z.infer<typeof FAQQuerySchema>;

// Convert existing data to a payload structure
export const toFaqPayload = (faq: FAQ): FAQDTO => ({
  faq_section: faq.faq_section ?? '',
  faq_header: faq.faq_header ?? '',
  faq_content: faq.faq_content ?? '',
  status: faq.status,
});

// Generate a new payload with default values
export const newFaqPayload = (): FAQDTO => ({
  faq_section: '',
  faq_header: '',
  faq_content: '',
  status: Status.Active,
});

// FAQ APIs
export const findFAQ = async (data: FAQQueryDTO): Promise<FBR<FAQ[]>> => {
  return apiPost<FBR<FAQ[]>, FAQQueryDTO>(ENDPOINTS.find, data);
};

export const createFAQ = async (data: FAQDTO): Promise<CUBR<FAQ>> => {
  return apiPost<CUBR<FAQ>, FAQDTO>(ENDPOINTS.create, data);
};

export const updateFAQ = async (id: string, data: FAQDTO): Promise<CUBR<FAQ>> => {
  return apiPatch<CUBR<FAQ>, FAQDTO>(ENDPOINTS.update(id), data);
};

export const deleteFAQ = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};
