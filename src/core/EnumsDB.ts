// ***************************************************
// *                   ENUMS                         *
// ***************************************************

// Common
export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum FileType {
  NoFile = 'NoFile',
  Image = 'Image',
  Video = 'Video',
  PDF = 'PDF',
  Excel = 'Excel',
}

export enum YesNo {
  Yes = 'Yes',
  No = 'No',
}

export enum LoginFrom {
  Web = 'Web',
  Android = 'Android',
  IPhone = 'IPhone',
  AndroidPWA = 'AndroidPWA',
  iOSPWA = 'iOSPWA',
}

// Cronjobs
export enum ExecutionStatus {
  REGISTERED = 'REGISTERED',
  FIRED = 'FIRED',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum RunType {
  SCHEDULED = 'SCHEDULED',
  MANUAL = 'MANUAL',
}

// EXTERNAL APIS
export enum APIAuthType {
  API_KEY = 'API_KEY',
  BASIC_AUTH = 'BASIC_AUTH',
}

// Users
// User Admin
export enum AdminRole {
  MasterAdmin = 'MasterAdmin',
  Admin = 'Admin',
}
