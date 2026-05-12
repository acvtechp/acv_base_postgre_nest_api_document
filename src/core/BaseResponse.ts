import { FileType, Status } from "./EnumsDB";

export interface CUBR<T = any> {
  status: boolean;
  message: string;
  error?: string;
  data?: T;
  id?: string;
}

export interface PageData {
  total_count: number;
  page_count: number;
  next_page: boolean;
  page_index: number;
}

export interface FBR<T> {
  status: boolean;
  message: string;
  page_data: PageData;
  data?: T;
  error?: string;
  summary_vehicle_data?: any;
  summary_driver_data?: any;
  summary_day_data?: any;
  summary_data?: any;
}

export interface DBR {
  status: boolean;
  message: string;
  error?: string;
}

export interface SBR {
  status: boolean;
  message: string;
  error?: string;
}

export interface BR<T> {
  status: boolean;
  message: string;
  error?: string;
  data?: T;
}

export interface AWSPresignedUrl {
  presigned_url: string;
  file_url: string;
  file_key: string;
}

export interface BaseCommonFile extends Record<string, unknown> {
  // Usage Type
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
  modified_date_time: string;
}

export const r_log = (data = {}) => {
  return data;
};