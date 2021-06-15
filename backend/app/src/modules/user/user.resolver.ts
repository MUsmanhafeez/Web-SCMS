import { Inject, UseGuards, UsePipes } from '@nestjs/common'
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'

import { User } from '../../entities/postgres/User'
import { UserService } from './user.service'
import { userDecoder } from '../../middleware/user-decoder'
import { GraphqlAuthGuard } from '../../gaurds/jwt-auth.guards'
import { UpdateRequestDto, UserDto } from './dtos'

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Mutation(() => UserDto, { name: `user` })
  @UseGuards(GraphqlAuthGuard)
  async updateUser(
    @Args() updateRequestDto: UpdateRequestDto,
    @userDecoder() user: User
  ): Promise<UserDto> {
    return await this.userService.updateUser(user, updateRequestDto)
  }

  @Query(returns => UserDto, { name: `user` })
  @UseGuards(GraphqlAuthGuard)
  getUser(@userDecoder() user: User): UserDto {
    return new UserDto(user)
  }
}
