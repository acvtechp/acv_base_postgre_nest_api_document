// Axios
import { apiPost, apiPatch, apiDelete } from '../../core/apiCall';
import { FBR, CUBR, DBR } from '../../core/BaseResponse';

// Other Models
import { StaticPageDTO, StaticPageQueryDTO } from '../../core/ZodSchemas';
import { StaticPage } from '../../core/Models';


// URL and Endpoints
const URL = 'website/static_page';

const ENDPOINTS = {
  // StaticPage APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,
};

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
