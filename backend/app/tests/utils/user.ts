import { ApolloClient, gql } from '@apollo/client/core'
import { UpdateRequestDto } from '../../src/modules/user/dtos/user'

export async function updateUserInfo(
  apolloClient: ApolloClient<any>,
  updateUser: UpdateRequestDto
) {
  const { mutate } = apolloClient

  return await mutate({
    mutation: gql`
      mutation UpdateUserFirstName(
        $firstName: String
        $lastName: String
        $oldPassword: String
        $updatePassword: String
      ) {
        updateUserInfo(
          user: {
            firstName: $firstName
            lastName: $lastName
            oldPassword: $oldPassword
            updatePassword: $updatePassword
          }
        ) {
          user {
            email
            firstName
            lastName
            id
          }
          auth {
            accessToken
            refreshToken
          }
        }
      }
    `,
    variables: updateUser
  })
}
