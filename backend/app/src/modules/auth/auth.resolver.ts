// Packages
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { Inject, UsePipes } from '@nestjs/common'

// Entities
import { User } from '../../entities/postgres/User'

// Services
import { AuthService } from './auth.service'

// DTOS
import {
  RegisterRequestDto,
  RegisterResponseDto,
  LoginRequestDto,
  LoginResponseDto
} from './dtos'

@Resolver(() => User)
export class AuthResolver {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  // Register new user
  @Mutation(() => RegisterResponseDto, { name: `register` })
  async register(
    @Args() registerRequestDto: RegisterRequestDto
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(registerRequestDto)
  }

  // Login User
  @Mutation(() => LoginResponseDto, { name: `login` })
  async login(
    @Args() loginRequestDto: LoginRequestDto
  ): Promise<LoginResponseDto> {
    return await this.authService.login(loginRequestDto)
  }
}
