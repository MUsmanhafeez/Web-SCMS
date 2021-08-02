/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationPostType, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMEnrollUser
// ====================================================

export interface GqlMEnrollUser_enrollUser_users_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMEnrollUser_enrollUser_users_organizations {
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
  users: (GqlMEnrollUser_enrollUser_users_organizations_users | null)[] | null;
}

export interface GqlMEnrollUser_enrollUser_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  organizations: (GqlMEnrollUser_enrollUser_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMEnrollUser_enrollUser {
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
  users: (GqlMEnrollUser_enrollUser_users | null)[] | null;
}

export interface GqlMEnrollUser {
  enrollUser: GqlMEnrollUser_enrollUser;
}

export interface GqlMEnrollUserVariables {
  orgId: Uuid;
}
