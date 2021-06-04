import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { Field, ArgsType, ObjectType } from '@nestjs/graphql'
import { UserStatus } from 'src/entities/postgres/User/types'
import { User } from 'src/entities/postgres/User'
import { Uuid } from '@lib/graphql'
import { Organization } from 'src/entities/postgres/organization'
import { OrganizationDto } from 'src/modules/organization/dto'
@ArgsType()
export class UpdateRequestDto {
  @Field({
    nullable: true
  })
  @IsString()
  @MaxLength(30, {
    message: `First name should be less than 30`
  })
  @IsOptional()
  firstName?: string

  @Field({
    nullable: true
  })
  @IsString()
  @MaxLength(30, {
    message: `Last name should be less than 30`
  })
  @IsOptional()
  lastName?: string

  @Field({
    nullable: true
  })
  @IsString()
  @MinLength(7, {
    message: `Password length must be 7 or greater`
  })
  @IsOptional()
  oldPassword?: string

  @Field({
    nullable: true
  })
  @IsString()
  @MinLength(7, {
    message: `Password length must be 7 or greater`
  })
  @IsOptional()
  newPassword?: string
}

@ObjectType()
export class UserDto {
  @Field()
  id: Uuid

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field(type => UserStatus)
  status: UserStatus

  @Field(type => [OrganizationDto], { nullable: `itemsAndList` })
  @IsOptional()
  organizations?: Organization[]

  constructor(user: User) {
    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.status = user.status
  }
}
