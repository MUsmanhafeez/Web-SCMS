import { Uuid } from '@lib/graphql'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@ouato/nestjs-express-cassandra'
import { Organization } from 'src/entities/postgres/organization'
import { OrganizationMember } from 'src/entities/postgres/OrganizationMembers'
import { OrganizationType } from 'src/entities/postgres/OrganizationMembers/types'
import { User } from 'src/entities/postgres/User'
import { Repository } from 'typeorm'
import { OrganizationDto, OrganizationMemberDto } from './dto'

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepo: Repository<Organization>,
    @InjectRepository(OrganizationMember)
    private orgMemberRepo: Repository<OrganizationMember>
  ) {}

  // This method return the org
  async getOrganization(
    orgId: Uuid,
    listMembers?: boolean
  ): Promise<OrganizationDto> {
    return await this.orgRepo.findOne({
      where: { id: orgId },
      relations: listMembers && [`users`]
    })
  }

  async saveOrganization(organization: Organization) {
    return await this.orgRepo.save(organization)
  }

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
