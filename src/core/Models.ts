/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  Status,
  FileType,
  YesNo,
  LoginFrom,
  ExecutionStatus,
  RunType,
  APIAuthType,
  AdminRole,
} from './EnumsDB';

// AWSFileKey Interface
export interface AWSFileKey extends Record<string, unknown> {
  // Primary Field
  aws_file_key_id: string;

  // Main Field Details
  file_key: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
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
  cron_name: string;
  cron_expression?: string;
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
  success_details?: string;
  error_details?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child
  CronJobLog?: CronJobLog[];

  // Relations - Child Count
  _count?: {
    CronJobLog?: number;
  };
}

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
  error_details?: string;
  success_details?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  cron_job_id: string;
  CronJobList?: CronJobList;
  app_name?: string;
  cron_name?: string;
  is_latest_run: YesNo;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// APIDataShare Interface
export interface APIDataShare extends Record<string, unknown> {
  // Primary Field
  api_data_share_id: string;

  // Main Field Details
  api_name: string;
  vendor_name: string;
  purpose?: string;
  description?: string;

  // Control
  is_enabled: YesNo;

  // Authentication
  auth_type: APIAuthType;
  api_key?: string;
  username?: string;
  password?: string;

  // Rate limit
  rate_limit_rpm: number;
  allowed_ips: string[];

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child
  APIDataShareLog?: APIDataShareLog[];

  // Relations - Child Count
  _count?: {
    APIDataShareLog?: number;
  };
}

// APIDataShareLog Interface
export interface APIDataShareLog extends Record<string, unknown> {
  // Primary Field
  api_data_share_log_id: string;

  // Main Field Details
  request_date_time: string;
  request_date_time_f: string;
  request_id?: string;
  ip_address?: string;
  user_agent?: string;
  is_auth_success: YesNo;
  failed_message?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  api_data_share_id: string;
  APIDataShare?: APIDataShare;
  api_name?: string;
  vendor_name?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// ContactUsDetail Interface
export interface ContactUsDetail extends Record<string, unknown> {
  // Primary Field
  contact_us_details_id: string;

  // Main Field Details
  mobile_number?: string;
  email?: string;
  facebook_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  youtube_link?: string;
  linkedin_link?: string;
  pinterest_link?: string;
  whats_app_chat_url?: string;
  telegram_chat_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// FAQ Interface
export interface FAQ extends Record<string, unknown> {
  // Primary Field
  faq_id: string;

  // Main Field Details
  faq_section?: string;
  faq_header?: string;
  faq_content?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// StaticPage Interface
export interface StaticPage extends Record<string, unknown> {
  // Primary Field
  page_id: string;

  // Main Field Details
  page_name?: string;
  page_code?: string;
  page_url?: string;
  page_content?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// UserAdmin Interface
export interface UserAdmin extends Record<string, unknown> {
  // Primary Field
  admin_id: string;

  // Profile Image
  admin_image_url?: string;
  admin_image_key?: string;
  admin_image_name?: string;

  // Main Field Details
  admin_name: string;
  email: string;
  mobile?: string;
  password?: string;
  admin_role: AdminRole;
  admin_details?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child
  UserAdminFile?: UserAdminFile[];
  UserAdminLoginPush?: UserAdminLoginPush[];

  // Relations - Child Count
  _count?: {
    UserAdminFile?: number;
    UserAdminLoginPush?: number;
  };
}

// UserAdminFile Interface
export interface UserAdminFile extends Record<string, unknown> {
  // Primary Field
  admin_file_id: string;

  // Main Field Details

  // Usage Type -> Aadhaar Front Image, Aadhaar Back Image,  Pan Image
  usage_type: string;

  // File Details
  file_type: FileType;
  file_url?: string;
  file_key?: string;
  file_name?: string;
  file_description?: string;
  file_size?: number;
  file_metadata?: Record<string, unknown>;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  admin_id: string;
  UserAdmin?: UserAdmin;
  admin_details?: string;
  admin_image_url?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// UserAdminLoginPush Interface
export interface UserAdminLoginPush extends Record<string, unknown> {
  // Primary Field
  admin_login_push_id: string;

  // Main Field Details
  fcm_token: string;
  platform: LoginFrom;
  user_agent?: string;
  ip_address?: string;
  device_id?: string;
  device_model?: string;
  os_name?: string;
  os_version?: string;
  browser_name?: string;
  browser_version?: string;
  app_version?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  admin_id: string;
  UserAdmin?: UserAdmin;
  admin_details?: string;
  admin_image_url?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// MasterMainCountry Interface
export interface MasterMainCountry extends Record<string, unknown> {
  // Primary Field
  country_id: string;

  // Main Field Details
  country_name: string;
  country_code: string;
  country_mobile_code: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child
  MasterMainTimeZone?: MasterMainTimeZone[];

  // Relations - Child Count
  _count?: {
    MasterMainTimeZone?: number;
  };
}

// MasterMainTimeZone Interface
export interface MasterMainTimeZone extends Record<string, unknown> {
  // Primary Field
  time_zone_id: string;

  // Main Field Details
  time_zone_code: string;
  time_zone_identifier: string;
  time_zone_abbrevation: string;
  time_zone_offset: string;
  time_zone_offset_seconds: number;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  country_id: string;
  MasterMainCountry?: MasterMainCountry;
  country_name?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// MasterMainDateFormat Interface
export interface MasterMainDateFormat extends Record<string, unknown> {
  // Primary Field
  date_format_id: string;

  // Main Field Details
  date_format_date: string;
  date_format_time: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}
