/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMRegister
// ====================================================

export interface GqlMRegister_register_auth {
  __typename: "AuthResponseDto";
  returnTo: string;
  success: boolean;
}

export interface GqlMRegister_register_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMRegister_register {
  __typename: "RegisterResponseDto";
  auth: GqlMRegister_register_auth;
  user: GqlMRegister_register_user;
}

export interface GqlMRegister {
  register: GqlMRegister_register;
}

export interface GqlMRegisterVariables {
  email: string;
  firstName: string;
  lastName: string;
  oidcInteractionUid: string;
  password: string;
}
