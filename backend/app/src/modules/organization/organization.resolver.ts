import { ModifyOrganizationReqDto } from './dto/organization'
import { User } from 'src/entities/postgres/User'
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
  OrganizationRequestDto,
  AddTotalRequestDto
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
  @UseGuards(GraphqlAuthGuard)
  async addOrganization(
    @Args(`addOrganizationReqDto`) addOrganizationReqDto: AddOrganizationReqDto,
    @userDecoder() user: User
  ): Promise<OrganizationDto> {
    return await this.orgService.addOrganization(addOrganizationReqDto, user)
  }

  @Mutation(() => OrganizationDto, { name: `modifyOrganization` })
  @UseGuards(GraphqlAuthGuard)
  async modifyOrganization(
    @Args(`modifyOrgReqDto`) orgReqDto: ModifyOrganizationReqDto,
    @userDecoder() user: User
  ): Promise<OrganizationDto> {
    await this.orgService.checkRelationShipExist(orgReqDto.orgId, user.id)
    return await this.orgService.modifyOrganization(orgReqDto, user)
  }

  @Mutation(() => OrganizationDto, { name: `addTotalAmount` })
  @UseGuards(GraphqlAuthGuard)
  async addTotalAmount(
    @Args() addTotalRequestDto: AddTotalRequestDto,
    @userDecoder() user: User
  ): Promise<OrganizationDto> {
    await this.orgService.checkRelationShipExist(
      addTotalRequestDto.orgId,
      user.id
    )
    return await this.orgService.addTotalAmount(addTotalRequestDto, user)
  }

  @Mutation(() => OrganizationDto, { name: `enrollUser` })
  @UseGuards(GraphqlAuthGuard)
  async enrollUser(
    @Args('orgId') orgId: Uuid,
    @userDecoder() user: User
  ): Promise<OrganizationDto> {
    await this.orgService.checkRelationShipExist(orgId, user.id)
    return await this.orgService.enrollUser(orgId, user)
  }

  @Query(returns => Boolean, { name: `deleteOrganization` })
  @UseGuards(GraphqlAuthGuard)
  async deleteOrganization(
    @Args(`orgId`) orgId: Uuid,
    @userDecoder(`id`) userId: Uuid
  ): Promise<boolean> {
    await this.orgService.checkRelationShipExist(orgId, userId)
    return await this.orgService.deleteOrganization(orgId, userId)
  }

  @Query(returns => [OrganizationDto], { name: `allOrganization` })
  @UseGuards(GraphqlAuthGuard)
  async getAllOrganization(
    @userDecoder(`id`) userId: Uuid
  ): Promise<OrganizationDto[]> {
    return await this.orgService.getAllOrganization(userId)
  }
  @Query(returns => [OrganizationDto], { name: `myOrganizationList` })
  @UseGuards(GraphqlAuthGuard)
  async getOrganizationList(
    @Args() { listMembers }: OrganizationListRequestDto,
    @userDecoder() user: User
  ): Promise<OrganizationDto[]> {
    return await this.orgService._getUserOrganizations(user, listMembers)
  }
}
