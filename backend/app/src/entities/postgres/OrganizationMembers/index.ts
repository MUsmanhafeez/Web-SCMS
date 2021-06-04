import { Uuid } from '@lib/graphql'
import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'
import { OrganizationType, OrganizationStatus } from './types'

export interface IOrganizationMemberParams {
  userId: Uuid
  orgId: Uuid
  status: OrganizationStatus
  type: OrganizationType
}
@Entity({ name: `organizationMembers`, schema: `organization` })
export class OrganizationMember {
  constructor(params: IOrganizationMemberParams) {
    if (params) {
      this.orgId = params.orgId
      this.userId = params.orgId
      this.status = params.status
      this.type = params.type
    }
  }

  @Column()
  @PrimaryColumn(`uuid`, {
    transformer: {
      to: (value: Uuid) => value.uuid,
      from: (value: string) => new Uuid(value)
    }
  })
  userId: Uuid

  @Column()
  @PrimaryColumn(`uuid`, {
    transformer: {
      to: (value: Uuid) => value.uuid,
      from: (value: string) => new Uuid(value)
    }
  })
  orgId: Uuid

  @Column({
    type: `enum`,
    enum: OrganizationType,
    default: OrganizationType.NORMAL
  })
  type: OrganizationType

  @Column({
    type: `enum`,
    enum: OrganizationStatus,
    default: OrganizationStatus.ACTIVE
  })
  status: OrganizationStatus

  @Column()
  @CreateDateColumn()
  readonly joinedAt: Date

  @Column()
  @CreateDateColumn()
  readonly updatedAt: Date
}
