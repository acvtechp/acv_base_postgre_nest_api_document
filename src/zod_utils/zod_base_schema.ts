import { z } from 'zod';
import {
  PAGING,
  LoadChild,
  LoadParents,
  LoadChildCount,
  OrderBy,
  LoginFrom,
  IncludeFields,
} from '../core/EnumsBase';
import {
  enumArrayOptional,
  enumOptional,
  numberOptional,
  stringOptional,
  single_select_optional,
  getAllEnums,
  stringArrayOptional,
  dynamicJsonSchema,
  stringMandatory,
  enumMandatory,
} from './zod_utils';
import { FileType, Status, YesNo } from '../core/EnumsDB';

export const OrderBySchema = z.array(
  z.object({
    field: stringMandatory('Order Field Name', 0, 255),
    direction: enumMandatory('Order Direction', OrderBy, OrderBy.asc),
  }),
);
export type OrderByType = z.infer<typeof OrderBySchema>;

export const BaseQuerySchema = z.object({
  search: stringOptional('Search', 0, 255, ''),
  status: enumArrayOptional('Status', Status, getAllEnums(Status), 0, 10, true),
  paging: enumOptional('Paging', PAGING, PAGING.Yes),
  page_count: numberOptional('Page Count', 0, 10000, 100),
  page_index: numberOptional('Page Index', 0, 10000, 0),
  load_parents: enumOptional('Load Parents', LoadParents, LoadParents.No),
  load_parents_list: stringArrayOptional('Load Parents List'),
  load_child: enumOptional('Load Child', LoadChild, LoadChild.No),
  load_child_list: stringArrayOptional('Load Child List'),
  load_child_count: enumOptional(
    'Load Child',
    LoadChildCount,
    LoadChildCount.No,
  ),
  load_child_count_list: stringArrayOptional('Load Child List'),
  include_details: dynamicJsonSchema('Include Details', {}),
  where_relations: dynamicJsonSchema('Where Relations', {}),
  order_by: OrderBySchema.optional().default([]),
  include_master_data: enumOptional('Include Master Data', YesNo, YesNo.No),
  date_format_id: single_select_optional('MasterMainDateFormat'), // Single-Selection -> MasterMainDateFormat
  time_zone_id: single_select_optional('MasterMainTimeZone'), // Single-Selection -> MasterMainTimeZone
  include_fields: enumOptional(
    'Include Fields',
    IncludeFields,
    IncludeFields.All,
  ),
  include_fields_list: stringArrayOptional('Include Fields List'),
});
export type BaseQueryDTO = z.infer<typeof BaseQuerySchema>;

export const FILETYPE_MIME: Record<FileType, string | undefined> = {
  NoFile: undefined,
  Image: 'image/*',
  Video: 'video/*',
  PDF: 'application/pdf',
  Excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const FilePresignedUrlSchema = z.object({
  file_name: stringMandatory('File Name', 1, 255),
  file_type: enumMandatory('File Type', FileType, FileType.Image),
});
export type FilePresignedUrlDTO = z.infer<typeof FilePresignedUrlSchema>;

// BaseFileSchema Schema
export const BaseFileSchema = z.object({
  usage_type: stringMandatory('Usage Type', 3, 100),
  file_type: enumMandatory('File Type', FileType, FileType.Image),
  file_url: stringOptional('File URL', 0, 300),
  file_key: stringOptional('File Key', 0, 300),
  file_name: stringOptional('File Name', 0, 300),
  file_description: stringOptional('File Description', 0, 2000),
  file_size: numberOptional('File Size'),
  file_metadata: dynamicJsonSchema('File Metadata', {}),
  status: enumMandatory('Status', Status, Status.Active),
});
export type BaseFileDTO = z.infer<typeof BaseFileSchema>;

export const MongoBaseQuerySchema = z.object({
  search: stringOptional('Search', 0, 255, ''),
  paging: enumOptional('Paging', PAGING, PAGING.Yes),
  page_count: numberOptional('Page Count', 0, 10000, 100),
  page_index: numberOptional('Page Index', 0, 10000, 0),
  login_from: enumMandatory('Login From', LoginFrom, LoginFrom.Web),
  date_format_id: single_select_optional('MasterMainDateFormat'), // Single-Selection -> MasterMainDateFormat
  time_zone_id: single_select_optional('MasterMainTimeZone'), // Single-Selection -> MasterMainTimeZone
});
export type MongoBaseQueryDTO = z.infer<typeof MongoBaseQuerySchema>;

