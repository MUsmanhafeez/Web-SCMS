import {
  AddTotalRequestDto,
  ModifyOrganizationReqDto,
  OrganizationDto
} from './dto/organization'
import { Uuid } from '@lib/graphql'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@ouato/nestjs-express-cassandra'
import { Organization } from 'src/entities/postgres/organization'
import { OrganizationMember } from 'src/entities/postgres/OrganizationMembers'
import { OrganizationType } from 'src/entities/postgres/OrganizationMembers/types'
import { User } from 'src/entities/postgres/User'
import { Repository, getConnection } from 'typeorm'
import { AddOrganizationReqDto, OrganizationMemberDto } from './dto'
@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepo: Repository<Organization>,
    @InjectRepository(OrganizationMember)
    private orgMemberRepo: Repository<OrganizationMember>
  ) {}

  async modifyOrganization(
    orgReqDto: ModifyOrganizationReqDto,
    user: User
  ): Promise<OrganizationDto> {
    const org = await this.orgRepo.findOne({
      where: { id: orgReqDto.orgId },
      relations: [`users`]
    })
    if (org.ownerId !== user.id.uuid)
      throw new HttpException(
        `You are Not an owner of that organization!`,
        HttpStatus.CONFLICT
      )
    await this.orgRepo.delete({ id: org.id })
    org.desc = orgReqDto.desc
    org.iName = orgReqDto.iName
    org.name = orgReqDto.name
    org.phone = orgReqDto.phone

    org.totalAmount && (org.totalAmount += orgReqDto.totalAmount)

    await this.orgRepo.save(org)
    return new OrganizationDto(org.getOrganization())
  }

  async _getUserOrganizations(
    user: User,
    listMembers: boolean
  ): Promise<OrganizationDto[]> {
    const organizations: Organization[] = await this.orgRepo.find({
      join: {
        alias: `organization`,
        innerJoin: { users: `organization.users` }
      },
      where: (queryCondition: any) => {
        queryCondition.where(`users.id = :userId`, { userId: user.id.uuid })
      },
      relations: listMembers && [`users`]
    })
    if (organizations.length <= 0)
      throw new HttpException(
        `User Does not exist in any Organization!`,
        HttpStatus.UNAUTHORIZED
      )
    return organizations.map(
      (org: Organization) => new OrganizationDto(org.getOrganization())
    )
  }

  async getAllOrganization(userId: Uuid): Promise<OrganizationDto[]> {
    const data = await this.orgRepo.find({
      relations: [`users`]
    })
    console.log(data)
    return data.map(res => new OrganizationDto(res.getOrganization()))
  }

  async deleteOrganization(orgId: Uuid, userId: Uuid): Promise<boolean> {
    try {
      const organization = await this.orgRepo.findOne({ id: orgId })
      if (organization.ownerId !== userId.uuid)
        throw new HttpException(
          `You are Not an owner of that organization!`,
          HttpStatus.CONFLICT
        )
      await this.orgRepo.delete({ id: orgId })
      return true
    } catch (err) {
      throw new HttpException(err, HttpStatus.CONFLICT)
    }
  }

  async addTotalAmount(
    addTotalRequestDto: AddTotalRequestDto,
    user: User
  ): Promise<OrganizationDto> {
    const org = await this.orgRepo.findOne({
      where: { id: addTotalRequestDto.orgId },
      relations: [`users`]
    })
    await this.orgRepo.delete({ id: org.id })
    const findUser = org.users.find(item => item.id.uuid === user.id.uuid)
    // if (!findUser) {
    //   console.log(`in user`)
    //   console.log(`org.id ${org.id.uuid}`)
    //   console.log(`user.id ${user.id.uuid}`)
    //   const member = new OrganizationMember({
    //     orgId: org.id,
    //     userId: user.id
    //   })

    //   await this.orgMemberRepo.save(member)
    // }
    !findUser && org.users.push(user)
    org.totalAmount += addTotalRequestDto.totalAmount
    await this.orgRepo.save(org)
    return new OrganizationDto(org.getOrganization())
  }

  async enrollUser(orgId: Uuid, user: User): Promise<OrganizationDto> {
    const org = await this.orgRepo.findOne({
      where: { id: orgId },
      relations: [`users`]
    })
    await this.orgRepo.delete({ id: org.id })
    const findUser = org.users.find(item => item.id.uuid === user.id.uuid)

    !findUser && org.users.push(user)
    await this.orgRepo.save(org)
    return new OrganizationDto(org.getOrganization())
  }

  async addOrganization(
    orgParam: AddOrganizationReqDto,
    user: User
  ): Promise<OrganizationDto> {
    const _org: Organization = new Organization({
      name: orgParam.name,
      iName: orgParam.iName,
      phone: orgParam.phone,
      desc: orgParam.desc,
      location: orgParam.location,
      type: orgParam.type,
      ownerId: user.id.uuid,
      totalAmount: orgParam.totalAmount,
      images: orgParam.images,
      users: [user]
    })
    const savedOrganization = await this.orgRepo.save(_org)
    return new OrganizationDto(savedOrganization.getOrganization())
  }

  // This method return the org
  // async getOrganization(
  //   orgId: Uuid,
  //   listMembers?: boolean
  // ): Promise<OrganizationDto> {
  //   return await this.orgRepo.findOne({
  //     where: { id: orgId },
  //     relations: listMembers && [`users`]
  //   })
  // }

  // This Method will return all ids of members of Organization
  async getOrgMembers(orgId: Uuid): Promise<User[]> {
    const organization: Organization = await this.orgRepo.findOne({
      where: { id: orgId },
      relations: [`users`]
    })
    if (!organization)
      throw new HttpException(`No organization exist!`, HttpStatus.CONFLICT)
    return organization?.users
  }

  async getOrganizationOwner(orgId: Uuid): Promise<Uuid> {
    const organization: OrganizationMember = await this.orgMemberRepo.findOne({
      where: { orgId, type: OrganizationType.OWNER }
    })
    if (!organization)
      throw new HttpException(
        `No relationShip exist between user and Org!`,
        HttpStatus.CONFLICT
      )
    return organization?.userId
  }

  // This method will update the organization owner to given userId
  async updateOrganizationOwner(
    userId: Uuid,
    orgId: Uuid
  ): Promise<OrganizationMemberDto> {
    await this.checkRelationShipExist(orgId, userId)
    const relations = await this.orgMemberRepo.find()
    let updateRelation: OrganizationMember
    for (const relation of relations) {
      if (
        relation.type === OrganizationType.NORMAL &&
        relation.userId.uuid === userId.uuid &&
        relation.orgId.uuid === orgId.uuid
      ) {
        updateRelation = await this.orgMemberRepo.save({
          ...relation,
          orgId: relation.orgId,
          userId: relation.userId,
          type: OrganizationType.OWNER
        })
      }

      if (
        relation.type === OrganizationType.OWNER &&
        relation.orgId.uuid === orgId.uuid &&
        relation.userId.uuid !== userId.uuid
      ) {
        await this.orgMemberRepo.save({
          ...relation,
          orgId: relation.orgId,
          userId: relation.userId,
          type: OrganizationType.NORMAL
        })
      }
    }

    if (!updateRelation)
      throw new HttpException(`No relationShip  Changed!`, HttpStatus.CONFLICT)
    return updateRelation
  }

  // This Method will Just check the relationship between the user and Org is exist or not
  async checkRelationShipExist(orgId: Uuid, userId: Uuid): Promise<void> {
    const checkUserInOrg = await this.orgMemberRepo.find({
      where: { orgId, userId }
    })
    if (checkUserInOrg.length === 0)
      throw new HttpException(
        `No relationShip exist between user and Org!`,
        HttpStatus.CONFLICT
      )
  }
}
