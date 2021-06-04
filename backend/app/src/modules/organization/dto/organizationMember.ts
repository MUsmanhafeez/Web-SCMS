import { Uuid } from '@lib/graphql'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

import {
  OrganizationStatus,
  OrganizationType
} from 'src/entities/postgres/OrganizationMembers/types'

@ObjectType()
export class OrganizationMemberDto {
  @Field()
  userId: Uuid

  @Field()
  orgId: Uuid

  @Field(type => OrganizationType)
  type: OrganizationType

  @Field(type => OrganizationStatus)
  status: OrganizationStatus
}

registerEnumType(OrganizationType, {
  name: `OrganizationType`
})

registerEnumType(OrganizationStatus, {
  name: `OrganizationStatus`
})
