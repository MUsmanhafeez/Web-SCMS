import { ApolloClient } from '@apollo/client/core'
import { setupTestServer } from '../utils/globalSetup'
import { Connection } from 'typeorm'
import { randomUser, TestUser } from '../fixtures'
import {
  registerUser,
  deleteUser,
  loginUser,
  refreshAccessToken
} from '../entities'
import { TestServer } from '../utils'

describe(`Auth Suite`, () => {
  let apolloClient: ApolloClient<any>
  let connection: Connection

  beforeAll(async () => {
    const server: TestServer = await setupTestServer()
    apolloClient = server.apolloClient
    connection = server.connection
  })

  it(`Auth should create user and return created user.`, async () => {
    const testUser: TestUser = randomUser()
    const { user, auth } = (
      await registerUser(apolloClient, testUser)
    ).data.register
    expect(user.id).toBeDefined()
    expect(user.firstName).toEqual(testUser.firstName)
    expect(user.lastName).toEqual(testUser.lastName)
    expect(user.email).toEqual(testUser.email)
    expect(auth.accessToken).toBeDefined()
    expect(auth.refreshToken).toBeDefined()
    await deleteUser(connection, testUser)
  })

  it(`Should login and return accessToken and refreshToken`, async () => {
    const testUser: TestUser = randomUser()
    await registerUser(apolloClient, testUser)
    const { user, auth } = (await loginUser(apolloClient, testUser)).data.login
    expect(user.id).toBeDefined()
    expect(user.firstName).toEqual(testUser.firstName)
    expect(user.lastName).toEqual(testUser.lastName)
    expect(user.email).toEqual(testUser.email)
    expect(auth.accessToken).toBeDefined()
    expect(auth.refreshToken).toBeDefined()
    await deleteUser(connection, testUser)
  })

  it(`Should generate new accessToken and refreshToken. Also old refreshToken will become invalid.`, async () => {
    const testUser: TestUser = randomUser()
    let graphQlErr: string
    try {
      await registerUser(apolloClient, testUser)
      const respLogin = (await loginUser(apolloClient, testUser)).data.login
      const respRefreshAccessToken = (
        await refreshAccessToken(apolloClient, respLogin.auth.refreshToken)
      ).data.refreshToken
      expect(respRefreshAccessToken.accessToken).toBeDefined()
      expect(respRefreshAccessToken.refreshToken).toBeDefined()
      expect(respRefreshAccessToken.refreshToken).not.toEqual(
        respLogin.auth.refreshToken
      )
      const response = await refreshAccessToken(
        apolloClient,
        respLogin.auth.refreshToken
      )
    } catch (errors) {
      return (graphQlErr = errors)
    }
    expect(graphQlErr).toEqual(`Refresh Token is expired or invalid!`)
    await deleteUser(connection, testUser)
  })
})
