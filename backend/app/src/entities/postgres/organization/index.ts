import { Uuid } from '@lib/graphql'
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
  ManyToMany
} from 'typeorm'
import { User } from '../User'
interface IOrganizationParams {
  name: string
  iName?: string
  desc: string
  phone: number
  location: string
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
  iName?: string

  @Index()
  @Column()
  desc: string

  @Index()
  @Column()
  phone: number

  @Index()
  @Column({})
  location: string

  @Column()
  @CreateDateColumn()
  readonly createdAt: Date

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date

  @ManyToMany(
    type => User,
    user => user.organizations
  )
  users: User[]
}
