/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMUser
// ====================================================

export interface GqlMUser_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMUser {
  user: GqlMUser_user;
}

export interface GqlMUserVariables {
  firstName?: string | null;
  lastName?: string | null;
  newPassword?: string | null;
  oldPassword?: string | null;
}
