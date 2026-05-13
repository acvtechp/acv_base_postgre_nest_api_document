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
import { ContactUsDetail } from '../../models/models';

// URL and Endpoints
const URL = 'website/contact_us_detail';

const ENDPOINTS = {
  // ContactUsDetail APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

// ContactUsDetail Create/Update Schema
export const ContactUsDetailSchema = z.object({
  // Main Field Details
  mobile_number: stringOptional('Mobile Number', 0, 15),
  email: stringOptional('Email', 0, 100),
  facebook_link: stringOptional('Facebook Link', 0, 300),
  twitter_link: stringOptional('Twitter Link', 0, 300),
  instagram_link: stringOptional('Instagram Link', 0, 300),
  youtube_link: stringOptional('Youtube Link', 0, 300),
  linkedin_link: stringOptional('Linkedin Link', 0, 300),
  pinterest_link: stringOptional('Pinterest Link', 0, 300),
  whats_app_chat_url: stringOptional('Whatsapp Chat URL', 0, 300),
  telegram_chat_url: stringOptional('Telegram Chat URL', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type ContactUsDetailDTO = z.infer<typeof ContactUsDetailSchema>;

// ContactUsDetail Query Schema
export const ContactUsDetailQuerySchema = BaseQuerySchema.extend({
  // Self Table
  contact_us_details_ids: multi_select_optional('ContactUsDetail'), // Multi-selection -> ContactUsDetail
});
export type ContactUsDetailQueryDTO = z.infer<
  typeof ContactUsDetailQuerySchema
>;

// Convert existing data to a payload structure
export const toContactUsDetailPayload = (detail: ContactUsDetail): ContactUsDetailDTO => ({
  mobile_number: detail.mobile_number ?? '',
  email: detail.email ?? '',
  facebook_link: detail.facebook_link ?? '',
  twitter_link: detail.twitter_link ?? '',
  instagram_link: detail.instagram_link ?? '',
  youtube_link: detail.youtube_link ?? '',
  linkedin_link: detail.linkedin_link ?? '',
  pinterest_link: detail.pinterest_link ?? '',
  whats_app_chat_url: detail.whats_app_chat_url ?? '',
  telegram_chat_url: detail.telegram_chat_url ?? '',
  status: detail.status,
});

// Generate a new payload with default values
export const newContactUsDetailPayload = (): ContactUsDetailDTO => ({
  mobile_number: '',
  email: '',
  facebook_link: '',
  twitter_link: '',
  instagram_link: '',
  youtube_link: '',
  linkedin_link: '',
  pinterest_link: '',
  whats_app_chat_url: '',
  telegram_chat_url: '',
  status: Status.Active,
});

// ContactUsDetail APIs
export const findContactUsDetail = async (data: ContactUsDetailQueryDTO): Promise<FBR<ContactUsDetail[]>> => {
  return apiPost<FBR<ContactUsDetail[]>, ContactUsDetailQueryDTO>(ENDPOINTS.find,data);
};

export const createContactUsDetail = async (data: ContactUsDetailDTO): Promise<CUBR<ContactUsDetail>> => {
  return apiPost<CUBR<ContactUsDetail>, ContactUsDetailDTO>(ENDPOINTS.create, data);
};

export const updateContactUsDetail = async (id: string,data: ContactUsDetailDTO): Promise<CUBR<ContactUsDetail>> => {
  return apiPatch<CUBR<ContactUsDetail>, ContactUsDetailDTO>(ENDPOINTS.update(id), data);
};

export const deleteContactUsDetail = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};
