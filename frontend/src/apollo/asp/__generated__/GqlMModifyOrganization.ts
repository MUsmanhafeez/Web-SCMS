/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModifyOrganizationReqDto, OrganizationPostType, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMModifyOrganization
// ====================================================

export interface GqlMModifyOrganization_modifyOrganization_users_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMModifyOrganization_modifyOrganization_users_organizations {
  __typename: "OrganizationDto";
  createdAt: DateTime;
  desc: string;
  iName: string | null;
  id: Uuid;
  location: string;
  name: string;
  ownerId: string;
  phone: string;
  totalAmount: number | null;
  type: OrganizationPostType;
  updatedAt: DateTime | null;
  users: (GqlMModifyOrganization_modifyOrganization_users_organizations_users | null)[] | null;
}

export interface GqlMModifyOrganization_modifyOrganization_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  organizations: (GqlMModifyOrganization_modifyOrganization_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMModifyOrganization_modifyOrganization {
  __typename: "OrganizationDto";
  createdAt: DateTime;
  desc: string;
  iName: string | null;
  id: Uuid;
  location: string;
  name: string;
  ownerId: string;
  phone: string;
  totalAmount: number | null;
  type: OrganizationPostType;
  updatedAt: DateTime | null;
  users: (GqlMModifyOrganization_modifyOrganization_users | null)[] | null;
}

export interface GqlMModifyOrganization {
  modifyOrganization: GqlMModifyOrganization_modifyOrganization;
}

export interface GqlMModifyOrganizationVariables {
  modifyOrgReqDto: ModifyOrganizationReqDto;
}
