// Axios
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { FBR, CUBR, DBR } from '../../core/BaseResponse';

// Other Models
import { FAQDTO, FAQQueryDTO } from '../../core/ZodSchemas';
import { FAQ } from '../../core/Models';


// URL and Endpoints
const URL = 'website/faq';

const ENDPOINTS = {
  // FAQ APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

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
