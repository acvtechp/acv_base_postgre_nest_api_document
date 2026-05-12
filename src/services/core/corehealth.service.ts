// Axios
import { apiGet } from 'src/core/apiCall';
import { FBR } from 'src/core/BaseResponse';

const URL = 'core_health';

const ENDPOINTS = {
    details: `${URL}/details`,
};

export const details = async (): Promise<FBR<any[]>> => {
    return apiGet<FBR<any[]>>(ENDPOINTS.details);
};