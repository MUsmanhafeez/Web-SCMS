import { Uuid } from '@lib/graphql'
import { IsOptional } from 'class-validator'
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
  ManyToMany
} from 'typeorm'
import { OrganizationPostType } from '../OrganizationMembers/types'
import { User } from '../User'
export interface IOrganizationParams {
  id?: Uuid
  name: string
  iName?: string
  desc: string
  phone: string
  location?: string
  type: OrganizationPostType
  users?: User[]
  totalAmount?: number
  ownerId?: string
  createdAt?: Date
  updatedAt?: Date
}

@Entity({ name: `organization`, schema: `organization` })
export class Organization {
  constructor(params: IOrganizationParams) {
    if (params) {
      this.name = params.name
      this.iName = params.iName
      this.phone = params.phone
      this.desc = params.desc
      this.location = params.location
      this.type = params.type
      this.users = params.users
      this.ownerId = params.ownerId
      this.totalAmount = params.totalAmount
    }
  }

  @PrimaryColumn(`uuid`, {
    transformer: {
      to: (value: Uuid) => value.uuid,
      from: (value: string) => new Uuid(value)
    }
  })
  readonly id: Uuid = new Uuid()

  @Index()
  @Column()
  name: string

  @Index()
  @Column()
  @IsOptional()
  iName?: string

  @Index()
  @Column()
  desc: string

  @Index()
  @Column()
  phone: string

  @Index()
  @Column()
  location: string

  @Index()
  @Column({ nullable: true })
  totalAmount: number

  @Index()
  @Column()
  ownerId: string

  @Column({
    type: `enum`,
    enum: OrganizationPostType,
    default: OrganizationPostType.OTHER
  })
  type: OrganizationPostType

  @Column()
  @CreateDateColumn()
  readonly createdAt?: Date

  @Column()
  @UpdateDateColumn()
  readonly updatedAt?: Date

  @ManyToMany(
    type => User,
    user => user.organizations
  )
  users: User[]

  getOrganization(): IOrganizationParams {
    return {
      id: this.id,
      name: this.name,
      iName: this.iName,
      phone: this.phone,
      desc: this.desc,
      location: this.location,
      users: this.users,
      type: this.type,
      createdAt: this.createdAt,
      totalAmount: this.totalAmount,
      ownerId: this.ownerId
    }
  }
}
