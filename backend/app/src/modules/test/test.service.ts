// Packages
import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { TEST_CONFIG } from 'src/config'
import { UserService } from '../user/user.service'
import { DeleteUserResponseDto } from './dtos'

@Injectable()
export class TestService {
  private userService: UserService

  // Resolver: Delete test user only
  async deleteTestUser(email: string): Promise<DeleteUserResponseDto> {
    const isTestUser = email.split(`@`)[1] === TEST_CONFIG.ALLOWED_TEST_DOMAIN
    if (!isTestUser)
      throw new HttpException(
        `Please provide test user with valid domain name!`,
        HttpStatus.BAD_REQUEST
      )
    const deletedUser = await this.userService.deleteUser({ email: email })
    if (!deletedUser || deletedUser.affected < 1)
      throw new HttpException(`User does not exit!`, HttpStatus.NOT_FOUND)
    return new DeleteUserResponseDto(email, `Successfully deleted!`)
  }
}
