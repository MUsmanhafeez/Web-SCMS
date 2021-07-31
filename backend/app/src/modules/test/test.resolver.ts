// Packages
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { Inject } from '@nestjs/common'

// Services
import { TestService } from './test.service'

// DTO's
import { DeleteUserResponseDto } from './dtos'

@Resolver()
export class TestResolver {
  constructor(@Inject(TestService) private testService: TestService) {}

  // Delete test user only which is created during testing
  @Mutation(() => DeleteUserResponseDto)
  async deleteTestUser(
    @Args(`email`) email: string
  ): Promise<DeleteUserResponseDto> {
    return await this.testService.deleteTestUser(email)
  }
}
