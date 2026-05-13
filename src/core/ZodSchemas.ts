import { z } from 'zod';
import { BaseQuerySchema } from '../zod_utils/zod_base_schema';
import {
  dateTimeMandatory,
  dateTimeOptional,
  dynamicJsonSchema,
  enumArrayOptional,
  enumMandatory,
  getAllEnums,
  multi_select_optional,
  numberMandatory,
  numberOptional,
  single_select_mandatory,
  single_select_optional,
  stringArrayMandatory,
  stringMandatory,
  stringOptional,
} from '../zod_utils/zod_utils';
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
import type {
  AWSFileKey,
  CronJobList,
  CronJobLog,
  APIDataShare,
  APIDataShareLog,
  ContactUsDetail,
  FAQ,
  StaticPage,
  UserAdmin,
  UserAdminFile,
  UserAdminLoginPush,
  MasterMainCountry,
  MasterMainTimeZone,
  MasterMainDateFormat,
} from './Models';

// AWSFileKey Create/Update Schema
export const AWSFileKeySchema = z.object({
  // Main Field Details
  file_key: stringMandatory('File Key', 2, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type AWSFileKeyDTO = z.infer<typeof AWSFileKeySchema>;

// AWSFileKey Query Schema
export const AWSFileKeyQuerySchema = BaseQuerySchema.extend({
  // Self Table
  aws_file_key_ids: multi_select_optional('AWSFileKey'), // Multi-selection -> AWSFileKey

  // Relations - Parent

  // Enums
});
export type AWSFileKeyQueryDTO = z.infer<typeof AWSFileKeyQuerySchema>;

// Convert AWSFileKey Data to API Payload
export const toAWSFileKeyPayload = (row: AWSFileKey): AWSFileKeyDTO => ({
  file_key: row.file_key || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New AWSFileKey Payload
export const newAWSFileKeyPayload = (): AWSFileKeyDTO => ({
  file_key: '',

  status: Status.Active,

  time_zone_id: '',
});

// CronJobList Create/Update Schema
export const CronJobListSchema = z.object({
  // Main Field Details
  app_name: stringMandatory('App Name', 2, 100),
  job_name: stringMandatory('Job Name', 2, 100),
  category_name: stringOptional('Category Name', 0, 100),
  sub_category_name: stringOptional('Sub Category Name', 0, 100),
  job_description: stringOptional('Job Description', 0, 100),
  cron_name: stringMandatory('Cron Name', 2, 100),
  cron_expression: stringOptional('Cron Expression', 0, 200),
  cron_expression_description: stringOptional(
    'Cron Expression Description',
    0,
    200,
  ),
  is_enabled: enumMandatory('Is Enabled', YesNo, YesNo.Yes),

  // Next Run Details
  next_run_date_time: dateTimeOptional('Next Run Date Time'),

  // Last Run Details
  run_type: enumMandatory('Run Type', RunType, RunType.SCHEDULED),
  execution_status: enumMandatory(
    'Execution Status',
    ExecutionStatus,
    ExecutionStatus.REGISTERED,
  ),
  start_date_time: dateTimeOptional('Start Date Time'),
  end_date_time: dateTimeOptional('End Date Time'),
  success_details: stringOptional('Success Details', 0, 1000),
  error_details: stringOptional('Error Details', 0, 1000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type CronJobListDTO = z.infer<typeof CronJobListSchema>;

// CronJobList Query Schema
export const CronJobListQuerySchema = BaseQuerySchema.extend({
  // Self Table
  cron_job_ids: multi_select_optional('CronJobList'), // Multi-selection -> CronJobList

  // Relations - Parent

  // Enums
  is_enabled: enumArrayOptional('Is Enabled', YesNo, getAllEnums(YesNo)),
  run_type: enumArrayOptional('Run Type', RunType, getAllEnums(RunType)),
  execution_status: enumArrayOptional(
    'Execution Status',
    ExecutionStatus,
    getAllEnums(ExecutionStatus),
  ),
});
export type CronJobListQueryDTO = z.infer<typeof CronJobListQuerySchema>;

// Convert CronJobList Data to API Payload
export const toCronJobListPayload = (row: CronJobList): CronJobListDTO => ({
  app_name: row.app_name || '',
  job_name: row.job_name || '',
  category_name: row.category_name || '',
  sub_category_name: row.sub_category_name || '',
  job_description: row.job_description || '',
  cron_name: row.cron_name || '',
  cron_expression: row.cron_expression || '',
  cron_expression_description: row.cron_expression_description || '',
  is_enabled: row.is_enabled || YesNo.Yes,
  next_run_date_time: row.next_run_date_time || '',
  run_type: row.run_type || RunType.SCHEDULED,
  execution_status: row.execution_status || ExecutionStatus.REGISTERED,
  start_date_time: row.start_date_time || '',
  end_date_time: row.end_date_time || '',
  success_details: row.success_details || '',
  error_details: row.error_details || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New CronJobList Payload
export const newCronJobListPayload = (): CronJobListDTO => ({
  app_name: '',
  job_name: '',
  category_name: '',
  sub_category_name: '',
  job_description: '',
  cron_name: '',
  cron_expression: '',
  cron_expression_description: '',
  is_enabled: YesNo.Yes,
  next_run_date_time: '',
  run_type: RunType.SCHEDULED,
  execution_status: ExecutionStatus.REGISTERED,
  start_date_time: '',
  end_date_time: '',
  success_details: '',
  error_details: '',

  status: Status.Active,

  time_zone_id: '',
});

// CronJobLog Create/Update Schema
export const CronJobLogSchema = z.object({
  // Relations - Parent
  cron_job_id: single_select_mandatory('CronJobList'), // Single-Selection -> CronJobList

  // Main Field Details
  run_type: enumMandatory('Run Type', RunType, RunType.SCHEDULED),
  execution_status: enumMandatory(
    'Execution Status',
    ExecutionStatus,
    ExecutionStatus.FIRED,
  ),
  start_date_time: dateTimeOptional('Start Date Time'),
  end_date_time: dateTimeOptional('End Date Time'),
  error_details: stringOptional('Error Details', 0, 1000),
  success_details: stringOptional('Success Details', 0, 1000),
  is_latest_run: enumMandatory('Is Latest Run', YesNo, YesNo.Yes),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type CronJobLogDTO = z.infer<typeof CronJobLogSchema>;

// CronJobLog Query Schema
export const CronJobLogQuerySchema = BaseQuerySchema.extend({
  // Self Table
  cron_job_log_ids: multi_select_optional('CronJobLog'), // Multi-selection -> CronJobLog

  // Relations - Parent
  cron_job_ids: multi_select_optional('CronJobList'), // Multi-selection -> CronJobList

  // Enums
  run_type: enumArrayOptional('Run Type', RunType, getAllEnums(RunType)),
  execution_status: enumArrayOptional(
    'Execution Status',
    ExecutionStatus,
    getAllEnums(ExecutionStatus),
  ),
  is_latest_run: enumArrayOptional('Is Latest Run', YesNo, getAllEnums(YesNo)),
});
export type CronJobLogQueryDTO = z.infer<typeof CronJobLogQuerySchema>;

// Convert CronJobLog Data to API Payload
export const toCronJobLogPayload = (row: CronJobLog): CronJobLogDTO => ({
  cron_job_id: row.cron_job_id || '',

  run_type: row.run_type || RunType.SCHEDULED,
  execution_status: row.execution_status || ExecutionStatus.FIRED,
  start_date_time: row.start_date_time || '',
  end_date_time: row.end_date_time || '',
  error_details: row.error_details || '',
  success_details: row.success_details || '',
  is_latest_run: row.is_latest_run || YesNo.Yes,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New CronJobLog Payload
export const newCronJobLogPayload = (): CronJobLogDTO => ({
  cron_job_id: '',

  run_type: RunType.SCHEDULED,
  execution_status: ExecutionStatus.FIRED,
  start_date_time: '',
  end_date_time: '',
  error_details: '',
  success_details: '',
  is_latest_run: YesNo.Yes,

  status: Status.Active,

  time_zone_id: '',
});

// APIDataShare Create/Update Schema
export const APIDataShareSchema = z.object({
  // Main Field Details
  api_name: stringMandatory('Api Name', 2, 100),
  vendor_name: stringMandatory('Vendor Name', 2, 100),
  purpose: stringOptional('Purpose', 0, 200),
  description: stringOptional('Description', 0, 500),

  // Control
  is_enabled: enumMandatory('Is Enabled', YesNo, YesNo.Yes),

  // Authentication
  auth_type: enumMandatory('Auth Type', APIAuthType, APIAuthType.API_KEY),
  api_key: stringOptional('Api Key', 0, 100),
  username: stringOptional('Username', 0, 100),
  password: stringOptional('Password', 0, 255),

  // Rate limit
  rate_limit_rpm: numberMandatory('Rate Limit Rpm', 0),
  allowed_ips: stringArrayMandatory('Allowed Ips'),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type APIDataShareDTO = z.infer<typeof APIDataShareSchema>;

// APIDataShare Query Schema
export const APIDataShareQuerySchema = BaseQuerySchema.extend({
  // Self Table
  api_data_share_ids: multi_select_optional('APIDataShare'), // Multi-selection -> APIDataShare

  // Relations - Parent

  // Enums
  is_enabled: enumArrayOptional('Is Enabled', YesNo, getAllEnums(YesNo)),
  auth_type: enumArrayOptional(
    'Auth Type',
    APIAuthType,
    getAllEnums(APIAuthType),
  ),
});
export type APIDataShareQueryDTO = z.infer<typeof APIDataShareQuerySchema>;

// Convert APIDataShare Data to API Payload
export const toAPIDataSharePayload = (row: APIDataShare): APIDataShareDTO => ({
  api_name: row.api_name || '',
  vendor_name: row.vendor_name || '',
  purpose: row.purpose || '',
  description: row.description || '',
  is_enabled: row.is_enabled || YesNo.Yes,
  auth_type: row.auth_type || APIAuthType.API_KEY,
  api_key: row.api_key || '',
  username: row.username || '',
  password: row.password || '',
  rate_limit_rpm: row.rate_limit_rpm ?? 0,
  allowed_ips: row.allowed_ips || [],

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New APIDataShare Payload
export const newAPIDataSharePayload = (): APIDataShareDTO => ({
  api_name: '',
  vendor_name: '',
  purpose: '',
  description: '',
  is_enabled: YesNo.Yes,
  auth_type: APIAuthType.API_KEY,
  api_key: '',
  username: '',
  password: '',
  rate_limit_rpm: 0,
  allowed_ips: [],

  status: Status.Active,

  time_zone_id: '',
});

// APIDataShareLog Create/Update Schema
export const APIDataShareLogSchema = z.object({
  // Relations - Parent
  api_data_share_id: single_select_mandatory('APIDataShare'), // Single-Selection -> APIDataShare

  // Main Field Details
  request_date_time: dateTimeMandatory('Request Date Time'),
  request_id: stringOptional('Request', 0, 100),
  ip_address: stringOptional('Ip Address', 0, 100),
  user_agent: stringOptional('User Agent', 0, 500),
  is_auth_success: enumMandatory('Is Auth Success', YesNo, YesNo.No),
  failed_message: stringOptional('Failed Message', 0, 1000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type APIDataShareLogDTO = z.infer<typeof APIDataShareLogSchema>;

// APIDataShareLog Query Schema
export const APIDataShareLogQuerySchema = BaseQuerySchema.extend({
  // Self Table
  api_data_share_log_ids: multi_select_optional('APIDataShareLog'), // Multi-selection -> APIDataShareLog

  // Relations - Parent
  api_data_share_ids: multi_select_optional('APIDataShare'), // Multi-selection -> APIDataShare

  // Enums
  is_auth_success: enumArrayOptional(
    'Is Auth Success',
    YesNo,
    getAllEnums(YesNo),
  ),
});
export type APIDataShareLogQueryDTO = z.infer<
  typeof APIDataShareLogQuerySchema
>;

// Convert APIDataShareLog Data to API Payload
export const toAPIDataShareLogPayload = (
  row: APIDataShareLog,
): APIDataShareLogDTO => ({
  api_data_share_id: row.api_data_share_id || '',

  request_date_time: row.request_date_time || '',
  request_id: row.request_id || '',
  ip_address: row.ip_address || '',
  user_agent: row.user_agent || '',
  is_auth_success: row.is_auth_success || YesNo.No,
  failed_message: row.failed_message || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New APIDataShareLog Payload
export const newAPIDataShareLogPayload = (): APIDataShareLogDTO => ({
  api_data_share_id: '',

  request_date_time: '',
  request_id: '',
  ip_address: '',
  user_agent: '',
  is_auth_success: YesNo.No,
  failed_message: '',

  status: Status.Active,

  time_zone_id: '',
});

// ContactUsDetail Create/Update Schema
export const ContactUsDetailSchema = z.object({
  // Main Field Details
  mobile_number: stringOptional('Mobile Number', 0, 15),
  email: stringOptional('Email', 0, 100),
  facebook_link: stringOptional('Facebook Link', 0, 300),
  twitter_link: stringOptional('Twitter Link', 0, 300),
  instagram_link: stringOptional('Instagram Link', 0, 300),
  youtube_link: stringOptional('Youtube Link', 0, 300),
  linkedin_link: stringOptional('Linkedin Link', 0, 300),
  pinterest_link: stringOptional('Pinterest Link', 0, 300),
  whats_app_chat_url: stringOptional('Whats App Chat Url', 0, 300),
  telegram_chat_url: stringOptional('Telegram Chat Url', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ContactUsDetailDTO = z.infer<typeof ContactUsDetailSchema>;

// ContactUsDetail Query Schema
export const ContactUsDetailQuerySchema = BaseQuerySchema.extend({
  // Self Table
  contact_us_details_ids: multi_select_optional('ContactUsDetail'), // Multi-selection -> ContactUsDetail

  // Relations - Parent

  // Enums
});
export type ContactUsDetailQueryDTO = z.infer<
  typeof ContactUsDetailQuerySchema
>;

// Convert ContactUsDetail Data to API Payload
export const toContactUsDetailPayload = (
  row: ContactUsDetail,
): ContactUsDetailDTO => ({
  mobile_number: row.mobile_number || '',
  email: row.email || '',
  facebook_link: row.facebook_link || '',
  twitter_link: row.twitter_link || '',
  instagram_link: row.instagram_link || '',
  youtube_link: row.youtube_link || '',
  linkedin_link: row.linkedin_link || '',
  pinterest_link: row.pinterest_link || '',
  whats_app_chat_url: row.whats_app_chat_url || '',
  telegram_chat_url: row.telegram_chat_url || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ContactUsDetail Payload
export const newContactUsDetailPayload = (): ContactUsDetailDTO => ({
  mobile_number: '',
  email: '',
  facebook_link: '',
  twitter_link: '',
  instagram_link: '',
  youtube_link: '',
  linkedin_link: '',
  pinterest_link: '',
  whats_app_chat_url: '',
  telegram_chat_url: '',

  status: Status.Active,

  time_zone_id: '',
});

// FAQ Create/Update Schema
export const FAQSchema = z.object({
  // Main Field Details
  faq_section: stringOptional('Faq Section', 0, 100),
  faq_header: stringOptional('Faq Header', 0, 100),
  faq_content: stringOptional('Faq Content', 0, 2000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type FAQDTO = z.infer<typeof FAQSchema>;

// FAQ Query Schema
export const FAQQuerySchema = BaseQuerySchema.extend({
  // Self Table
  faq_ids: multi_select_optional('FAQ'), // Multi-selection -> FAQ

  // Relations - Parent

  // Enums
});
export type FAQQueryDTO = z.infer<typeof FAQQuerySchema>;

// Convert FAQ Data to API Payload
export const toFAQPayload = (row: FAQ): FAQDTO => ({
  faq_section: row.faq_section || '',
  faq_header: row.faq_header || '',
  faq_content: row.faq_content || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New FAQ Payload
export const newFAQPayload = (): FAQDTO => ({
  faq_section: '',
  faq_header: '',
  faq_content: '',

  status: Status.Active,

  time_zone_id: '',
});

// StaticPage Create/Update Schema
export const StaticPageSchema = z.object({
  // Main Field Details
  page_name: stringOptional('Page Name', 0, 100),
  page_code: stringOptional('Page Code', 0, 100),
  page_url: stringOptional('Page Url', 0, 300),
  page_content: stringOptional('Page Content', 0, 5000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type StaticPageDTO = z.infer<typeof StaticPageSchema>;

// StaticPage Query Schema
export const StaticPageQuerySchema = BaseQuerySchema.extend({
  // Self Table
  page_ids: multi_select_optional('StaticPage'), // Multi-selection -> StaticPage

  // Relations - Parent

  // Enums
});
export type StaticPageQueryDTO = z.infer<typeof StaticPageQuerySchema>;

// Convert StaticPage Data to API Payload
export const toStaticPagePayload = (row: StaticPage): StaticPageDTO => ({
  page_name: row.page_name || '',
  page_code: row.page_code || '',
  page_url: row.page_url || '',
  page_content: row.page_content || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New StaticPage Payload
export const newStaticPagePayload = (): StaticPageDTO => ({
  page_name: '',
  page_code: '',
  page_url: '',
  page_content: '',

  status: Status.Active,

  time_zone_id: '',
});

// UserAdmin Create/Update Schema
export const UserAdminSchema = z.object({
  // Profile Image
  admin_image_url: stringOptional('Admin Image Url', 0, 300),
  admin_image_key: stringOptional('Admin Image Key', 0, 300),
  admin_image_name: stringOptional('Admin Image Name', 0, 300),

  // Main Field Details
  admin_name: stringMandatory('Admin Name', 2, 100),
  email: stringMandatory('Email', 2, 100),
  mobile: stringOptional('Mobile', 0, 15),
  password: stringOptional('Password', 0, 20),
  admin_role: enumMandatory('Admin Role', AdminRole, AdminRole.MasterAdmin),
  admin_details: stringOptional('Admin Details', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs
  UserAdminFileSchema: z
    .array(
      z.lazy(() =>
        UserAdminFileSchema.extend({
          admin_id: single_select_optional('UserAdmin'), // Single-Selection -> UserAdmin
        }),
      ),
    )
    .optional()
    .default([]),

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserAdminDTO = z.infer<typeof UserAdminSchema>;

// UserAdminProfileImage Schema
export const UserAdminProfileImageSchema = z.object({
  // Profile Image
  admin_image_url: stringMandatory('Admin Image URL', 0, 300),
  admin_image_key: stringMandatory('Admin Image Key', 0, 300),
  admin_image_name: stringMandatory('Admin Image Name', 0, 300),
});
export type UserAdminProfileImageDTO = z.infer<
  typeof UserAdminProfileImageSchema
>;

// UserAdmin Query Schema
export const UserAdminQuerySchema = BaseQuerySchema.extend({
  // Self Table
  admin_ids: multi_select_optional('UserAdmin'), // Multi-selection -> UserAdmin

  // Relations - Parent

  // Enums
  admin_role: enumArrayOptional(
    'Admin Role',
    AdminRole,
    getAllEnums(AdminRole),
  ),
});
export type UserAdminQueryDTO = z.infer<typeof UserAdminQuerySchema>;

// Convert UserAdmin Data to API Payload
export const toUserAdminPayload = (row: UserAdmin): UserAdminDTO => ({
  admin_image_url: row.admin_image_url || '',
  admin_image_key: row.admin_image_key || '',
  admin_image_name: row.admin_image_name || '',
  admin_name: row.admin_name || '',
  email: row.email || '',
  mobile: row.mobile || '',
  password: row.password || '',
  admin_role: row.admin_role || AdminRole.MasterAdmin,
  admin_details: row.admin_details || '',

  status: row.status || Status.Active,

  UserAdminFileSchema: (row.UserAdminFile || []).map((item) => ({
    admin_id: item.admin_id || '',

    usage_type: item.usage_type || '',
    file_type: item.file_type || FileType.Image,
    file_url: item.file_url || '',
    file_key: item.file_key || '',
    file_name: item.file_name || '',
    file_description: item.file_description || '',
    file_size: item.file_size ?? 0,
    file_metadata: item.file_metadata || {},

    status: item.status || Status.Active,

    time_zone_id: '',
  })),

  time_zone_id: '',
});

// Create New UserAdmin Payload
export const newUserAdminPayload = (): UserAdminDTO => ({
  admin_image_url: '',
  admin_image_key: '',
  admin_image_name: '',
  admin_name: '',
  email: '',
  mobile: '',
  password: '',
  admin_role: AdminRole.MasterAdmin,
  admin_details: '',

  status: Status.Active,

  UserAdminFileSchema: [],

  time_zone_id: '',
});

// UserAdminFile Create/Update Schema
export const UserAdminFileSchema = z.object({
  // Relations - Parent
  admin_id: single_select_mandatory('UserAdmin'), // Single-Selection -> UserAdmin

  // Main Field Details

  // Usage Type -> Aadhaar Front Image, Aadhaar Back Image,  Pan Image
  usage_type: stringMandatory('Usage Type', 2, 100),

  // File Details
  file_type: enumMandatory('File Type', FileType, FileType.Image),
  file_url: stringOptional('File Url', 0, 300),
  file_key: stringOptional('File Key', 0, 300),
  file_name: stringOptional('File Name', 0, 300),
  file_description: stringOptional('File Description', 0, 2000),
  file_size: numberOptional('File Size', 0),
  file_metadata: dynamicJsonSchema('File Metadata', {}),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserAdminFileDTO = z.infer<typeof UserAdminFileSchema>;

// UserAdminFile Query Schema
export const UserAdminFileQuerySchema = BaseQuerySchema.extend({
  // Self Table
  admin_file_ids: multi_select_optional('UserAdminFile'), // Multi-selection -> UserAdminFile

  // Relations - Parent
  admin_ids: multi_select_optional('UserAdmin'), // Multi-selection -> UserAdmin

  // Enums
  file_type: enumArrayOptional('File Type', FileType, getAllEnums(FileType)),
});
export type UserAdminFileQueryDTO = z.infer<typeof UserAdminFileQuerySchema>;

// Convert UserAdminFile Data to API Payload
export const toUserAdminFilePayload = (
  row: UserAdminFile,
): UserAdminFileDTO => ({
  admin_id: row.admin_id || '',

  usage_type: row.usage_type || '',
  file_type: row.file_type || FileType.Image,
  file_url: row.file_url || '',
  file_key: row.file_key || '',
  file_name: row.file_name || '',
  file_description: row.file_description || '',
  file_size: row.file_size ?? 0,
  file_metadata: row.file_metadata || {},

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserAdminFile Payload
export const newUserAdminFilePayload = (): UserAdminFileDTO => ({
  admin_id: '',

  usage_type: '',
  file_type: FileType.Image,
  file_url: '',
  file_key: '',
  file_name: '',
  file_description: '',
  file_size: 0,
  file_metadata: {},

  status: Status.Active,

  time_zone_id: '',
});

// UserAdminLoginPush Create/Update Schema
export const UserAdminLoginPushSchema = z.object({
  // Relations - Parent
  admin_id: single_select_mandatory('UserAdmin'), // Single-Selection -> UserAdmin

  // Main Field Details
  fcm_token: stringMandatory('Fcm Token', 2, 500),
  platform: enumMandatory('Platform', LoginFrom, LoginFrom.Web),
  user_agent: stringOptional('User Agent', 0, 500),
  ip_address: stringOptional('Ip Address', 0, 45),
  device_id: stringOptional('Device', 0, 120),
  device_model: stringOptional('Device Model', 0, 120),
  os_name: stringOptional('Os Name', 0, 80),
  os_version: stringOptional('Os Version', 0, 60),
  browser_name: stringOptional('Browser Name', 0, 80),
  browser_version: stringOptional('Browser Version', 0, 60),
  app_version: stringOptional('App Version', 0, 40),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserAdminLoginPushDTO = z.infer<typeof UserAdminLoginPushSchema>;

// UserAdminLoginPush Query Schema
export const UserAdminLoginPushQuerySchema = BaseQuerySchema.extend({
  // Self Table
  admin_login_push_ids: multi_select_optional('UserAdminLoginPush'), // Multi-selection -> UserAdminLoginPush

  // Relations - Parent
  admin_ids: multi_select_optional('UserAdmin'), // Multi-selection -> UserAdmin

  // Enums
  platform: enumArrayOptional('Platform', LoginFrom, getAllEnums(LoginFrom)),
});
export type UserAdminLoginPushQueryDTO = z.infer<
  typeof UserAdminLoginPushQuerySchema
>;

// Convert UserAdminLoginPush Data to API Payload
export const toUserAdminLoginPushPayload = (
  row: UserAdminLoginPush,
): UserAdminLoginPushDTO => ({
  admin_id: row.admin_id || '',

  fcm_token: row.fcm_token || '',
  platform: row.platform || LoginFrom.Web,
  user_agent: row.user_agent || '',
  ip_address: row.ip_address || '',
  device_id: row.device_id || '',
  device_model: row.device_model || '',
  os_name: row.os_name || '',
  os_version: row.os_version || '',
  browser_name: row.browser_name || '',
  browser_version: row.browser_version || '',
  app_version: row.app_version || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserAdminLoginPush Payload
export const newUserAdminLoginPushPayload = (): UserAdminLoginPushDTO => ({
  admin_id: '',

  fcm_token: '',
  platform: LoginFrom.Web,
  user_agent: '',
  ip_address: '',
  device_id: '',
  device_model: '',
  os_name: '',
  os_version: '',
  browser_name: '',
  browser_version: '',
  app_version: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterMainCountry Create/Update Schema
export const MasterMainCountrySchema = z.object({
  // Main Field Details
  country_name: stringMandatory('Country Name', 2, 100),
  country_code: stringMandatory('Country Code', 2, 10),
  country_mobile_code: stringMandatory('Country Mobile Code', 2, 10),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterMainCountryDTO = z.infer<typeof MasterMainCountrySchema>;

// MasterMainCountry Query Schema
export const MasterMainCountryQuerySchema = BaseQuerySchema.extend({
  // Self Table
  country_ids: multi_select_optional('MasterMainCountry'), // Multi-selection -> MasterMainCountry

  // Relations - Parent

  // Enums
});
export type MasterMainCountryQueryDTO = z.infer<
  typeof MasterMainCountryQuerySchema
>;

// Convert MasterMainCountry Data to API Payload
export const toMasterMainCountryPayload = (
  row: MasterMainCountry,
): MasterMainCountryDTO => ({
  country_name: row.country_name || '',
  country_code: row.country_code || '',
  country_mobile_code: row.country_mobile_code || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterMainCountry Payload
export const newMasterMainCountryPayload = (): MasterMainCountryDTO => ({
  country_name: '',
  country_code: '',
  country_mobile_code: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterMainTimeZone Create/Update Schema
export const MasterMainTimeZoneSchema = z.object({
  // Relations - Parent
  country_id: single_select_mandatory('MasterMainCountry'), // Single-Selection -> MasterMainCountry

  // Main Field Details
  time_zone_code: stringMandatory('Time Zone Code', 2, 100),
  time_zone_identifier: stringMandatory('Time Zone Identifier', 2, 100),
  time_zone_abbrevation: stringMandatory('Time Zone Abbrevation', 2, 100),
  time_zone_offset: stringMandatory('Time Zone Offset', 2, 100),
  time_zone_offset_seconds: numberMandatory('Time Zone Offset Seconds', 0),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterMainTimeZoneDTO = z.infer<typeof MasterMainTimeZoneSchema>;

// MasterMainTimeZone Query Schema
export const MasterMainTimeZoneQuerySchema = BaseQuerySchema.extend({
  // Self Table
  time_zone_ids: multi_select_optional('MasterMainTimeZone'), // Multi-selection -> MasterMainTimeZone

  // Relations - Parent
  country_ids: multi_select_optional('MasterMainCountry'), // Multi-selection -> MasterMainCountry

  // Enums
});
export type MasterMainTimeZoneQueryDTO = z.infer<
  typeof MasterMainTimeZoneQuerySchema
>;

// Convert MasterMainTimeZone Data to API Payload
export const toMasterMainTimeZonePayload = (
  row: MasterMainTimeZone,
): MasterMainTimeZoneDTO => ({
  country_id: row.country_id || '',

  time_zone_code: row.time_zone_code || '',
  time_zone_identifier: row.time_zone_identifier || '',
  time_zone_abbrevation: row.time_zone_abbrevation || '',
  time_zone_offset: row.time_zone_offset || '',
  time_zone_offset_seconds: row.time_zone_offset_seconds ?? 0,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterMainTimeZone Payload
export const newMasterMainTimeZonePayload = (): MasterMainTimeZoneDTO => ({
  country_id: '',

  time_zone_code: '',
  time_zone_identifier: '',
  time_zone_abbrevation: '',
  time_zone_offset: '',
  time_zone_offset_seconds: 0,

  status: Status.Active,

  time_zone_id: '',
});

// MasterMainDateFormat Create/Update Schema
export const MasterMainDateFormatSchema = z.object({
  // Main Field Details
  date_format_date: stringMandatory('Date Format Date', 2, 100),
  date_format_time: stringMandatory('Date Format Time', 2, 100),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterMainDateFormatDTO = z.infer<
  typeof MasterMainDateFormatSchema
>;

// MasterMainDateFormat Query Schema
export const MasterMainDateFormatQuerySchema = BaseQuerySchema.extend({
  // Self Table
  date_format_ids: multi_select_optional('MasterMainDateFormat'), // Multi-selection -> MasterMainDateFormat

  // Relations - Parent

  // Enums
});
export type MasterMainDateFormatQueryDTO = z.infer<
  typeof MasterMainDateFormatQuerySchema
>;

// Convert MasterMainDateFormat Data to API Payload
export const toMasterMainDateFormatPayload = (
  row: MasterMainDateFormat,
): MasterMainDateFormatDTO => ({
  date_format_date: row.date_format_date || '',
  date_format_time: row.date_format_time || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterMainDateFormat Payload
export const newMasterMainDateFormatPayload = (): MasterMainDateFormatDTO => ({
  date_format_date: '',
  date_format_time: '',

  status: Status.Active,

  time_zone_id: '',
});
