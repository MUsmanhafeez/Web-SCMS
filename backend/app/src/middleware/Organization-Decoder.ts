import { OrganizationDto } from 'src/modules/organization/dto'
import { OrganizationMemberDto } from './../modules/organization/dto/organizationMember'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const OrganizationDecoder = createParamDecorator(
  (organizationKey: string, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req
    const OrganizationMember = request.OrganizationDto
    return organizationKey
      ? OrganizationDto && [organizationKey]
      : OrganizationDto
  }
)
