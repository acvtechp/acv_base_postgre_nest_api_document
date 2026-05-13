// Axios
import { apiPost, apiGet } from '../../core/apiCall';
import { FBR, CUBR } from '../../core/BaseResponse';

// Zod
import { z } from 'zod';
import { enumArrayOptional, multi_select_optional } from '../../zod_utils/zod_utils';
import { BaseQuerySchema } from '../../zod_utils/zod_base_schema';

// Enums
import { YesNo, ExecutionStatus, RunType } from '../../core/EnumsDB';
import { CronJobList, CronJobLog } from '../../core/Models';

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

// Monitor / History Query
export const CronMonitorQuerySchema = BaseQuerySchema.extend({
    // Enums
    is_enabled: enumArrayOptional('Is Enabled', YesNo),
    run_type: enumArrayOptional('Run Type', RunType),
    execution_status: enumArrayOptional('Execution Status', ExecutionStatus),
});
export type CronMonitorQueryDTO = z.infer<typeof CronMonitorQuerySchema>;

// CronJobLog Query
export const CronJobLogQuerySchema = BaseQuerySchema.extend({
    // Relations - Parent
    cron_job_ids: multi_select_optional('CronJobList'), // Multi-selection -> CronJobList

    // Enums
    run_type: enumArrayOptional('Run Type', RunType),
    execution_status: enumArrayOptional('Execution Status', ExecutionStatus),
    is_latest_run: enumArrayOptional('Is Latest Run', YesNo),
});
export type CronJobLogQueryDTO = z.infer<typeof CronJobLogQuerySchema>;

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

