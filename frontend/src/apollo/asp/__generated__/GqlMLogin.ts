/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMLogin
// ====================================================

export interface GqlMLogin_login_auth {
  __typename: "AuthResponseDto";
  returnTo: string;
  success: boolean;
}

export interface GqlMLogin_login_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMLogin_login {
  __typename: "LoginResponseDto";
  auth: GqlMLogin_login_auth;
  user: GqlMLogin_login_user;
}

export interface GqlMLogin {
  login: GqlMLogin_login;
}

export interface GqlMLoginVariables {
  email: string;
  oidcInteractionUid: string;
  password: string;
}
