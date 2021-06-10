/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus } from './globalTypes'

// ====================================================
// GraphQL query operation: GqlUser
// ====================================================

export interface Gqlorg_org {
  __typename: 'orgDto'

  FieldName: string
  Phone: Number
  desc: string
  Location: string
  id: Uuid
  lastName: string

  status: UserStatus
}

export interface Gqlorg {
  org: Gqlorg_org
}
