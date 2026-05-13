import { ExecutionStatus, RunType, Status, YesNo } from "src/core/EnumsDB";

// CronJobLog Interface
export interface CronJobLog extends Record<string, unknown> {
    // Primary Field
    cron_job_log_id: string;

    // Main Field Details
    run_type: RunType;
    execution_status: ExecutionStatus;

    start_date_time?: string;
    start_date_time_f?: string;

    end_date_time?: string;
    end_date_time_f?: string;

    success_details?: string;
    error_details?: string;

    // Metadata
    status: Status;
    added_date_time: string;
    modified_date_time: string;

    // Relations - Parent
    cron_job_id: string;
    CronJobList?: CronJobList;
    app_name?: string;
    cron_name?: string;
    is_latest_run: YesNo;

    // Relations - Child

    // Relations - Child Count
    _count?: {

    };
}

// CronJobList Interface
export interface CronJobList extends Record<string, unknown> {
    // Primary Field
    cron_job_id: string;

    // Main Field Details
    app_name: string;
    job_name: string;

    category_name?: string;
    sub_category_name?: string;
    job_description?: string;

    cron_name?: string;
    cron_expression: string;
    cron_expression_description?: string;

    is_enabled: YesNo;

    // Next Run Details
    next_run_date_time?: string;
    next_run_date_time_f?: string;

    // Last Run Details
    run_type: RunType;
    execution_status: ExecutionStatus;

    start_date_time?: string;
    start_date_time_f?: string;

    end_date_time?: string;
    end_date_time_f?: string;

    error_details?: string;
    success_details?: string;

    // Metadata
    status: Status;
    added_date_time: string;
    modified_date_time: string;

    // Relations - Parent

    // Relations - Child
    CronJobLog?: CronJobLog[];

    // Relations - Child Count
    _count?: {
        CronJobLog?: number;
    };
}