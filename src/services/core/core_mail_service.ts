// Axios
import { apiGet } from '../../core/apiCall';
import { CUBR } from '../../core/BaseResponse';

const URL = 'core_mail';

const ENDPOINTS = {
    // Monitor & Logs APIs
    send_test_text_mail: (email_id: string): string => `${URL}/test_text/${email_id}`,
    send_test_html_mail: (email_id: string): string => `${URL}/test_html/${email_id}`,
};

// MailAPIs
export const send_test_text_mail = async (email_id: string): Promise<CUBR> => {
    return apiGet<CUBR>(ENDPOINTS.send_test_text_mail(email_id));
};

export const send_test_html_mail = async (email_id: string): Promise<CUBR> => {
    return apiGet<CUBR>(ENDPOINTS.send_test_html_mail(email_id));
};