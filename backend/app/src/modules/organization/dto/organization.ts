import { Uuid } from '@lib/graphql'
import {
  ObjectType,
  Field,
  ArgsType,
  InputType,
  registerEnumType
} from '@nestjs/graphql'
import { IsEnum, IsOptional } from 'class-validator'
import {
  IOrganizationParams,
  Organization
} from 'src/entities/postgres/organization'
import {
  OrganizationPostType,
  OrganizationType
} from 'src/entities/postgres/OrganizationMembers/types'
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
      this.type = org.type
      this.ownerId = org.ownerId
      this.totalAmount = org.totalAmount
      this.images = org.images as string[]
    }
  }

  @Field()
  id: Uuid

  @Field()
  name: string

  @Field({ nullable: true })
  @IsOptional()
  iName?: string

  @Field({ nullable: true })
  @IsOptional()
  totalAmount?: number

  @Field()
  desc: string

  @Field()
  phone: string

  @Field()
  location: string

  @Field()
  ownerId: string

  @Field(type => [String], { nullable: true })
  images: string[]

  @Field(type => OrganizationPostType)
  type: OrganizationPostType

  @Field()
  readonly createdAt: Date

  @Field({ nullable: true })
  @IsOptional()
  readonly updatedAt?: Date

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
@ArgsType()
export class AddTotalRequestDto {
  @Field()
  totalAmount?: number

  @Field()
  orgId?: Uuid
}

@InputType()
export class AddOrganizationReqDto {
  @Field()
  name: string

  @Field({ nullable: true })
  @IsOptional()
  iName?: string

  @Field({ nullable: true })
  desc: string

  @Field()
  phone: string

  @Field()
  location: string

  @Field({ nullable: true })
  totalAmount: number

  @Field(type => [String], { nullable: true })
  images: string[]

  @Field(() => OrganizationPostType)
  @IsEnum(OrganizationPostType)
  type: OrganizationPostType
}

@InputType()
export class ModifyOrganizationReqDto {
  @Field()
  orgId: Uuid

  @Field()
  name: string

  @Field({ nullable: true })
  @IsOptional()
  iName?: string

  @Field({ nullable: true })
  desc: string

  @Field()
  phone: string

  @Field({ nullable: true })
  totalAmount: number

  @Field(() => OrganizationPostType)
  @IsEnum(OrganizationPostType)
  type: OrganizationPostType
}
registerEnumType(OrganizationPostType, {
  name: `OrganizationPostType`
})
