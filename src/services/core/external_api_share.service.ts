// Axios
import { apiGet } from '../../core/apiCall';
import { FBR } from '../../core/BaseResponse';

const URL = 'external_api_share';

const ENDPOINTS = {
    bajaj_vts_vehicle_gps_data: `${URL}/bajaj_vts_vehicle_gps_data`,
    honda_vehicle_gps_data: `${URL}/honda_vehicle_gps_data`,
};

// Bajaj VTS Vehicle GPS Data
export const getBajajVtsVehicleGpsData = async (): Promise<FBR<any[]>> => {
    return apiGet<FBR<any[]>>(ENDPOINTS.bajaj_vts_vehicle_gps_data);
};

// Honda Vehicle GPS Data
export const getHondaVehicleGpsData = async (): Promise<FBR<any[]>> => {
    return apiGet<FBR<any[]>>(ENDPOINTS.honda_vehicle_gps_data);
};