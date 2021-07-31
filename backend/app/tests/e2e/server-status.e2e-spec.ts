import { ApolloClient, gql } from '@apollo/client/core'

import { setupTestServer } from '../utils/globalSetup'
import { TestServer } from '../utils'

describe(`Server Status Suite`, () => {
  let apolloClient: ApolloClient<any>

  beforeAll(async () => {
    const server: TestServer = await setupTestServer()
    apolloClient = server.apolloClient
  })
  it(`Status should return 'RUNNING'`, async () => {
    const { query } = apolloClient
    const result = await query({
      query: gql`
        query MyQuery {
          ServerStatus {
            status
          }
        }
      `,
      variables: {}
    })
    expect(result.data.ServerStatus).toEqual({
      status: `RUNNING`,
      __typename: `ServerStatus`
    })
  })
})
