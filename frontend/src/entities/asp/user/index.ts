import { gql } from '@apollo/client'

// Queries
export const GQLQ_USER = gql`
  query GqlUser {
    user {
      email
      firstName
      id
      lastName
      status
    }
  }
`
export const GQLM_UPDATE_USER = gql`
  mutation GqlMUser(
    $firstName: String
    $lastName: String
    $newPassword: String
    $oldPassword: String
  ) {
    user(
      firstName: $firstName
      lastName: $lastName
      newPassword: $newPassword
      oldPassword: $oldPassword
    ) {
      email
      firstName
      id
      lastName
      status
    }
  }
`
