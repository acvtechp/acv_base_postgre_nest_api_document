// Axios
import { apiGet } from '../../core/apiCall';
import { FBR } from '../../core/BaseResponse';

const URL = 'external_api_share';

const ENDPOINTS = {
    get_bajaj_vts_vehicle_gps_data: `${URL}/get_bajaj_vts_vehicle_gps_data`,
    get_honda_vehicle_gps_data: `${URL}/get_honda_vehicle_gps_data`,
};

// Bajaj VTS Vehicle GPS Data
export const get_bajaj_vts_vehicle_gps_data = async (): Promise<FBR<any[]>> => {
    return apiGet<FBR<any[]>>(ENDPOINTS.get_bajaj_vts_vehicle_gps_data);
};

// Honda Vehicle GPS Data
export const get_honda_vehicle_gps_data = async (): Promise<FBR<any[]>> => {
    return apiGet<FBR<any[]>>(ENDPOINTS.get_honda_vehicle_gps_data);
};