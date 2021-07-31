import { INestApplication } from '@nestjs/common'
import { ApolloClient } from '@apollo/client/core'
import { Connection } from 'typeorm'

export interface TestServer {
  app: INestApplication
  connection: Connection
  apolloClient: ApolloClient<any>
}
