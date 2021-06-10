/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from './globalTypes'

// ====================================================
// GraphQL mutation operation: GqlMUser
// ====================================================

export interface GqlMorg_org {
  __typename: 'orgDto'

  FieldName: string
  phone: Number
  desc: string
  Location: string
  id: Uuid
  lastName: string

  status: UserStatus
}

export interface GqlMorg {
  user: GqlMorg_org
}

export interface GqlMorgVariables {
  FieldName?: string | null
  Phone?: Number | null
  desc?: string | null
  Location?: string | null
  lastName?: string | null
  newPassword?: string | null
  oldPassword?: string | null
}
