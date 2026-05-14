// Axios
import { apiPost, apiGet } from '../../core/apiCall';
import { FBR, CUBR } from '../../core/BaseResponse';

import { CronJobList, CronJobLog } from '../../core/Models';
import { CronMonitorQueryDTO } from '../../core/ZodSchemasCustom';
import { CronJobLogQueryDTO } from '../../core/ZodSchemas';

const URL = 'core_cron_job';

const ENDPOINTS = {
    // CronJob APIs
    cron_job_monitor: `${URL}/cron_job_monitor`,
    cron_job_run_now: (cron_name: string): string => `${URL}/cron_job_run_now/${cron_name}`,
    cron_job_enable: (cron_name: string): string => `${URL}/cron_job_enable/${cron_name}`,
    cron_job_disable: (cron_name: string): string => `${URL}/cron_job_disable/${cron_name}`,
    cron_jobs_reset: `${URL}/cron_jobs_reset`,

    // CronJobLog APIs
    cron_job_log: `${URL}/cron_job_log/search`,
};

// CronJob APIs
export const cron_job_monitor = async (data: CronMonitorQueryDTO): Promise<FBR<CronJobList[]>> => {
    return apiPost<FBR<CronJobList[]>, CronMonitorQueryDTO>(ENDPOINTS.cron_job_monitor, data);
};

export const cron_job_run_now = async (cron_name: string): Promise<CUBR> => {
    return apiGet<CUBR>(ENDPOINTS.cron_job_run_now(cron_name));
};

export const cron_job_enable = async (cron_name: string): Promise<CUBR> => {
    return apiGet<CUBR>(ENDPOINTS.cron_job_enable(cron_name));
};

export const cron_job_disable = async (cron_name: string): Promise<CUBR> => {
    return apiGet<CUBR>(ENDPOINTS.cron_job_disable(cron_name));
};

export const cron_jobs_reset = async (): Promise<CUBR> => {
    return apiGet<CUBR>(ENDPOINTS.cron_jobs_reset);
};

// CronJobLog APIs
export const findCronJobLog = async (data: CronJobLogQueryDTO): Promise<FBR<CronJobLog[]>> => {
    return apiPost<FBR<CronJobLog[]>, CronJobLogQueryDTO>(ENDPOINTS.cron_job_log, data);
};

