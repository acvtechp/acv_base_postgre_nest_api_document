// Axios
import { ContactUsDetailDTO, ContactUsDetailQueryDTO } from '../../core/ZodSchemas';
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { FBR, CUBR, DBR } from '../../core/BaseResponse';
import { ContactUsDetail } from '../../core/Models';

// URL and Endpoints
const URL = 'website/contact_us_detail';

const ENDPOINTS = {
  // ContactUsDetail APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

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
