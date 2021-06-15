import { Uuid } from '@lib/graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrganizationMember } from 'src/entities/postgres/OrganizationMembers'
import { GraphqlAuthGuard } from 'src/gaurds/jwt-auth.guards'
import { userDecoder } from 'src/middleware/user-decoder'

import { UserService } from '../user/user.service'
import {
  AddOrganizationReqDto,
  OrganizationDto,
  OrganizationListDto,
  OrganizationListRequestDto,
  OrganizationRequestDto
} from './dto'

import { OrganizationService } from './organization.service'

@Resolver(() => OrganizationMember)
export class OrganizationResolver {
  constructor(
    @Inject(OrganizationService)
    private readonly orgService: OrganizationService,
    private readonly userService: UserService
  ) {}

  @Mutation(() => OrganizationDto, { name: `addOrganization` })
  // @UseGuards(GraphqlAuthGuard) // TODO
  async addOrganization(
    @Args(`addOrganizationReqDto`) addOrganizationReqDto: AddOrganizationReqDto
  ): Promise<OrganizationDto> {
    return await this.orgService.addOrganization(addOrganizationReqDto)
  }

  @Query(returns => OrganizationDto, { name: `organization` })
  @UseGuards(GraphqlAuthGuard)
  async getOrganization(
    @Args()
    { listMembers, orgId }: OrganizationRequestDto,
    @userDecoder(`id`) userId: Uuid
  ): Promise<OrganizationDto> {
    await this.orgService.checkRelationShipExist(orgId, userId)
    return await this.orgService.getOrganization(orgId, listMembers)
  }
}
