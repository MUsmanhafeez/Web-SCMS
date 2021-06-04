import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { UpdateRequestDto, UserDto } from './dtos/user'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcryptjs'
import { FindConditions, Repository } from 'typeorm'

import { User } from '../../entities/postgres/User'
import { UserStatus } from 'src/entities/postgres/User/types'
import { Uuid } from '@lib/graphql'
import { Organization } from 'src/entities/postgres/organization'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) {}

  async updateUser(user: User, userParam: UpdateRequestDto): Promise<UserDto> {
    const { firstName, lastName, oldPassword, newPassword } = userParam

    if (
      user.firstName === firstName &&
      user.lastName === lastName &&
      !newPassword
    ) {
      throw new HttpException(`No changes!`, HttpStatus.BAD_REQUEST)
    }

    if (firstName && firstName !== user.firstName) {
      user.setFirstName(firstName)
    }

    if (lastName && lastName !== user.lastName) {
      user.setLastName(lastName)
    }

    if (newPassword) {
      if (!oldPassword)
        throw new HttpException(
          `Please provide old password!`,
          HttpStatus.BAD_REQUEST
        )

      const isEqualOldPassword = await compare(
        oldPassword + user.salt,
        user.password
      )

      if (!isEqualOldPassword)
        throw new HttpException(
          `The old password you have entered is incorrect!`,
          HttpStatus.UNAUTHORIZED
        )

      await user.setPassword(newPassword)
    }
    const _user = await this.usersRepo.save(user)
    return new UserDto(_user)
  }

  async getUser(
    condition: FindConditions<User>[] | FindConditions<User>,
    listMembers = false
  ): Promise<User> {
    return await this.usersRepo.findOne({
      where: condition,
      relations: listMembers && [`organizations`]
    })
  }

  async getUserOrganizations(userId: Uuid): Promise<Organization[]> {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
      relations: [`organizations`]
    })
    return user.organizations
  }

  async getUserWithOrganizations(userId: Uuid): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
      relations: [`organizations`]
    })
    user?.setPassword(``)
    return user
  }

  // update user status to "ACTIVE" after verification email
  async activateUserAccount(userId: Uuid): Promise<void> {
    await this.usersRepo.update(
      {
        id: userId
      },
      {
        status: UserStatus.ACTIVE
      }
    )
  }

  // change email for user
  async changeUserEmail(userId: Uuid, email: string): Promise<void> {
    await this.usersRepo.update(
      {
        id: userId
      },
      {
        email: email
      }
    )
  }

  async saveUser(user) {
    return await this.usersRepo.save(user)
  }

  async deleteUser(condition: FindConditions<User>) {
    return await this.usersRepo.delete(condition)
  }
}
