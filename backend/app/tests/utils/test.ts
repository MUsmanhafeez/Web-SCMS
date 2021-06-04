import { ApolloClient, gql } from '@apollo/client/core'

export async function deleteTestUser(
  apolloClient: ApolloClient<any>,
  email: string
) {
  const { mutate } = apolloClient
  return await mutate({
    mutation: gql`
      mutation DeleteTestUser($email: String!) {
        deleteTestUser(email: $email) {
          userEmail
          message
        }
      }
    `,
    variables: {
      email: email
    }
  })
}
