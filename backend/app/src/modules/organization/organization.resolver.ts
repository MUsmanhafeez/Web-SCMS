import { Uuid } from '@lib/graphql'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { OrganizationMember } from 'src/entities/postgres/OrganizationMembers'
import { GraphqlAuthGuard } from 'src/gaurds/jwt-auth.guards'
import { userDecoder } from 'src/middleware/user-decoder'

import { UserService } from '../user/user.service'
import {
  OrganizationDto,
  OrganizationListDto,
  OrganizationListRequestDto,
  OrganizationRequestDto
} from './dto'

import { OrganizationService } from './organization.service'

@Resolver(() => OrganizationMember)
export class OrganizationResolver {
  constructor(
    private readonly orgService: OrganizationService,
    private readonly userService: UserService
  ) {}

  @Query(returns => OrganizationListDto, { name: `organizationList` })
  @UseGuards(GraphqlAuthGuard)
  async getOrganizationList(
    @Args() { listMembers }: OrganizationListRequestDto,
    @userDecoder(`id`) userId: Uuid
  ): Promise<OrganizationListDto> {
    const userWithOrg = await this.userService.getUser({ id: userId }, true)
    const user = listMembers
      ? {
          id: userWithOrg.id,
          email: userWithOrg.email,
          firstName: userWithOrg.firstName,
          lastName: userWithOrg.lastName,
          status: userWithOrg.status
        }
      : null
    return new OrganizationListDto({
      organizations: userWithOrg.organizations,
      user
    })
  }

  @Query(returns => OrganizationDto, { name: `organization` })
  @UseGuards(GraphqlAuthGuard)
  async getOrganization(
    @Args() { listMembers, orgId }: OrganizationRequestDto,
    @userDecoder(`id`) userId: Uuid
  ): Promise<OrganizationDto> {
    await this.orgService.checkRelationShipExist(orgId, userId)
    return await this.orgService.getOrganization(orgId, listMembers)
  }
}
