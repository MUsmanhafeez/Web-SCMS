import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DeleteUserResponseDto {
  @Field()
  userEmail: string

  @Field()
  message: string

  constructor(userEmailParam: string, messageParam: string) {
    this.userEmail = userEmailParam
    this.message = messageParam
  }
}
