/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationPostType, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMAddTotalAmount
// ====================================================

export interface GqlMAddTotalAmount_addTotalAmount_users_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMAddTotalAmount_addTotalAmount_users_organizations {
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
  users: (GqlMAddTotalAmount_addTotalAmount_users_organizations_users | null)[] | null;
}

export interface GqlMAddTotalAmount_addTotalAmount_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  organizations: (GqlMAddTotalAmount_addTotalAmount_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMAddTotalAmount_addTotalAmount {
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
  users: (GqlMAddTotalAmount_addTotalAmount_users | null)[] | null;
}

export interface GqlMAddTotalAmount {
  addTotalAmount: GqlMAddTotalAmount_addTotalAmount;
}

export interface GqlMAddTotalAmountVariables {
  orgId: Uuid;
  totalAmount: number;
}
