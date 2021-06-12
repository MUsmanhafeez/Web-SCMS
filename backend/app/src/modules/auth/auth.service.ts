// Packages
import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { compare } from 'bcryptjs'

// Entities
import { User } from '../../entities/postgres/User'

// Types

// DTO
import {
  RegisterRequestDto,
  RegisterResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  AuthResponseDto
} from './dtos'

// Config Variables
import { OidcService } from './oidc/oidc.service'
import {
  OidcInteraction,
  OidcInteractionPromptNames,
  OidcInteractionResult
} from './oidc/utils/type'
import { epochTime } from 'src/utils/time'

// External Services
import { UserService } from '../user/user.service'
import { UserDto } from '../user/dtos'
import { Uuid } from '@lib/graphql'
import { OrganizationService } from '../organization/organization.service'

@Injectable()
export class AuthService {
  // Constructor for initializing variables
  constructor(
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly oidcService: OidcService
  ) {}

  async register(
    registerVariables: RegisterRequestDto
  ): Promise<RegisterResponseDto> {
    const {
      email,
      password,
      firstName,
      lastName,
      oidcInteractionUid
    } = registerVariables

    const oidcInteraction: OidcInteraction = await this.oidcService.oidc.Interaction.find(
      oidcInteractionUid
    )
    if (
      !oidcInteraction ||
      oidcInteraction.prompt.name !== OidcInteractionPromptNames.LOGIN
    )
      throw new HttpException(
        `This login session has been expired, please try again`,
        HttpStatus.UNAUTHORIZED
      )
    const existingUser = await this.userService.getUser({
      email
    })
    if (existingUser)
      throw new HttpException(
        `User with this email already exits!`,
        HttpStatus.CONFLICT
      )
    // const _org = new Organization({
    //   name: `${firstName} ${lastName}`
    // })

    const user: User = new User({
      email,
      firstName,
      lastName
    })

    // await this.orgService.saveOrganization(_org)

    // user.setOrganization(_org)
    await user.setPassword(password)
    const newUser = await this.userService.saveUser(user)

    const oidcInteractionResult: OidcInteractionResult = {
      login: {
        accountId: newUser.id.uuid
      }
    }

    oidcInteraction.result = {
      ...oidcInteraction.lastSubmission,
      ...oidcInteractionResult
    }
    await oidcInteraction.save(oidcInteraction.exp - epochTime())

    const userResponse = new UserDto(newUser)
    const authResponse = new AuthResponseDto(true, oidcInteraction.returnTo)
    return new RegisterResponseDto(userResponse, authResponse)
  }

  // Resolver: Login user with email and password
  async login(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password, oidcInteractionUid } = loginRequest
    const oidcInteraction: OidcInteraction = await this.oidcService.oidc.Interaction.find(
      oidcInteractionUid
    )

    if (
      !oidcInteraction ||
      oidcInteraction.prompt.name !== OidcInteractionPromptNames.LOGIN
    )
      throw new HttpException(
        `This login session has been expired, please try again`,
        HttpStatus.UNAUTHORIZED
      )

    const user = await this.userService.getUser({
      email
    })

    if (!user)
      throw new HttpException(
        `The email or password you entered is incorrect!`,
        HttpStatus.UNAUTHORIZED
      )

    const isEqual = await compare(password + user.salt, user.password)
    if (!isEqual)
      throw new HttpException(
        `The email or password you entered is incorrect!`,
        HttpStatus.UNAUTHORIZED
      )

    const oidcInteractionResult: OidcInteractionResult = {
      login: {
        accountId: user.id.uuid
      }
    }

    oidcInteraction.result = {
      ...oidcInteraction.lastSubmission,
      ...oidcInteractionResult
    }
    await oidcInteraction.save(oidcInteraction.exp - epochTime())

    const userResponse: UserDto = new UserDto(user)

    const authResponse: AuthResponseDto = new AuthResponseDto(
      true,
      oidcInteraction.returnTo
    )

    return new LoginResponseDto(userResponse, authResponse)
  }

  // Function: Check user exit or not. Used in Validation Pipe
  async validateUser(id: Uuid) {
    return await this.userService.getUser({ id })
  }
}
