import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  MinLength
} from 'class-validator'
import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { AuthResponseDto } from './common'
import { UserDto } from 'src/modules/user/dtos'
@ArgsType()
export class RegisterRequestDto {
  @Field({
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30, {
    message: `First Name length must be less than 30`
  })
  firstName: string

  @Field({
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30, {
    message: `Last Name length must be less than 30`
  })
  lastName: string

  @Field({
    nullable: false
  })
  @IsNotEmpty()
  @IsEmail({}, { message: `Enter a valid email-address` })
  email: string

  @Field({
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(7, {
    message: `Password must be at least 7 characters long`
  })
  password: string

  @Field({
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  oidcInteractionUid: string
}

@ObjectType()
export class RegisterResponseDto {
  @Field()
  user: UserDto

  @Field()
  auth: AuthResponseDto

  constructor(userParam: UserDto, authParam: AuthResponseDto) {
    this.user = { ...userParam }
    this.auth = { ...authParam }
  }
}
