import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'
import { UserStatus } from './types'
import { AUTH_CONFIG } from 'src/config'
import { hash } from 'bcryptjs'
import * as randomstring from 'randomstring'
import { Uuid } from '@lib/graphql'
import { Organization } from '../organization'
import { HttpException, HttpStatus } from '@nestjs/common'
export interface IUserParams {
  firstName: string
  lastName: string
  email: string
  status?: UserStatus
}

@ObjectType()
@Entity({ name: `user`, schema: `userIdm` })
export class User {
  constructor(params?: IUserParams) {
    if (params) {
      this.firstName = params.firstName
      this.lastName = params.lastName
      this.email = params.email
      this.organizations = []
      if (params.status) this.setStatus(params.status)
    }
  }

  // PrimaryGeneratedColumn decorator create error it store in uuid but return string
  // which cause in cassandra that's why we are using transformer feature
  @Field()
  @PrimaryColumn(`uuid`, {
    transformer: {
      to: (value: Uuid) => value.uuid,
      from: (value: string) => new Uuid(value)
    }
  })
  readonly id: Uuid = new Uuid()

  @ManyToMany(
    () => Organization,
    organizations => organizations.users,
    {
      cascade: true
    }
  )
  @JoinTable({
    name: `organizationMembers`,
    schema: `organization`,
    joinColumn: {
      name: `userId`,
      referencedColumnName: `id`
    },
    inverseJoinColumn: {
      name: `orgId`,
      referencedColumnName: `id`
    }
  })
  organizations: Organization[]

  @Field()
  @Column({
    length: 30,
    nullable: false
  })
  firstName: string

  @Field()
  @Column({
    length: 30,
    nullable: false
  })
  lastName: string

  @Field()
  @Index()
  @Column({
    length: 100,
    nullable: false
  })
  readonly email: string

  @Field()
  @Column()
  password: string

  @Field()
  @Column()
  salt: string

  @Field()
  @Column({
    type: `enum`,
    enum: UserStatus,
    default: UserStatus.UNVERIFIED
  })
  status: UserStatus = UserStatus.UNVERIFIED

  @Field()
  @Column()
  @CreateDateColumn()
  readonly createdAt: Date

  @Field()
  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date

  // Methods
  setStatus(status: UserStatus) {
    this.status = status
  }

  async setPassword(password: string) {
    this.salt = randomstring.generate({
      length: AUTH_CONFIG.USER_PASS_SALT_LENGTH,
      charset: `alphanumeric`
    })
    this.password = await hash(password + this.salt, 12)
  }

  setFirstName(firstName: string) {
    this.firstName = firstName
  }

  setLastName(lastName: string) {
    this.lastName = lastName
  }

  setOrganization(organization: Organization) {
    if (this.organizations.length > 3)
      throw new HttpException(
        `User can only be registered in max 3 Organization!`,
        HttpStatus.CONFLICT
      )
    this.organizations.push(organization)
  }
}
