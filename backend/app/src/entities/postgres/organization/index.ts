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
}

@Entity({ name: `organization`, schema: `organization` })
export class Organization {
  constructor(params: IOrganizationParams) {
    if (params) {
      this.name = params.name
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
  @Column({
    length: 100
  })
  name: string

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
