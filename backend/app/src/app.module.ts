import { ExpressCassandraModule } from '@ouato/nestjs-express-cassandra'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { GRAPHQL_SCALARS, IS_PROD } from './config'
import { ServerStatusModule } from './modules/server-status/server-status.module'
import { AuthModule } from './modules/auth/auth.module'
import { TestModule } from './modules/test/test.module'
import { UserModule } from './modules/user/user.module'
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy'
import { Module } from '@nestjs/common'
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), `src/graphql/schema.gql`),
      sortSchema: true,
      playground: IS_PROD === false,
      debug: IS_PROD === false
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    TestModule,
    UserModule
  ],
  providers: [JwtStrategy, ...GRAPHQL_SCALARS]
})
export class AppModule {}
