import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import { Connection } from 'typeorm'
import { TestServer } from '.'
import fetch from 'cross-fetch'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  from
} from '@apollo/client/core'

export let testServer: TestServer

const authLink = (accessToken: string) =>
  new ApolloLink((operation, forward) => {
    // Retrieve the access token from local storage.
    const headers: any = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`
        }
      : undefined
    operation.setContext({
      headers: headers
    })
    // Call the next link in the middleware chain.
    return forward(operation)
  })

const link = new HttpLink({
  uri: `http://localhost:${process.env.ASP_BACKEND_APP_PORT}/graphql`,
  credentials: `same-origin`,
  fetch
})

export const createApolloClient = (
  accessToken: string = null
): ApolloClient<any> => {
  return new ApolloClient({
    ssrMode: typeof window === `undefined`,
    link: from([authLink(accessToken), link]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: `network-only`
      }
    }
  })
}

export const setupTestServer = async (
  listenServer = false
): Promise<TestServer> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule]
  }).compile()

  const app: INestApplication = moduleFixture.createNestApplication()
  await app.init()
  if (listenServer) await app.listenAsync(process.env.ASP_BACKEND_APP_PORT)

  const connection: Connection = moduleFixture.get<Connection>(Connection)
  const apolloClient: ApolloClient<any> = createApolloClient()

  return { app, connection, apolloClient }
}

const setup = async _jestObject => {
  testServer = await setupTestServer(true)
}

export default setup
