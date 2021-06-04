import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { types } from '@ouato/nestjs-express-cassandra'
import { User } from 'src/entities/postgres/User'
import { UserStatus } from '../../../entities/postgres/User/types'

@ObjectType()
export class AuthResponseDto {
  @Field()
  success: boolean

  @Field()
  returnTo: string

  constructor(success: boolean, returnTo: string) {
    this.success = success
    this.returnTo = returnTo
  }
}

registerEnumType(UserStatus, { name: `UserStatus` })
