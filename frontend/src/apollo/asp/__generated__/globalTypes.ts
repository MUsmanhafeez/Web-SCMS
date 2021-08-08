/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrganizationPostType {
  MASJID = "MASJID",
  OTHER = "OTHER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  TERMINATED = "TERMINATED",
  UNVERIFIED = "UNVERIFIED",
}

export interface AddOrganizationReqDto {
  desc?: string | null;
  iName?: string | null;
  images?: string[] | null;
  location: string;
  name: string;
  phone: string;
  totalAmount?: number | null;
  type: OrganizationPostType;
}

export interface ModifyOrganizationReqDto {
  desc?: string | null;
  iName?: string | null;
  name: string;
  orgId: Uuid;
  phone: string;
  totalAmount?: number | null;
  type: OrganizationPostType;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
