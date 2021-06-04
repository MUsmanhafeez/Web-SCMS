// Packages
import { Inject } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

// Model
import { ServerStatus } from './models/server-status.model'

// Services
import { ServerStatusService } from './server-status.service'

@Resolver(() => ServerStatus)
export class ServerStatusResolver {
  constructor(
    @Inject(ServerStatusService) private serverService: ServerStatusService
  ) {}

  // Checking Server status
  @Query(() => ServerStatus)
  ServerStatus(): ServerStatus {
    return this.serverService.findStatus()
  }
}
