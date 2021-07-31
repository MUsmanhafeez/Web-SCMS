import { ApolloClient, gql } from '@apollo/client/core'
import { randomUser, TestUser } from '../fixtures'
import { Connection } from 'typeorm'
import { User } from '../../src/entities/postgres/User'

import { createApolloClient } from '../utils/globalSetup'
import { RegisterResponseDto } from '../../src/modules/auth/dtos'

export const registerUser = async (
  apolloClient: ApolloClient<any>,
  testUser: any
): Promise<RegisterResponseDto | any> => {
  const { mutate } = apolloClient
  const result = await mutate({
    mutation: gql`
      mutation register(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
      ) {
        register(
          user: {
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
          }
        ) {
          user {
            id
            firstName
            lastName
            email
          }
          auth {
            accessToken
            refreshToken
          }
        }
      }
    `,
    variables: testUser
  })
  return result
}

export async function loginUser(
  apolloClient: ApolloClient<any>,
  testUser: any
) {
  const { query } = apolloClient
  return await query({
    query: gql`
      query login($email: String!, $password: String!) {
        login(user: { email: $email, password: $password }) {
          user {
            id
            firstName
            lastName
            email
          }
          auth {
            accessToken
            refreshToken
          }
        }
      }
    `,
    variables: testUser
  })
}

export async function refreshAccessToken(
  apolloClient: ApolloClient<any>,
  refreshToken: string
) {
  const { query } = apolloClient
  return await query({
    query: gql`
      mutation refreshAccessToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
          accessToken
          refreshToken
        }
      }
    `,
    variables: refreshToken
  })
}

export async function deleteUser(connection: Connection, testUser: any) {
  await connection.getRepository(User).delete({ email: `${testUser.email}` })
}

export interface NewUserApolloClient {
  testUser: TestUser
  apolloClient: ApolloClient<any>
}

export const createNewUserApolloClient = async (
  apolloClient: ApolloClient<any>,
  testUser?: TestUser
): Promise<NewUserApolloClient> => {
  const _testUser: TestUser = testUser || randomUser()
  const registerUserResp = await registerUser(apolloClient, _testUser)
  const accessToken = registerUserResp.data.register.auth.accessToken
  const _apolloClient = createApolloClient(accessToken)
  return {
    testUser: _testUser,
    apolloClient: _apolloClient
  }
}
