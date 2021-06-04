import { Uuid } from '@lib/graphql'
import { ObjectType, Field, ArgsType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { Organization } from 'src/entities/postgres/organization'
import { User } from 'src/entities/postgres/User'
import { UserDto } from 'src/modules/user/dtos'
interface IOrganizationListDtoParams {
  organizations: Organization[]
  user?: UserDto
}
@ObjectType()
export class OrganizationDto {
  constructor(org: Organization) {
    if (org) {
      this.id = org.id
      this.name = org.name
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
