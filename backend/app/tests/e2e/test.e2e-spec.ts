import { TestServer } from '../utils'
import { registerUser, deleteTestUser, deleteUser } from '../entities'
import { randomUser, TestUser } from '../fixtures'
import { TEST_CONFIG } from '../../src/config'
import { ApolloClient } from '@apollo/client/core'
import { setupTestServer } from '../utils/globalSetup'
import { Connection } from 'typeorm'

describe(`Test Suite`, () => {
  let apolloClient: ApolloClient<any>
  let connection: Connection

  beforeAll(async () => {
    const server: TestServer = await setupTestServer()
    apolloClient = server.apolloClient
    connection = server.connection
  })
  it(`Should validate test domains`, async () => {
    const testUser: TestUser = randomUser()
    let graphQlErr: string
    try {
      await registerUser(apolloClient, testUser)
      await deleteTestUser(
        apolloClient,
        `test@random.${TEST_CONFIG.ALLOWED_TEST_DOMAIN}`
      )
    } catch (err) {
      err.graphQLErrors.map(e => {
        return (graphQlErr = e.message)
      })
    }
    expect(graphQlErr).toEqual(
      `Please provide test user with valid domain name!`
    )
    await deleteUser(connection, testUser)
  })

  it(`Should delete test user`, async () => {
    const testUser: TestUser = randomUser()
    await registerUser(apolloClient, testUser)
    const result = await deleteTestUser(apolloClient, testUser.email)
    expect(result.data.deleteTestUser.userEmail).toEqual(testUser.email)
    expect(result.data.deleteTestUser.message).toEqual(`Successfully deleted!`)
    await deleteUser(connection, testUser)
  })

  it(`Should return error user does not exit!`, async () => {
    const testUser: TestUser = randomUser()
    let graphQlErr: string
    try {
      await registerUser(apolloClient, testUser)
      await deleteTestUser(apolloClient, testUser.email)
      const result = await deleteTestUser(apolloClient, testUser.email)
    } catch (err) {
      err.graphQLErrors.map(e => {
        return (graphQlErr = e.message)
      })
    }
    expect(graphQlErr).toEqual(`User does not exit!`)
    await deleteUser(connection, testUser)
  })
})
