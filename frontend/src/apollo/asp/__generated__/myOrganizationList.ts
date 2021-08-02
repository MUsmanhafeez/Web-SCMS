/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationPostType, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: myOrganizationList
// ====================================================

export interface myOrganizationList_myOrganizationList_users_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface myOrganizationList_myOrganizationList_users_organizations {
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
  users: (myOrganizationList_myOrganizationList_users_organizations_users | null)[] | null;
}

export interface myOrganizationList_myOrganizationList_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  organizations: (myOrganizationList_myOrganizationList_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface myOrganizationList_myOrganizationList {
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
  users: (myOrganizationList_myOrganizationList_users | null)[] | null;
}

export interface myOrganizationList {
  myOrganizationList: myOrganizationList_myOrganizationList[];
}

export interface myOrganizationListVariables {
  listMembers?: boolean | null;
}
