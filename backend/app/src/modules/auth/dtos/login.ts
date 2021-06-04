import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator'
import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { AuthResponseDto } from './common'
import { UserDto } from 'src/modules/user/dtos'
@ArgsType()
export class LoginRequestDto {
  @Field({
    nullable: false
  })
  @IsNotEmpty()
  @IsEmail()
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
export class LoginResponseDto {
  @Field()
  user: UserDto

  @Field()
  auth: AuthResponseDto

  constructor(userParam: UserDto, authParam: AuthResponseDto) {
    this.user = { ...userParam }
    this.auth = { ...authParam }
  }
}
