/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlUser
// ====================================================

export interface GqlUser_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlUser {
  user: GqlUser_user;
}
