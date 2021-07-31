/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddOrganizationReqDto, OrganizationPostType, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMAddOrganization
// ====================================================

export interface GqlMAddOrganization_addOrganization_users_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMAddOrganization_addOrganization_users_organizations {
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
  users: (GqlMAddOrganization_addOrganization_users_organizations_users | null)[] | null;
}

export interface GqlMAddOrganization_addOrganization_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  organizations: (GqlMAddOrganization_addOrganization_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMAddOrganization_addOrganization {
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
  users: (GqlMAddOrganization_addOrganization_users | null)[] | null;
}

export interface GqlMAddOrganization {
  addOrganization: GqlMAddOrganization_addOrganization;
}

export interface GqlMAddOrganizationVariables {
  addOrganizationReqDto: AddOrganizationReqDto;
}
