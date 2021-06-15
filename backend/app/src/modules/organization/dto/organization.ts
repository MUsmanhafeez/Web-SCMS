import { Uuid } from '@lib/graphql'
import { ObjectType, Field, ArgsType, InputType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import {
  IOrganizationParams,
  Organization
} from 'src/entities/postgres/organization'
import { User } from 'src/entities/postgres/User'
import { UserDto } from 'src/modules/user/dtos'
interface IOrganizationListDtoParams {
  organizations: Organization[]
  user?: UserDto
}
@ObjectType()
export class OrganizationDto {
  constructor(org: IOrganizationParams) {
    if (org) {
      this.id = org.id
      this.name = org.name
      this.iName = org.iName
      this.desc = org.desc
      this.phone = org.phone
      this.location = org.location
      this.createdAt = org.createdAt
      this.updatedAt = org.updatedAt
      this.users = org.users
    }
  }

  @Field()
  id: Uuid

  @Field()
  name: string

  @Field()
  iName: string

  @Field()
  desc: string

  @Field()
  phone: number

  @Field()
  location: string

  @Field()
  readonly createdAt: Date

  @Field()
  readonly updatedAt: Date

  @Field(type => [UserDto], { nullable: `itemsAndList` })
  @IsOptional()
  users?: User[]
}
@ObjectType()
export class OrganizationListDto {
  constructor(params: IOrganizationListDtoParams) {
    if (params) {
      this.organizations = params.organizations
      this.user = params.user
    }
  }

  @Field(type => UserDto, { nullable: true })
  @IsOptional()
  user?: UserDto

  @Field(type => [OrganizationDto])
  organizations: Organization[]
}

@ArgsType()
export class OrganizationListRequestDto {
  @Field({ nullable: true })
  @IsOptional()
  listMembers?: boolean
}

@ArgsType()
export class OrganizationRequestDto {
  @Field({ nullable: true })
  @IsOptional()
  listMembers?: boolean

  @Field()
  orgId?: Uuid
}

@InputType()
export class AddOrganizationReqDto {
  @Field()
  name: string

  @Field({ nullable: true })
  iName: string

  @Field({ nullable: true })
  desc: string

  @Field()
  phone: number

  @Field()
  location: string
}
